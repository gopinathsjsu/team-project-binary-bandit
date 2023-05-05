import React, { Component } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import {config} from "../../Constants";
import AuthContext from "../context/AuthContext";
import {Form} from "semantic-ui-react";
Chart.register({ id: 'category2', type: 'category', ticks: { align: 'center' } });


const dataByDay2 = { labels: [], datasets: [] };
const dataByWeekday = { labels: [], datasets: [] };


const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

function basicAuth(user) {
    if (user) {
        return `Basic ${user.authdata}`;
    }
    return null;
}

class LineChartForClassesAndEnrollment extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
        const endDate = new Date();
        this.state = {
            selectedOptionForClasses: 'byDay',
            chartData: dataByDay2,
            startDateForClasses: lastMonth.toISOString().substr(0, 10),
            endDateForClasses: lastDay.toISOString().substr(0, 10),
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

    getData(){
        const Auth = this.context
        const user = Auth.getUser()
        const startDatee = this.state.startDateForClasses
        const endDatee = this.state.endDateForClasses
        const data = { startDate: startDatee , endDate: endDatee}
        if (startDatee > endDatee) {
            alert("Start date cannot be greater than end date");
            return;
        }
        instance.post('/api/classes/data',data ,{
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
    async componentDidMount() {
        await this.getData()
        this.generateChartData()
    }

    generateChartData = () => {
        const value = this.state.selectedOptionForClasses
        this.getData()
        this.setState({selectedOptionForClasses:"byDay"})
        this.setState({selectedOptionForClasses:"byDay"})
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

            case 'byWeek':
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
            default:
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
        }
    };
    generateChartData2 = () => {
        const value = this.state.selectedOptionForClasses
        ///verfiy start end date

        switch (value) {
            case 'byDay':
                this.setState({
                    chartData: {
                        labels: this.state.dataByDay.labels,
                        datasets: this.state.dataByDay.datasets
                    },
                    selectedOptionForClasses:"byDay",
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

            case 'byWeek':
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
            default:
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
        }
    };
    handleOptionChange = (event) => {
        this.setState(
            {

                selectedOptionForClasses: event.target.value,
            },
            () => {
                this.generateChartData2();
            }
        );
    };
    handleStartDateChange = (event) => {
        const v = event.target.value
        this.setState(
            {
                startDateForClasses: v ,
            },
            () => {
                this.generateChartData();
            }
        );
    };

    handleEndDateChange = (event) => {
        this.setState(
            {
                endDateForClasses: event.target.value,
            },
            () => {
                this.generateChartData();
            }
        );
    };
    render() {
        return (
            <Form>
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

            <div>
                <div>
                    <label htmlFor="selectOption">Select option: </label>
                    <select
                        id="selectedOptionForClasses"
                        name="selectedOptionForClasses"
                        value={this.state.selectedOptionForClasses}
                        onChange={this.handleOptionChange}
                    >
                        <option value="byDay">By day</option>
                        <option value="byWeek">By weekday</option>
                    </select>
                    <div>
                        {/*<label htmlFor="startDate">Start Date: </label>*/}
                        {/*<input*/}
                        {/*    type="date"*/}
                        {/*    id="startDate"*/}
                        {/*    value={this.state.startDateForClasses}*/}
                        {/*    onChange={this.handleStartDateChange}*/}
                        {/*/>*/}
                        {/*<label htmlFor="endDate">End Date: </label>*/}
                        {/*<input*/}
                        {/*    type="date"*/}
                        {/*    id="endDate"*/}
                        {/*    value={this.state.endDateForClasses}*/}
                        {/*    onChange={this.handleEndDateChange}*/}
                        {/*/>*/}
                    </div>
                </div>
                {this.state.chartData.datasets && this.state.chartData.datasets.length > 0 ? (
                    <Line data={this.state.chartData} options={this.state.options} />
                ) : (
                    <p>No data to display. Change dates to see.</p>

                )}
                <br/>
            </div>
            </Form>
        );
    }
}

export default LineChartForClassesAndEnrollment;