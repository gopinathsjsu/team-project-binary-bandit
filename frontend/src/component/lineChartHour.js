import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import {config} from "../../Constants";
import AuthContext from "../context/AuthContext";
import {Form} from "semantic-ui-react";
import moment from 'moment';
Chart.register({ id: 'category1', type: 'category', ticks: { align: 'center' } });
// const dataByDay = {
//     labels: ['1', '2', '3', '4', '5', '6', '7'],
//     datasets: [
//         {
//             label: 'Number of visitors by the hour (by day)',
//             data: [20, 10, 30, 15, 25, 20, 30],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//         },
//     ],
// };
//
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
//
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
const dataByWeekday = { labels: [], datasets: [] };
const dataByWeekend = { labels: [], datasets: [] };

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

function basicAuth(user) {
    if (user) {
        return `Basic ${user.authdata}`;
    }
    return null;
}

class LineChart extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        const endDate = moment().subtract(1, 'week').endOf('week');
        const startDate = moment(endDate).subtract(1, 'week').startOf('week');

        this.state = {
            selectedOption: 'byDay',
            chartData: dataByDay,
            startDateForClasses: startDate.format('YYYY-MM-DD'),
            endDateForClasses: endDate.format('YYYY-MM-DD'),
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
        const Auth = this.context
        const user = Auth.getUser()

        const startDate = this.state.startDateForClasses
        const endDate = this.state.endDateForClasses
        const data = { startDate: startDate , endDate: endDate}

        if (startDate > endDate) {
            alert("Start date cannot be greater than end date");
            return;
        }
        instance.post('/api/clock/get-hours-by-day-week-month',data ,{
            headers: {'Content-type': 'application/json',
                'Authorization': basicAuth(user) }
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

    handleOptionChange = (event) => {
        const value = event.target.value;
        this.setState({ selectedOption: value });
        switch (value) {
            case 'byDay':

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
                break;
            case 'byMonth':
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
    handleStartDateChange = (event) => {
        const v = event.target.value
        this.setState(
            {
                startDateForClasses: v ,
            },
            () => {
                this.componentDidMount()
            }
        );
    };

    handleEndDateChange = (event) => {
        this.setState(
            {
                endDateForClasses: event.target.value,
            },
            () => {
                this.componentDidMount()
            }
        );
    };
    render() {
        return (
            <Form>

                <div>
                    <div>
                        <label htmlFor="selectOption">Select option: </label>
                        <select
                            id="selectOption"
                            value={this.state.selectedOption}
                            onChange={this.handleOptionChange}
                        >
                            <option value="byDay">By day</option>
                            <option value="byWeekday">By weekday</option>
                            <option value="byMonth">By Month</option>
                        </select>
                    </div>

                </div>
                {this.state.selectedOption === 'byDay' &&
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='Start Date'
                            name='startDateForClasses'
                            type='date'
                            value={this.state.startDateForClasses}
                            onChange={this.handleStartDateChange}
                            required
                        />
                        <Form.Input
                            label='End Date'
                            name='endDateForClasses'
                            type='date'
                            value={this.state.endDateForClasses}
                            onChange={this.handleEndDateChange}
                            required
                        />
                    </Form.Group>
                }
                {this.state.chartData.datasets && this.state.chartData.datasets.length > 0 ? (
                    <Line data={this.state.chartData} options={this.state.options} />
                ) : (
                    <p>No data to display. Change dates to see.</p>

                )}
                <br/>
            </Form>

        );
    }
}

export default LineChart;