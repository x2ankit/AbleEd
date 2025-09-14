import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, UserRound } from "lucide-react";
import logoPng from "../../assets/NoBGLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  function onSubmit() {
    login();
    navigate("/classroom");
  }

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-fuchsia-100 to-sky-100"
      aria-label="AbleEd Sign Up Page"
      role="main"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Left panel: brand + illustration */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-3">
            <img src={logoPng as string} alt="AbleEd logo" className="h-12 w-12 object-contain drop-shadow" />
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl" aria-label="AbleEd: Accessible Learning for Everyone">
              AbleEd
            </h1>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
            Accessible Learning for Everyone. Join a community where inclusive, futuristic education meets great
            design.
          </p>

          <div className="mt-10 relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 blur-2xl" aria-hidden />
            <div className="relative glass-card p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="progress-circle" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Your journey starts here</p>
                  <p className="text-base font-medium">Build skills at your own pace</p>
                </div>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-2 text-sm" aria-label="Inclusive features">
                <li>• High-contrast, dyslexia-friendly options</li>
                <li>• Keyboard and screen reader friendly</li>
                <li>• Smooth, reduced-motion friendly animations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right panel: form */}
        <div className="order-1 md:order-2">
          <Card className="glass-card-hover border-glass-border/60 shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Get started with accessible learning tailored to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                aria-label="Sign Up Form"
                aria-describedby="form-help"
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      aria-required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="pl-10 focus-visible:scale-[1.01] transition-transform"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="name-error" role="alert" aria-live="polite" className="text-sm text-destructive">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      inputMode="email"
                      aria-required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="pl-10 focus-visible:scale-[1.01] transition-transform"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <span id="email-error" role="alert" aria-live="polite" className="text-sm text-destructive">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      aria-required
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className="pr-10 focus-visible:scale-[1.01] transition-transform"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <span id="password-error" role="alert" aria-live="polite" className="text-sm text-destructive">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      aria-required
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                      className="pr-10 focus-visible:scale-[1.01] transition-transform"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span id="confirm-error" role="alert" aria-live="polite" className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-button text-primary-foreground shadow-glow hover:brightness-110 transition-transform hover:scale-[1.01]"
                  aria-label="Sign Up"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden>
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign up options">
                  <Button type="button" variant="outline" className="w-full" aria-label="Continue with Google">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12   s5.373-12,12-12c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657C33.053,6.053,28.727,4,24,4C12.955,4,4,12.955,4,24   s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,19.001,13,24,13c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657   C33.053,6.053,28.727,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c4.671,0,8.936-1.79,12.172-4.717l-5.611-4.727C28.79,36.848,26.529,38,24,38   c-5.202,0-9.619-3.323-11.275-7.965l-6.543,5.046C9.5,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.103,5.556l0.003-0.002l5.611,4.727   C35.961,38.205,44,32,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="w-full" aria-label="Continue with Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.096 4.388 23.093 10.125 24v-8.437H7.078V12.07h3.047V9.412c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.956.93-1.956 1.887v2.252h3.328l-.532 3.493h-2.796V24C19.612 23.093 24 18.096 24 12.073z"/>
                      <path fill="#FFF" d="M16.671 15.563l.532-3.493h-3.328V9.818c0-.957.464-1.887 1.956-1.887h1.513V4.978s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.658H7.078v3.057h3.047V24h3.75v-8.437h2.796z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <p id="form-help" className="sr-only">All fields are required. Use the Sign Up button to submit.</p>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <Link to="/" className="underline underline-offset-4">Go Home</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
