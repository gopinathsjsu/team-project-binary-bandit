import { Container, Divider, Table } from 'rsuite';
import React, { useState, useEffect } from 'react';

import { Button } from 'rsuite';
import ReviewIcon from '@rsuite/icons/Review';
import axios from 'axios';
import Cookies from 'js-cookie';

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

const ActivityTable = () => {
  const [data, setData] = useState([]);

const user_id = JSON.parse(Cookies.get('user')).user_id;
  
  useEffect(() => {
    axios.get('/log/user?id='+ user_id)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [user_id]);

//   const handleGymSelection = (id) => {
//     // console.log(id);
    
//     axios.post('/registry/gym', {gym_id:id, checkout_flag:false})
//       .then(response => {
//         console.log(response.data);
//         setData(response.data);
//       })
//       .catch(error => {
//         // if(!alert(error.response.data.error)){window.location.reload()};
//       });
//     // console.log(classOb)
//   }

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item._id === id)[key] = value;
    //console.log(nextData);
    setData(nextData);
  };
  

  const handleDeletion = (id) => {
    // const nextData = Object.assign([], data);
    // nextData.find(item => item.id === id)[key] = value;
    // console.log(nextData);
    // setData(nextData);
    console.log("Hello");
    console.log(id);
    if (window.confirm("Are you sure wann delete the activity?")) {
      axios.delete("/log/delete?id="+id).then(res => {
        console.log(res);
        window.location.reload()
        alert("deleted Successfully !!!");
      }).catch(error => {
        // if (!alert(error.response.data.error)) { window.location.reload() };
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
    <h5>Past Activities</h5>
    <Divider />
    <Table
      height={420}
      // data={data}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      {/* <Column width={200} sortable fullText>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="_id" />
      </Column> */}

      <Column width={200} sortable fullText>
        <HeaderCell>Activity Type</HeaderCell>
        <Cell dataKey="activity_type" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Duration (Minutes)</HeaderCell>
        <Cell dataKey="duration" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Log Time</HeaderCell>
        <Cell dataKey="creation_time" onChange={handleChange} />
      </Column>
     
      <Column flexGrow={1} >
        <HeaderCell>Delete</HeaderCell>
        <DeleteCell dataKey="_id" onClick={handleDeletion}>
        </DeleteCell>
      </Column>
    </Table>
    </Container>
  );
}

export default ActivityTable;

