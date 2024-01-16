import Image from 'next/image';

interface DashboardCardProps {
    iconSrc: string;
    bgColor: string;
    label: string;
    value: string;
    iconWidth: number;
    iconHeight: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ iconSrc, bgColor, label, value, iconWidth, iconHeight }) => (
    <div className={`w-[255px] h-[157px] p-20 relative ${bgColor} rounded-md`}>
        <div className="absolute top-0 left-0 p-5">
            <Image src={iconSrc} alt={label} width={iconWidth} height={iconHeight} />
            <div className="font-medium text-sm mt-4">{label}</div>
        </div>
        <div className="absolute bottom-0 right-0 p-4 font-bold text-3xl">{value}</div>
    </div>
);

export default DashboardCard;
