import { Panel, Divider, SelectPicker, FlexboxGrid } from "rsuite";
import { useEffect, useState } from "react";
import axios from 'axios';

const GymCard = () => {

    const [locations, setLocations] = useState([]);
    const [gym, setGym] = useState(null);
    const [classes, setClasses] = useState([]);
    const [membership, setMembership] = useState([]);


    useEffect(() => {
        axios.get('/gym/all')
            .then(response => {
                setLocations(response.data.map(gym => ({ label: gym.location, value: gym._id })));
                setGym(response.data.length > 0 ? response.data[0] : null);
            })
            .catch(error => {
                console.error(error);
            });

            axios.get('/membership/all')
            .then(response => {
                
                setMembership(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);


    const handleChange = (id) => {
        axios.get("/gym/get?id=" + id).then(res => {
            // console.log(res);
            setGym(res.data);
        }).catch(e=>{
            console.log(e);
            // alert("Error Occured");
        });

        axios.get("/class/gym?id="+id).then(res=>{
            console.log(res.data);
            setClasses(res.data);
        }).catch(e=>{
            console.log(e);
        });

    }

    const classInfo = (classOb) => {
        return (
            <>
            
            <ul>
                <li>Description : {classOb.description}</li>
                <li>Instructor :  {classOb.instructor_id.name}</li>
                <li>Gym Location : {classOb.gym_id.location} </li>
                <li>Start Time : {classOb.start_time}</li>
                <li>End Time : {classOb.end_time}</li>
            </ul>
           
               
            </>
        );
    }

    const membershipInfo = (classOb) => {
        return (
            <>
            
            <ul>
                <li>Description : {classOb.description}</li>
                <li>Price : $ {classOb.price}</li>
                <li>Duration : {classOb.duration} </li>
            </ul>
           
               
            </>
        );
    }

    const classesCards = ()=>{
        const cards=[];
        classes.forEach(ele=>{
            cards.push( <FlexboxGrid.Item>
                            
                <Panel header={ele.name} shaded style={{ display: 'inline-block', width: 340 }}>
            {ele && <Divider />}
            {ele &&  classInfo(ele)}
        </Panel>
            </FlexboxGrid.Item>)
        })
        return cards;
    }
    const membershipCards = ()=>{
        const cards=[];
        membership.forEach(ele=>{
            cards.push( <FlexboxGrid.Item>
                            
                <Panel header={ele.name} shaded style={{ display: 'inline-block', width: 340 }}>
            {ele && <Divider />}
            {ele &&  membershipInfo(ele)}
        </Panel>
            </FlexboxGrid.Item>)
        })
        return cards;
    }

    return (
        <Panel>
            <SelectPicker data={locations} onChange={handleChange} placement="auto" placeholder="Select Location" defaultValue={locations.length>0 ? locations[0].value:''} />
            
            {gym && (
                <>
                <Divider />
                <Panel header="Fitness Center" bordered>
                    <Divider />
                    <FlexboxGrid justify="space-around" align="middle">
                        <FlexboxGrid.Item>
                            <img src="https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="Gym" style={{ width: "600px", height: "300px" }} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <ul>
                                <li>
                                    Location : {gym.location}
                                </li>
                                <li>
                                    Description: {gym.description}
                                </li>
                            </ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Panel>
                <br />
                <h5>Classes At this Location</h5>
                <Panel>
                    <FlexboxGrid>
                    {classesCards()}
                    </FlexboxGrid>
                </Panel>
                <Divider />
                <h5>Available Memberships</h5>
                <br />
                <FlexboxGrid justify="space-around">
                {membershipCards()}
                </FlexboxGrid>

                </>
            )}
        </Panel>
    );

}

export default GymCard;