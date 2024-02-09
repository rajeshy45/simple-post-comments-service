import {
  Alegreya,
  Inter as FontSans,
  Open_Sans,
  Poppins,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const alegreya = Alegreya({
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
});
