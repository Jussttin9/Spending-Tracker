import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [uid, setUid] = useState<string | null>(null);

    useEffect(() => {
        setUid(localStorage.getItem('uid'));
    })
    
    return (
        <div className="bg-[#FEF7FF] h-16 text-black flex place-content-between p-4">
            <Link href={'/'} className="place-content-center">Home</Link>
            <Link href={'/home'} className="place-content-center">Title</Link>
            <div className="place-content-center">Avatar</div>
        </div>
    );
}