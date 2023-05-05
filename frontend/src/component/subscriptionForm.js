import { Form, Button, Divider, SelectPicker, Schema, Panel, FlexboxGrid } from "rsuite";
import React from 'react';
import axios from "axios";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
const { StringType } = Schema.Types;




const model = Schema.Model({
    user_id: StringType().isRequired('User field is required.'),
    membership_id: StringType().isRequired('Membership field is required.'),
});

const SubscriptionForm = () => {
    const formRef = React.useRef();
    const [formValue, setFormValue] = React.useState({
        user_id: '',
        membership_id: ''
    });
    const [formError, setFormError] = React.useState({});
    const [userList, setUserList] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [membership, setMembership] = React.useState(null);
    const [membershipList, setMembershipList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/user/members')
          .then(response => {
            setUserList(response.data.map(user=>({value:user._id, label:user.email_id})));
          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
        });

          axios.get('/membership/all')
          .then(response => {
            setMembershipList(response.data.map(membership=>({value:membership._id, label:membership.name})));
          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
          });
      }, []);

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            console.log(formError);
            return;
          }
      
      
      
          console.log(formValue, 'Form Value');
      
        axios.post('/enrollment/create',formValue)
          .then(response => {
            console.log(response);
            if(!alert("Subscription Successfull !!!")){window.location.reload()};

          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
        });
    }

    const handleMemebershipSelection = (id)=>{
        console.log(id);

        axios.get('/membership/get?id='+ id)
          .then(response => {
            setMembership(response.data);
          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
        });
    }
    const handleUserSelection=(id)=>{
        //console.log({id});
        axios.get('/user/get?id='+ id)
          .then(response => {
            //console.log(response.data);
            setUser(response.data);
          })
          .catch(error => {
            if(!alert(error.response.data.error)){window.location.reload()};
        });
    }

    const userDetail = ()=>{
        return (
            <>
            <h6>Id : </h6> {user._id} <hr />
            <h6>Email : </h6> {user.email_id} <br />
            <h6>Phone No. : </h6> {user.phone_no} <br />
            <h6>Role : </h6> {user.role} <br />
            </>
        );
    }

    const membershipDetail = ()=>{
        return (
            <>
            <h6>Id : </h6> {membership._id} <hr />
            <h6>Description : </h6> {membership.description} <br />
            <h6>Price : </h6> $ {membership.price} <br />
            <h6>Duration : </h6> {membership.duration} days <br />
            </>
        );
    }
    return (
        <>
            <Panel >
                <Form
                    layout="inline"
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                    checkTrigger="change"
                    fluid={true}

                >
                    <FlexboxGrid justify="space-around">
                        <FlexboxGridItem>
                            <Form.Group controlId="user">
                                <Form.ControlLabel>User : </Form.ControlLabel>
                                <Form.Control name="user_id" accepter={SelectPicker}  data={userList} style={{ width: 224 }} onChange={handleUserSelection}/>
                                <Divider />
                                <Panel header={user?user.name:'Select User'}  collapsible bordered>
                                   {user ? userDetail() : ''}
                                </Panel>
                            </Form.Group>
                        </FlexboxGridItem>
                        <FlexboxGridItem>
                            <Form.Group controlId="membership">
                                <Form.ControlLabel>Membership : </Form.ControlLabel>
                                <Form.Control name="membership_id" accepter={SelectPicker} data={membershipList} style={{ width: 224 }} onChange={handleMemebershipSelection} />
                                <Divider />
                                <Panel header={membership?membership.name:'Select membership'} collapsible bordered>
                                    {membership ? membershipDetail() : ''}
                                </Panel>
                            </Form.Group>
                        </FlexboxGridItem>
                        <FlexboxGridItem>
                            <Button appearance="primary" onClick={handleSubmit} style={{ top: "50px", width: "120px" }}>
                                Subscribe
                            </Button>
                        </FlexboxGridItem>
                    </FlexboxGrid>
                </Form>
            </Panel>
        </>
    );
}

export default SubscriptionForm;