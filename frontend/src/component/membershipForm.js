import { Form, Button, ButtonToolbar, Schema, Container, Divider, Slider} from 'rsuite';
import React from 'react';

// import JSONView from '../component/jsonview';
import axios from 'axios';


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Name field is required.'),
  description: StringType().isRequired('Description field is required.'),
  price: NumberType('Please enter a valid price.').range(
    0,
    50000,
    "Please Enter the Price in range of $0 - $5000"
  ),
  duration: NumberType().isRequired('Role is required !').range(
    1,
    365,
    "Please Enter the duration in rang of 1-365 days."
  )
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

const CreateMemeberShipForm = () => {

  const [price, setPrice] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    name: '',
    description: '',
    price: 0,
    duration: 0
  });

  
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      console.log(formError);
      return;
    }

    console.log(formValue, 'Form Value');

    axios.post("/membership/create", formValue).then(res=>{
      console.log(res.data);
      window.location.reload();
     alert("Membership Created Successfully !!!");
    })
    .catch(error=>{
      if(!alert("server Error : " + error.response.data.error)){window.location.reload()};
    });

  };


  return (
    
    <>
      {/* <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} /> */}

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
          <h4>Create a new Membership</h4>
          <Divider />
          <TextField name="name" label="Name" />
          <TextField name="description" label="Description" />
          <Form.Group controlId="price">
          <Form.ControlLabel>Price: ${price}</Form.ControlLabel>
            <Form.Control
                min={0}
                max = {5000}
                accepter={Slider}
                name="price"
                label="Price"
                handleStyle={{
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 12,
                    width: 32,
                    height: 22
                  }}
                style={{ margin: '10px 0' }}
                onChange={price => {
                    setPrice(price);
                  }}
            />
            </Form.Group>
            <Form.Group controlId="duration">
          <Form.ControlLabel>Duration: {duration} days</Form.ControlLabel>
            <Form.Control
                min={0}
                max = {365}
                accepter={Slider}
                name="duration"
                label="duration"
                style={{ margin: '10px 0' }}
                onChange={duration => {
                    setDuration(duration);
                  }}

            />
            </Form.Group>
          {/* <TextField name="role" label="Role" /> */}

          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>

        {/* <Divider />

        <h3>Manage Users</h3>

        <Divider /> */}


        {/* <JSONView formValue={formValue} formError={formError} /> */}

      </Container>
    </>

  );
};

export default CreateMemeberShipForm;