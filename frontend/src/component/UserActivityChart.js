import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
// import {config} from "../../Constants";
// import AuthContext from "../context/AuthContext";
import { Container, Form } from "semantic-ui-react";
import { FlexboxGrid, SelectPicker, DateRangePicker } from 'rsuite';
import Cookies from 'js-cookie';

Chart.register({ id: 'category', type: 'category', ticks: { align: 'center' } });

const selectOption = [
    { label: "Day", value: "byDay" },
    { label: "Weekdays", value: "byWeekday" },
    { label: "Weekends", value: "byWeekend" }
]

// const dataByDay = {
//     labels: ['1', '2', '3', '4', '5', '6', '7','1', '2', '3', '4', '5', '6', '7'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by day)',
//             data: [20, 10, 30, 15, 25, 20, 30,20, 10, 30, 15, 25, 20, 30],
//             fill: true,
//             borderColor: 'green',
//             backgroundColor:"rgb(75, 192, 192)",
//             tension: 0.5,
//         },
//         {
//             label: 'Number of visitors by the hour (by day)',
//             data: [20, 10, 30, 15, 25, 20, 30,20, 10, 30, 15, 25, 20, 30],
//             fill: true,
//             borderColor: 'green',
//             backgroundColor:"rgb(75, 0, 192)",
//             tension: 0.5,
//         }
//     ],
// };

// const dataByWeekday = {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by weekday)',
//             data: [40, 30, 20, 25, 35],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };

// const dataByWeekend = {
//     labels: ['Saturday', 'Sunday'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by weekend)',
//             data: [45, 50],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };

const dataByDay = { labels: [], datasets: [] };


class UserActivityChart extends Component {
    // static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            // dataByDay:dataByDay,
            // dataByWeekday:dataByWeekday,
            // dataByWeekend:dataByWeekend,
            selectedOption: 'byDay',
            chartData: dataByDay,
            dateRange:['1900-12-12','2100-12-12'],
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            type: 'category',
                            labels: [],
                        },
                    ],
                },
            },
        };
    }

    componentDidMount() {
        // const Auth = this.context
        // const user = Auth.getUser()
        // console.log(this.state.gymId);
        // console.log("here");
        // console.log(this.state.gymList);
        const user_id = JSON.parse(Cookies.get('user')).user_id;
        // console.log(user_id);
        axios.post('/log/hour-spend', { 
            user_id, 
            start_time: this.state.dateRange[0], 
            end_time: this.state.dateRange[1] 
        })
            .then(response => {
                this.setState({
                    chartData: {
                        labels: response.data.dataByDay.labels, // update the labels here
                        datasets: response.data.dataByDay.datasets
                    },
                    dataByDay: {

                        labels: response.data.dataByDay.labels, // update the labels here
                        datasets: response.data.dataByDay.datasets
                    },
                    dataByWeekday: {
                        labels: response.data.dataByWeekday.labels,
                        datasets: response.data.dataByWeekday.datasets
                    },
                    dataByWeekend: {
                        labels: response.data.dataByWeekend.labels,
                        datasets: response.data.dataByWeekend.datasets
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                            xAxes: [{
                                type: 'category',
                                labels: response.data.dataByDay.labels,
                            }]
                        }
                    }
                });
            })
            .catch(error => console.log(error));
    }

   

    handleDateChange = (value) =>{
        console.log("here2");
        console.log(value);
        this.state.dateRange= value;
        console.log(this.state.dateRange);
        this.componentDidMount();
    }

    handleOptionChange = (value) => {
        // const value = event.target.value;
        this.setState({ selectedOption: value });
        switch (value) {
            case 'byWeekday':
                this.setState({
                    chartData: {
                        labels: this.state.dataByWeekday.labels,
                        datasets: this.state.dataByWeekday.datasets
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                            xAxes: [{
                                type: 'category',
                                labels: this.state.dataByWeekday.labels,
                            }]
                        }
                    }

                });
                // console.log("aaaout")
                break;

            case 'byWeekend':
                console.log(this.state.dataByWeekend.datasets)
                this.setState({
                    chartData: {
                        labels: this.state.dataByWeekend.labels,
                        datasets: this.state.dataByWeekend.datasets
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                            xAxes: [{
                                type: 'category',
                                labels: this.state.dataByWeekend.labels,
                            }]
                        }
                    }

                });
                break;
            default:
                this.setState({
                    chartData: {
                        labels: this.state.dataByDay.labels,
                        datasets: this.state.dataByDay.datasets
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                            xAxes: [{
                                type: 'category',
                                labels: this.state.dataByDay.labels,
                            }]
                        }
                    }

                });
                break;
        }
    };

    render() {
        return (<>

            <Container style={{ width: "620px" , margin:"20px"}}>
                <Form>
                    <div>
                        <FlexboxGrid justify='space-around'>
                            <FlexboxGrid.Item>
                                <div>
                                    <label>By : </label>
                                    <SelectPicker
                                        defaultValue={this.state.selectedOption}
                                        data={selectOption}
                                        onChange={this.handleOptionChange}
                                    />
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item>
                                <div>
                                    <label>Date Range : </label>
                                    <DateRangePicker placeholder="Select Date Range"  onChange={this.handleDateChange}/>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>

                        {this.state.chartData.datasets && this.state.chartData.datasets.length > 0 ? (
                            <Line data={this.state.chartData} options={this.state.options} />
                        ) : (
                            <p>No data to display. Change dates to see.</p>
                        )}
                        <br />
                    </div>
                </Form>
            </Container>
        </>
        );
    }
}

export default UserActivityChart;