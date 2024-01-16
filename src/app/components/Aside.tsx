"use client"
import { FC } from "react";
import Image from 'next/image'
import { NavigationItem } from "./NavigationItem";


export const Aside: FC = () => {
    return (
        <aside className="min-w-[270px] bg-aside">
            <div className="flex flex-col items-center gap-3 mb-20 mt-24">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                    <Image src="/pexels-photo.png" alt="pexels-photo" width={141} height={214} />
                </div>
                <span className="text-base font-bold">Karthi Madesh</span>
                <span className="text-sm font-medium text-secondary">Admin</span>
            </div>
            <nav>
                <ul className="flex flex-col items-center gap-4 text-sm font-medium">
                    <NavigationItem href="/" text="Home" iconSrc="/icons/home-lg-alt.svg" width={19} height={17} />
                    <NavigationItem href="/courses" text="Course" iconSrc="/icons/bookmark.svg" width={12} height={15} />
                    <NavigationItem href="/students" text="Students" iconSrc="/icons/graduation-cap.svg" width={20} height={16} />
                    <NavigationItem href="/payment" text="Payment" iconSrc="/icons/usd-square.svg" width={15} height={17} />
                </ul>
            </nav>
        </aside>
    );
};
