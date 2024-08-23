import Link from "next/link";

export default function Navbar() {
    return (
        <div className="bg-[#FEF7FF] h-16 text-black flex place-content-between p-4">
            <div className="place-content-center">Icon</div>
            <Link href={'/'} className="place-content-center">Title</Link>
            <div className="place-content-center">Avatar</div>
        </div>
    );
}