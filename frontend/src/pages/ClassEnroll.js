import { Container } from "rsuite";
import EnrollmentForm from "../component/enrollForm";
import EnrollTable from "../component/enrollTable";
import CustomNavbar from "../component/navbar";
// import SelectUser from "../component/selectUser";
import React from "react";

const ClassEnroll = ()=>{
    const [activeKey, setActiveKey] = React.useState("class-enroll");

    return (
        <>
        <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
      
        {/* <SelectUser setUser={setUser} /> */}
       <Container>
       <EnrollmentForm/>
       </Container>
       <Container style={{padding:"20px"}}>
       <EnrollTable />
       </Container>
       
        </>
    );
    

}

export default ClassEnroll;