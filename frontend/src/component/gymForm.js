import { Form, Button, ButtonToolbar, Schema, Container, Divider, Input} from 'rsuite';
import React from 'react';
// import JSONView from '../component/jsonview';
import axios from 'axios';


const { StringType } = Schema.Types;

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
  location: StringType().isRequired('Gym Location field is required.'),
  description: StringType().isRequired('Decsription field is required.'),

});



const CreateGymForm = () => {

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    location:'',
    description:''
  });

  
  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      console.log(formError);
      return;
    }



    console.log(formValue, 'Form Value');

    axios.post("/gym/create", formValue).then(res=>{
      console.log(res.data);
      window.location.reload();
     alert("Gym Created Successfully !!!");
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
          <h4>Create a new Gym</h4>
          <Divider />
          <Form.Group controlId="location">
      <Form.ControlLabel>Location</Form.ControlLabel>
      <Form.Control name="location" />
    </Form.Group>

          <Form.Group controlId="description">
      <Form.ControlLabel>Description</Form.ControlLabel>
      <Form.Control rows={5} name="description" accepter={Textarea} />
    </Form.Group>

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

export default CreateGymForm;