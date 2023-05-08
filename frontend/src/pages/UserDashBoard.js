import { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Container, Carousel, Content, Divider, Header, Panel, FlexboxGrid } from 'rsuite';
import CustomNavbar from "../component/navbar";
import LineChart from '../component/lineChart';
import axios from 'axios';
import UserActivityChart from '../component/UserActivityChart';
const UserDashBoard = () => {
  const [activeKey, setActiveKey] = useState('userDashboard');
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
              <Panel style={{ padding: "10px" }} align="center" shaded>
                <h5>Hours Spent in Gym</h5>
                <UserActivityChart gymList={gymList} />
              </Panel>
        </Content>
      </Container>

    </>
  );
};




export default UserDashBoard;
