import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
// import {config} from "../../Constants";
// import AuthContext from "../context/AuthContext";
import { Container, Form } from "semantic-ui-react";
import { FlexboxGrid, SelectPicker, DateRangePicker } from 'rsuite';
Chart.register({ id: 'category', type: 'category', ticks: { align: 'center' } });

const selectOption = [
    { label: "Day", value: "byDay" },
    { label: "Week", value: "byWeekday" }
]


const dataByDay = { labels: [], datasets: [] };

class ClassEnrollmentChart extends Component {
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
       
        axios.post('/class-enroll/stats', { 
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
                    dataByWeekDay: {
                        labels: response.data.dataByWeekDay.labels,
                        datasets: response.data.dataByWeekDay.datasets
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
                        labels: this.state.dataByWeekDay.labels,
                        datasets: this.state.dataByWeekDay.datasets
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
                                labels: this.state.dataByWeekDay.labels,
                            }]
                        }
                    }

                });
                // console.log("aaaout")
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
                            <Bar data={this.state.chartData} options={this.state.options} />
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

export default ClassEnrollmentChart;