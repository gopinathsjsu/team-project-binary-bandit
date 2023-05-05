import { Form, Button, Divider, SelectPicker, Schema, Panel, FlexboxGrid } from "rsuite";
import React from 'react';
import axios from "axios";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import Cookies from 'js-cookie';
const { StringType } = Schema.Types;





const model = Schema.Model({
    class_id: StringType().isRequired('Class is required.'),
});

const EnrollmentForm = () => {
    const user_id = JSON.parse(Cookies.get('user')).user_id;
    // console.log(user_id);
    const formRef = React.useRef();

    const [class_id, setClassId] = React.useState('');
    const [classOb, setClassOb] = React.useState(null);
    const [formError, setFormError] = React.useState({});
    const [classList, setClassList] = React.useState([]);

    React.useEffect(() => {
        axios.get('/class-enroll/get/unenrolled?id='+ user_id)
            .then(response => {
                // console.log(response.data);
                setClassList(response.data.map(doc => ({ value: doc._id, label: doc.name })));
            })
            .catch(error => {
                if (!alert(error.response.data.error)) { window.location.reload() };
            });


    }, [user_id]);





    const handleClassSelection = (id) => {
        // console.log(id);
        setClassId(id)
        axios.get('/class/get?id=' + id)
            .then(response => {
                // console.log(response.data);
                setClassOb(response.data);
            })
            .catch(error => {
                // if(!alert(error.response.data.error)){window.location.reload()};
            });
        // console.log(classOb)
    }


    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            console.log(formError);
            return;
        }




        console.log({ user_id, class_id }, 'Form Value');

        axios.post('/class-enroll/enroll', { user_id, class_id })
            .then(response => {
                console.log(response);
                if (!alert("Enrolled Successfull !!!")) { window.location.reload() };

            })
            .catch(error => {
                if (!alert(error.response.data.error)) { window.location.reload() };
            });
    }


    const classInfo = () => {
        return (
            <p>
                <b>Id : </b>
                <small>
                    {classOb._id}
                </small>
                <br />
                <b>Description : </b>
                <small>
                    {classOb.description}
                </small>
                <br />
                <b>Instructor : </b>
                <small>
                    {classOb.instructor_id.name}
                </small>
                <br />
                <b>Instructor Contact: </b>
                <small>
                    {classOb.instructor_id.email_id}
                </small>
                <br />
                <b>Gym Location: </b>
                <small>
                    {classOb.gym_id.location}
                </small>
                <br />
                <b>Start Time: </b>
                <small>
                    {classOb.start_time}
                </small>
                <br />
                <b>End Time : </b>
                <small>
                    {classOb.end_time}
                </small>
                <br />
            </p>
        );
    }


    return (
        <>
            <Panel >
                <Form
                    layout="inline"
                    ref={formRef}
                    onCheck={setFormError}
                    model={model}
                    checkTrigger="change"
                    fluid={true}
                >
                    <FlexboxGrid align="middle" justify="space-around">
                        <FlexboxGridItem >
                            <FlexboxGrid justify="space-around" style={{width:"500px"}}>
                                <FlexboxGridItem>
                                <Form.Group controlId="class_id" >
                                <Form.ControlLabel>Class : </Form.ControlLabel>
                                <Form.Control name="class_id" accepter={SelectPicker} data={classList} style={{ width: "224px" }} onChange={handleClassSelection} />
                            </Form.Group>
                                </FlexboxGridItem>
                                <FlexboxGridItem>
                                <Button appearance="primary" onClick={handleSubmit} style={{ width: "120px" }}>
                                Enroll
                            </Button>
                                </FlexboxGridItem>
                            </FlexboxGrid>
                            
                            
                        </FlexboxGridItem>
                        <FlexboxGridItem>
                            
                            <Panel header={classOb ? classOb.name : 'Select a Class to enrolled'} shaded style={{ display: 'inline-block', width: 340 }}>
                        {classOb && <Divider />}
                        {classOb &&  classInfo()}
                    </Panel>
                        </FlexboxGridItem>

                    </FlexboxGrid>

                    <Divider />
                    
                    
                </Form>
            </Panel>
        </>
    );
}

export default EnrollmentForm;