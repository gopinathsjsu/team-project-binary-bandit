import CustomNavbar from "../component/navbar";
import React from 'react';
import { Divider } from "rsuite";
import GymTable from "../component/gymTable";
import CreateGymForm from "../component/gymForm";

const Gym = ()=>{
    const [activeKey, setActiveKey] = React.useState("gym");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <CreateGymForm />
        <Divider />
        <h3>Manage Gym</h3>
        <Divider />
        <GymTable />
        </>
    );
}

export default Gym;