import CustomNavbar from "../component/navbar";
import React from 'react';
import { Container, Divider } from "rsuite";
import ClassForm from "../component/classForm";
import ClassTable from "../component/classTable";

const Class = ()=>{
    const [activeKey, setActiveKey] = React.useState("class");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <ClassForm />
        <Divider />
        <Container  style={{padding:"20px"}}>
        <h3>Manage Classes</h3>
        <Divider />
        <ClassTable />
        </Container>
        </>
    );
}

export default Class;