import CustomNavbar from "../component/navbar";
import React from 'react';
import CheckoutTable from "../component/CheckoutTable";
const Checkout = ()=>{
    const [activeKey, setActiveKey] = React.useState("subscription");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <CheckoutTable />
        </>
    );
}

export default Checkout;