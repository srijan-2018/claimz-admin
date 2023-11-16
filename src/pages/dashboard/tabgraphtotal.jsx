import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const TabGraphTotal = ({ AttendanceList }) => {

  return (
    <BarChart
      height={450}
      width={1100}
      className="total_attendence_graph"
      data={AttendanceList}
      stackOffset="sign"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="absent" fill="#14355D" stackId="stack" />
      <Bar dataKey="half_day" fill="#4781BF" stackId="stack" />
      <Bar dataKey="present" fill="#1C6FAD" stackId="stack" />
      <Bar dataKey="holiday" fill="#1F5A85" stackId="stack" />
      <Bar dataKey="leave_" fill="#70a2d2" stackId="stack" />
      <Bar dataKey="weekend" fill="#5e6d85" stackId="stack" />
    </BarChart>
  );
}

export default TabGraphTotal