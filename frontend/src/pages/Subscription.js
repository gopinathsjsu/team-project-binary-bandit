import CustomNavbar from "../component/navbar";
import React from 'react';
import { Divider } from "rsuite";
import SubscriptionForm from "../component/subscriptionForm";
import SubscriptionTable from "../component/subscriptionTable";

const Subscription = ()=>{
    const [activeKey, setActiveKey] = React.useState("subscription");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <SubscriptionForm />
        <Divider />
        <h3>Manage Subscriptions</h3>
        <Divider />
        <SubscriptionTable />
        </>
    );
}

export default Subscription;