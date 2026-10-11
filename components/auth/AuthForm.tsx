"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND_NAME } from "@/components/config/brand";

function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 48 48" className="size-[18px]">
            <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
            <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z" />
            <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.8a20 20 0 0 0 0 17.8l6.8-5.2Z" />
            <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z" />
        </svg>
    );
}

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-[410px] pt-8">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-normal text-jade-700 md:tracking-[0.14em]">
                    {isSignUp ? `Join ${BRAND_NAME}` : `Welcome to ${BRAND_NAME}`}
                </p>
                <h2 id="auth-form-title" className="mt-2 font-outfit text-3xl font-semibold tracking-normal text-ink md:tracking-[-0.03em] sm:text-[2.15rem]">
                    {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                    {isSignUp ? "Create an account to get started on your next move." : "Sign in to continue to your account."}
                </p>
            </div>

            <form className="space-y-5">
                {isSignUp && (
                    <label className="block">
                        <span className="mb-2 block text-xs font-medium text-neutral-700">Full name</span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Your full name"
                            required
                            className="h-12 w-full rounded-sm border border-neutral-300 bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                        />
                    </label>
                )}

                <label className="block">
                    <span className="mb-2 block text-xs font-medium text-neutral-700">Email address</span>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className="h-12 w-full rounded-sm border border-neutral-300 bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-xs font-medium text-neutral-700">{isSignUp ? "Create password" : "Password"}</span>
                    <span className="relative block">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoComplete={isSignUp ? "new-password" : "current-password"}
                            placeholder={isSignUp ? "Create a password" : "Enter your password"}
                            required
                            className="h-12 w-full rounded-sm border border-neutral-300 bg-white px-4 pr-16 text-sm text-ink outline-none transition-shadow placeholder:text-neutral-400 focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            aria-pressed={showPassword}
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="absolute inset-y-0 right-3 my-auto h-fit rounded-sm px-1 py-2 text-xs font-medium text-jade-700 transition-colors hover:text-jade-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </span>
                </label>

                {!isSignUp && (
                    <div className="flex items-center justify-between gap-3 text-xs">
                        <label className="inline-flex items-center gap-2 text-neutral-600">
                            <input type="checkbox" name="remember" className="size-4 rounded-sm border-neutral-300 accent-jade-700" />
                            Remember me
                        </label>
                        <Link href="/auth?mode=reset" className="font-medium text-jade-700 transition-colors hover:text-jade-900">Forgot password?</Link>
                    </div>
                )}

                <button type="button" className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-jade-800 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-jade-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade-700">
                    {isSignUp ? "Create account" : "Sign in"}
                </button>
            </form>

            <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-neutral-200" />
                <span className="text-[10px] font-medium uppercase tracking-normal text-neutral-500 md:tracking-[0.1em]">or continue with</span>
                <span className="h-px flex-1 bg-neutral-200" />
            </div>

            <button type="button" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-sm border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jade-700">
                <GoogleIcon />
                {isSignUp ? "Sign up with Google" : "Continue with Google"}
            </button>

            <p className="mt-7 text-center text-sm text-neutral-600">
                {isSignUp ? "Already have an account? " : "Don’t have an account? "}
                <button
                    type="button"
                    onClick={() => setIsSignUp((current) => !current)}
                    className="font-semibold text-jade-700 underline decoration-gold-400 underline-offset-4 transition-colors hover:text-jade-900"
                >
                    {isSignUp ? "Sign in" : "Create an account"}
                </button>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-neutral-500">
                {isSignUp ? "By creating an account, you agree to our " : "By continuing, you agree to our "}
                <Link href="/terms-of-service" className="underline underline-offset-2 hover:text-neutral-700">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-neutral-700">Privacy Policy</Link>.
            </p>
        </div>
    );
}
