import { Table } from 'rsuite';
import { useState, useEffect } from 'react';

import { Button } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import axios from 'axios';

const { Column, HeaderCell, Cell } = Table;



const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            onChange={event => {
              onChange && onChange(rowData._id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };
  
  const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: '6px' }}>
        <Button
          appearance="link"
          onClick={() => {
            onClick(rowData._id);
          }}
        >
          {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
        </Button>
      </Cell>
    );
  };

  const DeleteCell = ({rowData, onClick, ...props})=>{
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
  
  

const GymTable=()=>{
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/gym/all')
          .then(response => {
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
  const handleEditState = id => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find(item => item._id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
   if(activeItem.status==null){
    //console.log(activeItem);
    axios.put("/gym/update", activeItem).then(res=>{
      console.log(res);
    }).catch(error=>{
      if(!alert(error.response.data.error)){window.location.reload()};
    })
   }
    
    setData(nextData);
  };

  const handleDelete = (id) => {
    // const nextData = Object.assign([], data);
    // nextData.find(item => item.id === id)[key] = value;
    // console.log(nextData);
    // setData(nextData);
    console.log(id);
    if(window.confirm("Are you sure wann delete the Gym ?")){
      axios.delete("/gym/delete?id="+id).then(res=>{
        console.log(res);
        window.location.reload()
        alert("Gym Deleted Successfully !!!")
      }).catch(error=>{
        if(!alert(error.response.data.error)){window.location.reload()};
      });
    }else{
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
    <Table 
    
    height={420} 
    // data={data}
    data={getData()}
    sortColumn={sortColumn}
    sortType={sortType}
    onSortColumn={handleSortColumn}
    loading={loading}
    >
      <Column width={200} fullText sortable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="_id"  />
      </Column>

      <Column width={200} fullText sortable>
        <HeaderCell>Location</HeaderCell>
        <EditableCell dataKey="location" onChange={handleChange} />
      </Column>
      <Column width={300} fullText sortable>
        <HeaderCell>Description</HeaderCell>
        <EditableCell dataKey="description" onChange={handleChange} />
      </Column>
      

      <Column flexGrow={1} >
        <HeaderCell>Edit</HeaderCell>
        <ActionCell dataKey="_id" onClick={handleEditState} />
      </Column>
      <Column flexGrow={1} >
        <HeaderCell>Delete</HeaderCell>
        <DeleteCell dataKey="_id" onClick={handleDelete}>
        </DeleteCell>
      </Column>
    </Table>
  );
}

export default GymTable;

