import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Image from 'next/image'


interface NavigationItemProps {
    href: string;
    text: string;
    iconSrc: string;
    width: number;
    height: number;
}


export const NavigationItem: FC<NavigationItemProps> = ({ href, text, iconSrc, width, height }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li>
            <Link href={href} passHref className={`flex items-center gap-2 w-[193px] p-2.5 pl-10 ${isActive ? 'bg-secondary rounded-md' : ''}`}>
                <div className="w-[20px] flex justify-center">
                    <Image src={iconSrc} alt={text} width={width} height={height} />
                </div>
                <span>{text}</span>
            </Link>
        </li>
    );
};