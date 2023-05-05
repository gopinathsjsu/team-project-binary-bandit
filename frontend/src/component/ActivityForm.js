import { Form, Button, SelectPicker, Schema, Panel, FlexboxGrid } from "rsuite";
import React from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
const { StringType } = Schema.Types;

const model = Schema.Model({
    equipment: StringType().isRequired('Equipment is required.'),
    minutes: StringType().isRequired('Minutes is required.')
});

const ActivityForm = () => {

    let user=  JSON.parse(Cookies.get('user')).user_id;
   
    const formRef = React.useRef();
    const [equipment, setEquipment] = React.useState('');
    const [minutes, setMinutes] = React.useState(0);
    const [formError, setFormError] = React.useState({});
    

    const body = {
        user_id: user,
        activity_type: equipment,
        duration: minutes
    }
    
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.error('Form Error');
            console.log(formError);
            return;
        }
        console.log(body, 'Form Value');
        
        axios.post('/log/create', body)
            .then(response => {
                console.log(response);
                if (!alert("Activity added successfully !!!")) { window.location.reload() };

            })
            .catch(error => {
                console.log(error);
                if (!alert(error.response.data.error)) { window.location.reload() };
            });
    }

    return (
        <>
            <Panel >
            <div style={{ marginTop: '20px' }}>
  <Form
    layout="vertical"
    ref={formRef}
    onCheck={setFormError}
    model={model}
    checkTrigger="change"
    style={{ padding: '10px' }}
  >
    <FlexboxGrid align="middle" justify="center">
      <FlexboxGrid.Item>
        <FlexboxGrid justify="space-around" style={{ width: '500px' }}>
          <FlexboxGrid.Item>
            <Form.Group controlId="equipment">
              <Form.ControlLabel>Equipment:</Form.ControlLabel>
              <Form.Control
                name="equipment"
                accepter={SelectPicker}
                data={[
                  { value: 'Treadmill', label: 'Treadmill' },
                  { value: 'Cycling', label: 'Cycling' },
                  { value: 'Weight Training', label: 'Weight Training' },
                  { value: 'Stairs', label: 'Stairs' },
                  { value: 'Cardio', label: 'Cardio' },
                ]}
                onChange={(value) => setEquipment(value)}
                style={{ width: '200px' }}
              />
            </Form.Group>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Form.Group controlId="minutes">
              <Form.ControlLabel>Minutes:</Form.ControlLabel>
              <Form.Control
                name="minutes"
                onChange={(value) => setMinutes(value)}
                style={{ width: '100px' }}
                type="Number"
              />
            </Form.Group>
          </FlexboxGrid.Item>
         
          <FlexboxGrid.Item style={{ marginLeft: '0%', marginTop:'15px' }} align="middle" justify="center">
            <Button appearance="primary" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </FlexboxGrid.Item>
       
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Form>
</div>

            </Panel>
        </>
    );
}

export default ActivityForm;