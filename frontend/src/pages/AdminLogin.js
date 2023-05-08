import React, { useState } from 'react';
import { Form, Button, Schema, Container, Content, Panel, Divider, ButtonToolbar, FlexboxGrid } from 'rsuite';
import Cookies from 'js-cookie';
import CustomNavbar from '../component/navbar';
const { StringType } = Schema.Types;


const model = Schema.Model({
    password: StringType().isRequired('Password field is required.'),
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.')
});


const AdminLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            if(email!=='admin@gmail.com'){
                alert("Wrong admin email !!");
            }else if(password!=='admin'){
                alert("Wrong password Admin !!!");
            }else{
                // Set user_id in cookies
                Cookies.set('admin', "admin");

                // Handle successful login
                console.log('Admin logged in.');
                window.location = '/admin-dashboard';   
            }
            
    
            
            
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
        }
    };

   

    const [activeKey, setActiveKey] = React.useState("adminLogin");

    
    return (
        <>
            <CustomNavbar activeKey={activeKey} onSelect={setActiveKey} />
            <div style={{
                backgroundImage:
                "url('https://t4.ftcdn.net/jpg/01/02/52/13/360_F_102521378_1DWSrQUG4kkYkmdigcHVqMjJszB4ORJF.jpg')",
                height: '100vh',
                marginTop: '0px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <Container>
                    <Content >
                        <FlexboxGrid justify="center" align="middle" style={{ height: "80vh" }}>
                            <FlexboxGrid.Item colspan={12}>
                                <Panel header={<h3>Admin Login</h3>} bordered style={{ background: "#fff" }}>
                                    <Divider />
                                    <Form model={model} fluid >
                                        <Form.Group>
                                            <Form.ControlLabel>Email</Form.ControlLabel>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(value) => setEmail(value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>Password</Form.ControlLabel>
                                            <Form.Control
                                                name="password"
                                                type="password"
                                                autoComplete="off"
                                                onChange={setPassword}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button onClick={handleLogin} appearance="primary">Sign in</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Content>
                </Container>
            </div>

            
        </>
    );
};

export default AdminLogin;
