import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Button } from "./ui/button";
import DarkMode from "@/DarkMode";

// Replace logo with a modern, animated SVG logo
const Logo = () => (
  <motion.svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: -10, scale: 0.95 }}
    animate={{ rotate: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 8 }}
    className="drop-shadow-md"
  >
    <circle
      cx="19"
      cy="19"
      r="18"
      fill="#6366f1"
      stroke="#fff"
      strokeWidth="2"
    />
    <path
      d="M10 25L19 13L28 25"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="19" cy="19" r="4" fill="#fff" />
  </motion.svg>
);

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout successful");
      navigate("/login");
    }
  }, [isSuccess, data?.message, navigate]);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 shadow-md border-b border-zinc-200 dark:border-zinc-700 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-200 hidden sm:block">
            EduLearn
          </span>
        </Link>

        {/* Center - Nav Links */}
        <nav className="hidden md:flex gap-7 text-base font-semibold items-center">
          <Link
            to="/about"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/courses"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Courses
          </Link>
          <Link
            to="/instructor"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Teach on Edu
          </Link>
        </nav>

        {/* Right - Auth */}
        <div className="hidden md:flex items-center gap-5">
          <DarkMode />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-indigo-200 hover:ring-indigo-400 transition duration-200">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52 shadow-xl rounded-xl">
                <DropdownMenuLabel className="font-bold text-indigo-700">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="text-red-500 font-semibold"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/instructor/dashboard">Instructor Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
                onClick={() => navigate("/register")}
              >
                Signup
              </Button>
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <DarkMode />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="hover:border-indigo-400">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                      EduLearn
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 text-base font-semibold">
                <Link to="/about">About</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/instructor">Teach on Edu</Link>
                {user ? (
                  <>
                    <Link to="/my-learning">My Learning</Link>
                    <Link to="/profile">Profile</Link>
                    <p className="cursor-pointer text-red-500 font-semibold" onClick={logoutHandler}>
                      Logout
                    </p>
                    {user?.role === "instructor" && (
                      <Link to="/instructor/dashboard">Instructor Dashboard</Link>
                    )}
                    {user?.role === "admin" && (
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    )}
                  </>
                ) : (
                  <>
                    <Button className="w-full hover:border-indigo-400" variant="outline" onClick={() => navigate("/login")}>
                      Login
                    </Button>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => navigate("/register")}>
                      Signup
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
