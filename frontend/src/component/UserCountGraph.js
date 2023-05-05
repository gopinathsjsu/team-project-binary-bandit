import React, { useState } from 'react';
import { Panel, Divider, SelectPicker } from 'rsuite';
import { LineChart, Line, XAxis } from 'recharts';
const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 15 },
  { name: 'C', value: 7 },
  // Add more data points as needed
];

const data1 = [
  { time: '2023-05-01', count: 5 },
  { time: '2023-05-07', count: 4 },
  { time: '2023-05-14', count: 15 },
  { time: '2023-05-21', count: 7 },
  { time: '2023-05-28', count: 8 }
];
const data2 = [
  { time: '2023-01-01', count: 1 },
  { time: '2023-02-01', count: 2 },
  { time: '2023-03-01', count: 10 },
  { time: '2023-04-01', count: 14 },
  { time: '2023-05-01', count: 15 }
];

const data3 = [
  { x: 1, y: 10 },
  { x: 2, y: 15 },
  { x: 3, y: 7 },
  // Add more data points as needed
];

const UserCountGraph = () => {
  
  return (
    <div>
      <h1>Line Chart Example</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
  
};

export default UserCountGraph;


