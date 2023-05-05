import { Container, Table } from 'rsuite';
import { useState, useEffect } from 'react';

import { Button } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
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
        <TrashIcon />
      </Button>
    </Cell>
  );
}

const SubscriptionTable = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('/enrollment/all')
      .then(response => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find(item => item._id === id)[key] = value;
    //console.log(nextData);
    setData(nextData);
  };
  

  const handleDelete = (id) => {
    // const nextData = Object.assign([], data);
    // nextData.find(item => item.id === id)[key] = value;
    // console.log(nextData);
    // setData(nextData);
    //console.log(id);
    if (window.confirm("Are you sure wann delete the Subscription for this User?")) {
      axios.delete("/enrollment/delete?id=" + id).then(res => {
        console.log(res);
        window.location.reload()
        alert("Subscription Deleted Successfully !!!");
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
        <HeaderCell>User Name</HeaderCell>
        <Cell dataKey="user_id['name']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Role</HeaderCell>
        <Cell dataKey="user_id['role']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Membership</HeaderCell>
        <Cell dataKey="membership_id['name']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable>
        <HeaderCell>Price ($)</HeaderCell>
        <Cell dataKey="membership_id['price']" onChange={handleChange} />
      </Column>
      <Column width={200} sortable fullText>
        <HeaderCell>Expiration Time</HeaderCell>
        <Cell dataKey="expiration_time" onChange={handleChange} />
      </Column>
      <Column  width={200} sortable fullText>
        <HeaderCell>Subscribed On</HeaderCell>
        <Cell dataKey="creation_time" onChange={handleChange} />
      </Column>

      <Column flexGrow={1} >
        <HeaderCell>Delete</HeaderCell>
        <DeleteCell dataKey="_id" onClick={handleDelete}>
        </DeleteCell>
      </Column>
    </Table>
    </Container>
  );
}

export default SubscriptionTable;

