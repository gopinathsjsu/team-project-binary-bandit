import { useState, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Container, Carousel, Content, Divider, Header, Panel, FlexboxGrid } from 'rsuite';
import CustomNavbar from "../component/navbar";
import LineChart from '../component/lineChart';
import axios from 'axios';
import ClassEnrollmentChart from '../component/classEnrollmentChart';
import GymCard from '../component/GymCard';


const Home = () => {
  const [activeKey, setActiveKey] = useState(null);
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
          <Panel>
            <Carousel autoplay className="custom-slider">
              <img src="https://t4.ftcdn.net/jpg/03/50/81/89/360_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg" alt="Gym" style={{ height: "350" }} />
              {/* <img src="https://t3.ftcdn.net/jpg/04/92/52/20/360_F_492522039_SxbIgMgstbf91fAyueoRMuaUg7kmg7PO.jpg" alt="Gym" style={{ height: "350" }} /> */}
              <img src="https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1563552056214-NACIMXAQ41V5B735AN88/Gym+Banner.jpg?format=2500w" alt="Gym" style={{ height: "350" }} />
              <img src="https://t3.ftcdn.net/jpg/05/72/91/08/360_F_572910874_gjyCeTnHtxFMIuPFcfE0djznBMgsU4Bf.jpg" alt="Gym" style={{ maxHeight: "350" }} />
            </Carousel>
          </Panel>
          <Divider />
          <GymCard />
        </Content>
      </Container>

    </>
  );
};




export default Home;
