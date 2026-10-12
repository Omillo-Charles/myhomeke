"use client";

interface DashboardGreetingProps {
    firstName: string;
}

function GeminiSparkIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0" aria-hidden="true">
            <path
                d="M12 2C12 2 13.5 7 17 8.5C13.5 10 12 15 12 15C12 15 10.5 10 7 8.5C10.5 7 12 2 12 2Z"
                fill="currentColor"
            />
            <path
                d="M19 14C19 14 19.75 16.5 21.5 17.25C19.75 18 19 20.5 19 20.5C19 20.5 18.25 18 16.5 17.25C18.25 16.5 19 14 19 14Z"
                fill="currentColor"
                fillOpacity="0.7"
            />
            <path
                d="M5 3C5 3 5.5 5 7 5.75C5.5 6.5 5 8.5 5 8.5C5 8.5 4.5 6.5 3 5.75C4.5 5 5 3 5 3Z"
                fill="currentColor"
                fillOpacity="0.5"
            />
        </svg>
    );
}

export default function DashboardGreeting({ firstName }: DashboardGreetingProps) {
    return (
        <div className="mb-6 flex items-start justify-between gap-4">
            {/* Left — greeting text */}
            <div>
                <h2 className="font-outfit text-xl font-semibold text-ink">
                    Good Morning,{" "}
                    <span className="text-jade-700">{firstName}!</span>
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                    It&apos;s a great day to stay ahead of your property management goals.
                </p>
            </div>

            {/* Right — Talk to Gemini button with rotating border */}
            <div className="gemini-ring-wrapper shrink-0">
                <button
                    type="button"
                    aria-label="Talk to Gemini AI assistant"
                    className="gemini-ring-button inline-flex items-center gap-2 text-[13px] font-semibold text-neutral-700 transition-colors hover:text-ink focus-visible:outline-none"
                >
                    <GeminiSparkIcon />
                    Talk to Gemini AI
                </button>

                {/* Keyframe + layer styles */}
                <style>{`
                    .gemini-ring-wrapper {
                        position: relative;
                        padding: 2px;
                        border-radius: 9999px;
                        background: conic-gradient(
                            from var(--gemini-angle, 0deg),
                            #4285F4,
                            #34A853,
                            #FBBC05,
                            #EA4335,
                            #4285F4
                        );
                        animation: gemini-spin 2.5s linear infinite;
                    }

                    @property --gemini-angle {
                        syntax: "<angle>";
                        initial-value: 0deg;
                        inherits: false;
                    }

                    @keyframes gemini-spin {
                        to {
                            --gemini-angle: 360deg;
                        }
                    }

                    .gemini-ring-button {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: #ffffff;
                        border-radius: 9999px;
                        padding: 7px 16px;
                        width: 100%;
                    }
                `}</style>
            </div>
        </div>
    );
}
