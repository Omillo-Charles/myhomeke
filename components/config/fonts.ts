import localFont from "next/font/local";

export const outfit = localFont({
    src: [
        { path: "../../public/fonts/outfit/OutfitExtraLight.ttf", weight: "200" },
        { path: "../../public/fonts/outfit/OutfitLight1.ttf", weight: "300" },
        { path: "../../public/fonts/outfit/OutfitRegular.ttf", weight: "400" },
        { path: "../../public/fonts/outfit/OutfitMedium.ttf", weight: "500" },
        { path: "../../public/fonts/outfit/OutfitSemiBold.ttf", weight: "600" },
        { path: "../../public/fonts/outfit/OutfitBold.ttf", weight: "700" },
        { path: "../../public/fonts/outfit/OutfitExtraBold.ttf", weight: "800" },
        { path: "../../public/fonts/outfit/OutfitBlack.ttf", weight: "900" },
    ],
    variable: "--font-outfit-local",
    display: "swap",
});

export const mulish = localFont({
    src: [
        { path: "../../public/fonts/mulish/Mulish-ExtraLight.ttf", weight: "200" },
        { path: "../../public/fonts/mulish/Mulish-ExtraLightItalic.ttf", weight: "200", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-Light.ttf", weight: "300" },
        { path: "../../public/fonts/mulish/Mulish-LightItalic.ttf", weight: "300", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-Regular.ttf", weight: "400" },
        { path: "../../public/fonts/mulish/Mulish-Italic.ttf", weight: "400", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-SemiBold.ttf", weight: "600" },
        { path: "../../public/fonts/mulish/Mulish-SemiBoldItalic.ttf", weight: "600", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-Bold.ttf", weight: "700" },
        { path: "../../public/fonts/mulish/Mulish-BoldItalic.ttf", weight: "700", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-ExtraBold.ttf", weight: "800" },
        { path: "../../public/fonts/mulish/Mulish-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
        { path: "../../public/fonts/mulish/Mulish-Black.ttf", weight: "900" },
        { path: "../../public/fonts/mulish/Mulish-BlackItalic.ttf", weight: "900", style: "italic" },
    ],
    variable: "--font-mulish-local",
    display: "swap",
});

export const chirp = localFont({
    src: "../../public/fonts/chirp/twitterchirp.ttf",
    variable: "--font-chirp-local",
    display: "swap",
});
