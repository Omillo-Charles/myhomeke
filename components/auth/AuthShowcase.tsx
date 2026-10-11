"use client";

import { useEffect, useState } from "react";

const slides = [
    {
        eyebrow: "A place to call your own",
        title: "Find a home that feels like yours.",
        description: "Discover a more considered way to find your next home, with Jade Apartments by your side.",
    },
    {
        eyebrow: "A smoother move",
        title: "Make your next move with confidence.",
        description: "Explore homes that suit your lifestyle and get helpful guidance as you find the right fit.",
    },
    {
        eyebrow: "Your next chapter",
        title: "Find the space for what comes next.",
        description: "From the first search to settling in, Jade Apartments is here to make finding home feel easier.",
    },
] as const;

export default function AuthShowcase() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 6000);

        return () => window.clearInterval(timer);
    }, []);

    const showSlide = (index: number) => {
        setActiveSlide((index + slides.length) % slides.length);
    };

    const slide = slides[activeSlide];

    return (
        <div aria-roledescription="carousel" aria-label="Discover Jade Apartments" className="mt-14 max-w-xl sm:mt-20 lg:mb-6">
            <div aria-live="polite" aria-atomic="true" className="min-h-[174px] sm:min-h-[190px]">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-gold-200 md:tracking-[0.16em]">
                    {slide.eyebrow}
                </p>
                <h1 className="font-outfit text-3xl font-medium leading-tight tracking-normal text-white md:tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                    {slide.title}
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                    {slide.description}
                </p>
            </div>

            <div className="mt-6 flex items-center gap-2" aria-label="Choose a slide">
                {slides.map((item, index) => (
                    <button
                        key={item.eyebrow}
                        type="button"
                        aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
                        aria-pressed={activeSlide === index}
                        onClick={() => showSlide(index)}
                        className={`h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-200 ${activeSlide === index ? "w-8 bg-gold-300" : "w-1.5 bg-white/55 hover:bg-white/80"}`}
                    />
                ))}
                <button
                    type="button"
                    aria-label="Show next slide"
                    onClick={() => showSlide(activeSlide + 1)}
                    className="ml-2 flex size-8 items-center justify-center rounded-full border border-white/40 text-white/90 transition-colors hover:border-gold-300 hover:text-gold-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-200"
                >
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                        <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
