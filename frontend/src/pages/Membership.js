import CustomNavbar from "../component/navbar";
import React from 'react';
import { Divider } from "rsuite";
import CreateMemeberShipForm from "../component/membershipForm";
import MembershipTable from "../component/memeberShipTable";

const Membership = ()=>{
    const [activeKey, setActiveKey] = React.useState("membership");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <CreateMemeberShipForm />
        <Divider />
        <h3>Manage Membership</h3>
        <Divider />
        <MembershipTable />
        </>
    );
}

export default Membership;