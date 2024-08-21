'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardProps {
    page: string,
    img: string,
    hoverImg: string,
    color: string,
    children: React.ReactNode;
}

export default function Card( { page, img, hoverImg, color, children }: CardProps ) {
    const [isHovered, setHovered] = useState(false);
    const divStyle = color + " h-112 w-72 rounded-5xl overflow-hidden text-4xl flex flex-col place-content-evenly items-center transition duration-300 ease-in-out hover:scale-105";
    const onMouseEnter = () => setHovered(true);
    const onMouseExit = () => setHovered(false);
    
    return (
        <Link href={`/${page}`}>
            <div className={divStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit}>
                { isHovered ? (
                    <Image
                    height={245}
                    width={245}
                    alt='Icon'
                    src={hoverImg}
                    className="h-60 w-60"
                    />
                ) : (
                    <Image
                    height={245}
                    width={245}
                    alt='Icon'
                    src={img}
                    className="h-60 w-60 object-cover"
                    />
                )}
                <div>{children}</div>
            </div>
        </Link>
    );
}