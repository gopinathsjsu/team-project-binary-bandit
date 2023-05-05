import {Panel, SelectPicker} from 'rsuite';
import React from 'react';
import axios from 'axios';

const SelectUser = (props) => {
    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/user/all')
          .then(response => {
            setUserList(response.data.map(user=>({value:user._id, label:user.name})));
          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
        });
      }, []);
    return (
        <>
            <Panel>
                <SelectPicker data={userList} placement="auto" placeholder="Select Location" onChange={(val)=>{props.setUser(val)}} />
            </Panel>
        </>
    );
}

export default SelectUser