import { Container, Divider, Table } from 'rsuite';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

const { Column, HeaderCell, Cell } = Table;

const CheckInActivityTable = () => {
    const [data, setData] = useState([]);

    const user_id = JSON.parse(Cookies.get('user')).user_id;
    console.log(user_id);
    useEffect(() => {
        axios.post('/registry/user', { user_id })
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [user_id]);

   

    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], data);
        nextData.find(item => item._id === id)[key] = value;
        //console.log(nextData);
        setData(nextData);
    };


   

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    return (
        <Container style={{ padding: "20px" }}>
            <h5>CheckIn / Checkout Records</h5>
            <Divider />
            <Table
                height={420}
                // data={data}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            >
                {/* <Column width={200} sortable fullText>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="_id" />
                </Column> */}

                <Column width={200} sortable fullText>
                    <HeaderCell>Gym Location</HeaderCell>
                    <Cell dataKey="gym_id['location']" onChange={handleChange} />
                </Column>
                <Column width={200} sortable fullText>
                    <HeaderCell>CheckIn</HeaderCell>
                    <Cell dataKey="checkin_time" onChange={handleChange} />
                </Column>
                <Column width={200} sortable fullText>
                    <HeaderCell>Checkout</HeaderCell>
                    <Cell dataKey="checkout_time" onChange={handleChange} />
                </Column>
                <Column width={200} sortable>
                    <HeaderCell>Checkin Time ($)</HeaderCell>
                    <Cell dataKey="checkin_time" onChange={handleChange} />
                </Column>
            </Table>
        </Container>
    );
}

export default CheckInActivityTable;

