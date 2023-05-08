import { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Container, Carousel, Content, Divider, Header, Panel, FlexboxGrid } from 'rsuite';
import CustomNavbar from "../component/navbar";
import LineChart from '../component/lineChart';
import axios from 'axios';
import ClassEnrollmentChart from '../component/classEnrollmentChart';

const AdminDashBoard = () => {
  const [activeKey, setActiveKey] = useState('admin-dashboard');
  const [gymList, setGymList] = useState([]);
  

  useEffect(() => {
      axios.get('/gym/all')
      .then(response => {
        setGymList(response.data.map(gym => ({ label: gym.location, value: gym._id })));
        // setGymId(response.data.length>0?response.data[0].value:'');
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // const handleGymSelection = (id) => {
  //   console.log(id);
  //   setGymId(id);
  // }


  return (
    <>
      <Container>
        <Header>
          <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
        </Header>
        <Content>
         
          {/* <SelectPicker label="Location" data={gymList} defaultValue={gym_id} style={{ width: 224 }} onChange={handleGymSelection}/> */}
          <FlexboxGrid>
            <FlexboxGrid.Item>
              <Panel style={{ padding: "10px" }} align="center">
                <h5>Visitor Statistics</h5>
                <LineChart gymList={gymList} />
              </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Panel style={{ padding: "10px" }} align="center">
                <h5>Class Statistics</h5>
                <ClassEnrollmentChart gymList={gymList} />
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>

    </>
  );
};




export default AdminDashBoard;
