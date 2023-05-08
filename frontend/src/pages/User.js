import CustomNavbar from "../component/navbar";
import React from 'react';
import { Container, Divider } from "rsuite";
import UserTable from "../component/userTable";
import CreateUserForm from "../component/userForm";

const User = ()=>{
    const [activeKey, setActiveKey] = React.useState("user");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        <CreateUserForm />
        <Divider />
        <Container style={{padding:"20px"}}>
        <h3>Manage Member</h3>
        <Divider />
        <UserTable />
        </Container>
        </>
    );
}

export default User;