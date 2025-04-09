// src/pages/RegisterPage.jsx
import  { useState, useEffect } from "react";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "instructor", // Default to instructor
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async () => {
    if (!signupInput.name || !signupInput.email || !signupInput.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await registerUser(signupInput).unwrap();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      navigate("/login"); // Navigate after successful signup
    }

    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }
  }, [registerIsSuccess, registerError]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="signup">Register as Instructor</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new instructor account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={changeInputHandler}
                  placeholder="Eg. John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={changeInputHandler}
                  placeholder="Eg. john@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={changeInputHandler}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  value={signupInput.role}
                  onChange={changeInputHandler}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={handleRegistration}
                className="w-full"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterPage;
