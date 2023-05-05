import { Form, Button, ButtonToolbar, Schema, Container, Divider, Radio, RadioGroup } from 'rsuite';
import React from 'react';
// import JSONView from '../component/jsonview';
import axios from 'axios';


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name field is required.'),
  address: StringType().isRequired('Address field is required.'),
  phone_no: NumberType('Please enter a valid number.'),
  role: StringType().isRequired('Role is required !'),
  email_id: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),

  password: StringType().isRequired('Password field is required.'),

});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const CreateUserForm = () => {

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: '',
    address: '',
    phone_no: '',
    role: '',
    email_id: '',
    password: ''
  });

  
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      console.log(formError);
      return;
    }



    console.log(formValue, 'Form Value');

    axios.post("/user/create", formValue).then(res=>{
      console.log(res.data);
      window.location.reload();
     alert("User Created Successfully !!!");
    })
    .catch(error=>{
      if(!alert(error.response.data.error)){window.location.reload()};
    });

  };


  return (
    
    <>

      <Container style={{ padding: "20px" }}>

        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          checkTrigger="blur"
          fluid={true}
        >
          <h4>Create a new Member</h4>
          <Divider />
          <TextField name="name" label="Name" />
          <TextField name="address" label="Address" />
          <TextField name="phone_no" label="Phone Number" />
          <Form.Group controlId="radio">
            <Form.ControlLabel>Role:</Form.ControlLabel>
            <Form.Control name="role" accepter={RadioGroup}>
              <Radio value="Employee" >Employee</Radio>
              <Radio value="Instructor">Instructor</Radio>
              <Radio value="Member"  >Member</Radio>
            </Form.Control>
          </Form.Group>
          {/* <TextField name="role" label="Role" /> */}
          <TextField name="email_id" label="Email" />
          <TextField name="password" label="Password" type="password" autoComplete="off" />

          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>


        {/* <JSONView formValue={formValue} formError={formError} /> */}

      </Container>
    </>

  );
};

export default CreateUserForm;