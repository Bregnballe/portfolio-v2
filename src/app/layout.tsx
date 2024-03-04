import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Mattias Bregnballe Portfolio",
	description: "Portfolio of projects by Mattias Bregnballe",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
