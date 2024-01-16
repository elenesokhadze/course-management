import { FC } from "react";
import Image from 'next/image'

export const Header: FC = () => {
    return (
        <header className='flex w-full justify-between items-center px-7 py-3 bg-white'>
            <Image src="/icons/caret-circle-down.svg" alt="caret-circle-down" width={18} height={18} />
            <div className='flex items-center gap-2'>
                <input
                    type="text"
                    className="border rounded-md text-base font-normal px-3.5 py-2 h-9 focus:outline-none bg-white"
                    placeholder="Search..."
                />
                <Image src="/icons/bell.svg" alt="bell" width={17} height={20} />
            </div>
        </header>
    )
}