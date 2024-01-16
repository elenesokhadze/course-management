import PaymentList from "../components/PaymentList";

const PaymentPage = () => {
    return (
        <div className="px-7">
            <h1 className="flex items-center text-2xl font-bold py-5 border-b border-line">Payment Details</h1>
            <PaymentList />
        </div>
    )
};



export default PaymentPage;
