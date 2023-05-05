import { Container, SelectPicker, Table , Panel} from 'rsuite';
import React, { useState, useEffect } from 'react';

import { Button } from 'rsuite';
import ReviewIcon from '@rsuite/icons/Review';
import axios from 'axios';

const { Column, HeaderCell, Cell } = Table;






const DeleteCell = ({ rowData, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px' }}>
      <Button
        onClick={() => {
          // console.log(rowData);
          onClick(rowData._id);
        }}
      >
        <ReviewIcon />
      </Button>
    </Cell>
  );
}

const CheckoutTable = () => {
  const [data, setData] = useState([]);
  const [gymList, setGymList] = React.useState([]);

  
  useEffect(() => {
    axios.get('/registry/checkout')
      .then(response => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      axios.get('/gym/all')
      .then(response => {
        setGymList(response.data.map(gym => ({ label: gym.location, value: gym._id })));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleGymSelection = (id) => {
    console.log(id);
    
    axios.post('/registry/gym', {gym_id:id, checkout_flag:false})
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        // if(!alert(error.response.data.error)){window.location.reload()};
      });
    // console.log(classOb)
  }

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item._id === id)[key] = value;
    //console.log(nextData);
    setData(nextData);
  };
  

  const handleCheckout = (id) => {
    // const nextData = Object.assign([], data);
    // nextData.find(item => item.id === id)[key] = value;
    // console.log(nextData);
    // setData(nextData);
    //console.log(id);
    if (window.confirm("Are you sure wann checkout the User?")) {
      axios.post("/registry/checkout",{id}).then(res => {
        console.log(res);
        window.location.reload()
        alert("Checkout Successfully !!!");
      }).catch(error => {
        if (!alert(error.response.data.error)) { window.location.reload() };
      });
    } else {
      window.location.reload();
    }

  };

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
    setSortColumn(sortColumn);
    setSortType(sortType);
    }, 500);
  };

  return (
    <Container style={{padding : "20px"}}>
        <Panel >
            <SelectPicker name="gym_id" data={gymList} style={{ width: "300px" }} onChange={handleGymSelection} />
        </Panel>
    <Table

      height={420}
      // data={data}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column width={200} sortable fullText>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="_id" />
      </Column>

      <Column width={200} sortable fullText>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="user_id['name']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Role</HeaderCell>
        <Cell dataKey="user_id['role']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Gym Location</HeaderCell>
        <Cell dataKey="gym_id['location']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable>
        <HeaderCell>Checkin Time ($)</HeaderCell>
        <Cell dataKey="checkin_time" onChange={handleChange} />
      </Column>

      <Column flexGrow={1} >
        <HeaderCell>Checkout</HeaderCell>
        <DeleteCell dataKey="_id" onClick={handleCheckout}>
        </DeleteCell>
      </Column>
    </Table>
    </Container>
  );
}

export default CheckoutTable;

