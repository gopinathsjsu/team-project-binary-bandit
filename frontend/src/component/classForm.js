import { Form, Button, ButtonToolbar, Input, Divider, SelectPicker, Schema, FlexboxGrid, DateRangePicker } from "rsuite";
import React from 'react';
import axios from "axios";
const { StringType} = Schema.Types;
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);




const model = Schema.Model({
    instructor_id: StringType().isRequired('User field is required.'),
    name: StringType().isRequired("Class Name is required ."),
    description: StringType().isRequired("Class decription is required ."),
    gym_id: StringType().isRequired('Membership field is required.')
});

const ClassForm = () => {
    const formRef = React.useRef();
    const [formValue, setFormValue] = React.useState({
        instructor_id: '',
        gym_id: '',
        name: '',
        description: '',
       timing:[]
    });
    const [formError, setFormError] = React.useState({});
    const [instructorList, setInstructorList] = React.useState([]);
    const [gymList, setGymList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/user/instructors')
            .then(response => {
                setInstructorList(response.data.map(instructor => ({ value: instructor._id, label: instructor.name })));
            })
            .catch(error => {
                if (!alert(error.response.data.error)) { window.location.reload() };
            });

        axios.get('/gym/all')
            .then(response => {
                setGymList(response.data.map(gym => ({ value: gym._id, label: gym.location })));
            })
            .catch(error => {
                if (!alert(error.response.data.error)) { window.location.reload() };
            });
    }, []);

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            console.log(formError);
            return;
        }

        

        console.log(formValue, 'Form Value');
        const body = {
            name : formValue.name,
            description : formValue.description,
            gym_id : formValue.gym_id,
            instructor_id : formValue.instructor_id,
            start_time: formValue.timing[0],
            end_time : formValue.timing[1]
        }

        // console.log({body});
        axios.post('/class/create', body)
            .then(response => {
                console.log(response);
                if (!alert("Class Created Successfull !!!")) { window.location.reload() };

            })
            .catch(error => {
                if (!alert(error.response.data.error)) { window.location.reload() };
            });
    }


    return (
        <>
        <br />
         <FlexboxGrid justify="center">
          <FlexboxGrid.Item>
            
                <Form
                    style={{ width: "400px" }}
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                    checkTrigger="change"
                    fluid={true}

                >
                    <h4>Create a new Class</h4>
                    <Divider />
                    <Form.Group controlId="name">
                        <Form.ControlLabel>Name</Form.ControlLabel>
                        <Form.Control name="name" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.ControlLabel>Description</Form.ControlLabel>
                        <Form.Control rows={5} name="description" accepter={Textarea} />
                    </Form.Group>

                            <Form.Group controlId="instructor">
                                <Form.ControlLabel>Instructor : </Form.ControlLabel>
                                <Form.Control name="instructor_id" accepter={SelectPicker} data={instructorList} style={{ width: "100%" }} />
                            </Form.Group>
                       
                            <Form.Group controlId="gym">
                                <Form.ControlLabel>Gym Location : </Form.ControlLabel>
                                <Form.Control name="gym_id" accepter={SelectPicker} data={gymList} style={{ width: "100%" }} />
                            </Form.Group>
                       

                    <Form.Group controlId="description">
                        <Form.ControlLabel>Timings</Form.ControlLabel>
                        <Form.Control 
                            name="timing" 
                            accepter={DateRangePicker} 
                            format="MM/dd/yyyy- hh:mm aa" 
                            defaultCalendarValue={[new Date(), new Date()]}
                            shouldDisableDate={DateRangePicker.beforeToday()}
                         />
                    </Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" style={{width:"100%"}} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ButtonToolbar>
                </Form>
                </FlexboxGrid.Item>
                </FlexboxGrid>
            
        </>
    );
}

export default ClassForm;