import React  from 'react';
import { Form, Divider, SelectPicker, Button,  Schema, Panel, FlexboxGrid } from 'rsuite';
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import axios from 'axios';
const { StringType } = Schema.Types;





const model = Schema.Model({
  user_id: StringType().isRequired('User field is required.'),
  gym_id: StringType().isRequired('Gym Location  is required.'),
});


const CheckInForm = () => {

  const formRef = React.useRef();

  const [user_id, setUserId] = React.useState('');
  const [gym_id, setGymId] = React.useState('');
  const [user, setUser] = React.useState(null);
  const [formError, setFormError] = React.useState({});
  const [userList, setUserList] = React.useState([]);
  const [gymList, setGymList] = React.useState([]);

  React.useEffect(() => {
    axios.get('/user/all')
      .then(response => {
        // console.log(response.data);
        setUserList(response.data.map(doc => ({ value: doc._id, label: doc.name })));
      })
      .catch(error => {
        if (!alert(error.response.data.error)) { window.location.reload() };
      });

    axios.get('/gym/all')
      .then(response => {
        setGymList(response.data.map(gym => ({ label: gym.location, value: gym._id })));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUserSelection = (id) => {
    // console.log(id);
    setUserId(id)
    axios.get('/user/get?id=' + id)
      .then(response => {
        // console.log(response.data);
        setUser(response.data);
      })
      .catch(error => {
        // if(!alert(error.response.data.error)){window.location.reload()};
      });
    // console.log(classOb)
  }

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      console.log(formError);
      return;
    }

    console.log({ user_id, gym_id }, 'Form Value');

    axios.post('/registry/checkin', { user_id, gym_id })
      .then(response => {
        console.log(response);
        if (!alert("CheckIn Successfull !!!")) { window.location.reload() };

      })
      .catch(error => {
        if (!alert(error.response.data.error)) { window.location.reload() };
      });
  }

  const userInfo = () => {
    return (
        <p>
            <b>Id : </b>
            <small>
                {user._id}
            </small>
            <br />
            <b>Nae : </b>
            <small>
                {user.name}
            </small>
            <br />
            <b>Email : </b>
            <small>
                {user.email_id}
            </small>
            <br />
            <b>Phone No: </b>
            <small>
                {user.phone_no}
            </small>
            <br />
            <b>Address: </b>
            <small>
                {user.address}
            </small>
        </p>
    );
}

return (
  <>
      <Panel >
          <Form
              layout="inline"
              ref={formRef}
              onCheck={setFormError}
              model={model}
              checkTrigger="change"
              fluid={true}
          >
              <FlexboxGrid align="middle" justify="space-around" >
                  <FlexboxGridItem >
                      <FlexboxGrid justify="space-around" style={{width:"500px", height:"300px", flexDirection:"column"}}>
                          <FlexboxGridItem>
                          <Form.Group controlId="user_id" >
                          <Form.ControlLabel>User : </Form.ControlLabel>
                          <Form.Control name="user_id" accepter={SelectPicker} data={userList} style={{ width: "300px" }} onChange={handleUserSelection} />
                      </Form.Group>
                          </FlexboxGridItem>
                          
                          <FlexboxGridItem>
                          <Form.Group controlId="gym_id" >
                          <Form.ControlLabel>Gym Location : </Form.ControlLabel>
                          <Form.Control name="gym_id" accepter={SelectPicker} data={gymList} style={{ width: "250px" }} onChange={setGymId} />
                      </Form.Group>
                          </FlexboxGridItem>
                          <FlexboxGridItem>
                          <Button appearance="primary" onClick={handleSubmit} style={{ width: "120px" }}>
                          Check-in
                      </Button>
                          </FlexboxGridItem>
                      </FlexboxGrid>
                      
                      
                  </FlexboxGridItem>
                  <FlexboxGridItem>
                      <h6> User Details :</h6><br />
                      <Panel header={user ? user.name : 'Select a User to Checkin'} shaded style={{ display: 'inline-block', width: 340 }}>
                  {user && <Divider />}
                  {user &&  userInfo()}
              </Panel>
                  </FlexboxGridItem>

              </FlexboxGrid>

              <Divider />
              
              
          </Form>
      </Panel>
  </>
);






  // const [userData, setUserData] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [checkInRecords, setCheckInRecords] = useState([]);

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get('/user/all');
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // const handleLocationChange = (value) => {
  //   setSelectedLocation(value);
  // };

  // const handleUserChange = (value) => {
  //   setSelectedUser(value);
  // };

  // const handleCheckIn = () => {
  //   if (!selectedLocation || !selectedUser) {
  //     alert.error('Please select a location and user');
  //     return;
  //   }

  //   const checkInTime = new Date().toLocaleString();
  //   const newRecord = {
  //     userId: selectedUser,
  //     userName: userData.find((user) => user._id === selectedUser).name,
  //     checkInTime,
  //     checkOutTime: null,
  //   };

  //   setCheckInRecords([...checkInRecords, newRecord]);
  //   setSelectedLocation(null);
  //   setSelectedUser(null);
  // };

  // const handleCheckOut = (record) => {
  //   const updatedRecords = checkInRecords.map((item) =>
  //     item === record ? { ...item, checkOutTime: new Date().toLocaleString() } : item
  //   );
  //   setCheckInRecords(updatedRecords);
  // };

  // const filteredCheckInRecords = checkInRecords.filter((record) => record.checkOutTime === null);

  // return (
  //   <div>
  //     <h2>Check-In/Check-Out Form</h2>
  //     <Form fluid>
  //       <Form.Group>
  //         <Form.ControlLabel>Location</Form.ControlLabel>
  //         <SelectPicker
  //           data={[
  //             { label: 'Location 1', value: 'location1' },
  //             { label: 'Location 2', value: 'location2' },
  //             { label: 'Location 3', value: 'location3' },
  //           ]}
  //           value={selectedLocation}
  //           onChange={handleLocationChange}
  //         />
  //       </Form.Group>
  //       <Form.Group>
  //         <Form.ControlLabel>User</Form.ControlLabel>
  //         <SelectPicker
  //           data={userData.map((user) => ({
  //             label: user.name,
  //             value: user._id,
  //           }))}
  //           value={selectedUser}
  //           onChange={handleUserChange}
  //         />
  //       </Form.Group>
  //       <Form.Group>
  //         <Button appearance="primary" onClick={handleCheckIn}>
  //           Check-In
  //         </Button>
  //       </Form.Group>
  //     </Form>
  //     <br />
  //     <Table data={filteredCheckInRecords} height={400} autoHeight>
  //       {/* <Column width={100} align="center">
  //         <HeaderCell>User ID</HeaderCell>
  //         <Cell dataKey="userId" />
  //       </Column> */}
  //       <Column width={200} align="center">
  //         <HeaderCell />
  //         <Cell dataKey="userName" />
  //       </Column>
  //       <Column width={200} align="center">
  //         <HeaderCell>Check-In Time</HeaderCell>
  //         <Cell dataKey="checkInTime" />
  //       </Column>
  //       <Column width={200} align="center">
  //         <HeaderCell>Check-Out Time</HeaderCell>
  //         <Cell>
  //           {(rowData) =>
  //             rowData.checkOutTime ? (
  //               rowData.checkOutTime
  //             ) : (
  //               <Button appearance="primary" onClick={() => handleCheckOut(rowData)}>
  //                 Check-Out
  //               </Button>
  //             )
  //           }
  //         </Cell>
  //       </Column>
  //     </Table>
  //   </div>
  // );
};

export default CheckInForm;

