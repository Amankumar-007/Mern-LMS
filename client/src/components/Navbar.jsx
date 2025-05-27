import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { Menu, School } from "lucide-react";
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
  }, [isSuccess]);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-700"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <School className="text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-xl hidden sm:block">EduLearn</span>
        </Link>

        {/* Center - Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link to="/courses" className="hover:text-indigo-600 transition">Courses</Link>
          <Link to="/instructor" className="hover:text-indigo-600 transition">Teach on Edu</Link>
        </nav>

        {/* Right - Auth */}
        <div className="hidden md:flex items-center gap-4">
          <DarkMode />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
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
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
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
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2">
                    <School className="text-indigo-600" />
                    <span className="font-semibold">EduLearn</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 text-sm">
                <Link to="/about">About</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/instructor">Teach on Edu</Link>

                {user ? (
                  <>
                    <Link to="/my-learning">My Learning</Link>
                    <Link to="/profile">Profile</Link>
                    <p className="cursor-pointer" onClick={logoutHandler}>
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
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => navigate("/register")}
                    >
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
