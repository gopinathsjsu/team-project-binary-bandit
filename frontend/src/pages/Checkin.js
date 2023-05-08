import CustomNavbar from "../component/navbar";
import React from 'react';
import CheckInForm from "../component/CheckInForm";
const CheckIn = ()=>{
    const [activeKey, setActiveKey] = React.useState("subscription");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <CheckInForm />
        </>
    );
}

export default CheckIn;