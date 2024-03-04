import Link from "next/link";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center m-4">
			<Link href="/">BACK</Link>
			<p>MENU</p>
		</div>
	);
}
