import DashboardCard from "./components/DashboardCard";


export default function Home() {


  return (
    <div className='flex justify-around mt-9'>
      <DashboardCard
        iconSrc="/icons/graduation-cap-dashboard.svg"
        bgColor="bg-students"
        label="Students"
        value="243"
        iconHeight={38}
        iconWidth={48}
      />
      <DashboardCard
        iconSrc="/icons/bookmark-dashboard.svg"
        bgColor="bg-course"
        label="Course"
        value="13"
        iconHeight={35}
        iconWidth={28}
      />
      <DashboardCard
        iconSrc="/icons/usd-square-dashboard.svg"
        bgColor="bg-payments"
        label="Payments"
        value="$556,000"
        iconHeight={40}
        iconWidth={35}
      />
    </div>
  )
}
