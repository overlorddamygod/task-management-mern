import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("root", {
        message: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Task Manager | Login</CardTitle>
              <CardDescription>
                Enter your email and password below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>

                    <PasswordInput
                      id="password"
                      placeholder="********"
                      {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.root.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={"/register"}
                    className="underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
