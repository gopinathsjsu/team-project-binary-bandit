import { Container, FlexboxGrid, Panel } from "rsuite";
import ActivityForm from "../component/ActivityForm";
import CustomNavbar from "../component/navbar";
import React from 'react';
import ActivityTable from "../component/ActivityTable";
import CheckInActivityTable from "../component/checkInActivityTable";
import UserActivityChart from "../component/UserActivityChart";

const ActivityPage = () => {
    const [activeKey, setActiveKey] = React.useState("log-activity");

    return (
        <>
            <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
            <Container>
                <FlexboxGrid justify="space-around" align="middle">
                    <FlexboxGrid.Item>
                    <ActivityForm />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                    <Panel style={{ padding: "10px" }} align="center" >
                <h5>Hours Spent in Gym</h5>
                <hr></hr>
                <UserActivityChart />
              </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                
                 <FlexboxGrid>
                    <FlexboxGrid.Item colspan={12}> <ActivityTable /></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={12}> <CheckInActivityTable /></FlexboxGrid.Item>
                </FlexboxGrid>
            </Container>
            <Container>
               
            </Container>
        </>
    );
}

export default ActivityPage;

