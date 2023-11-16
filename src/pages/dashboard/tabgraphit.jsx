import React, { useState, useEffect } from "react";
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
import { useNavigate } from 'react-router-dom'

const TabGraphIt = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    const [attendanceList, setAttendanceList] = useState([])
    useEffect(() => {
        const holidayPolicy = async () => {
            try {
                const response1 = await fetch(`${process.env.REACT_APP_API_URL}/attendance-list-department/197`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response1.ok) {
                    const data1 = await response1.json();
                    setAttendanceList(data1.data)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        };
        holidayPolicy()

    }, []);

    return (
        <BarChart
            height={450}
            width={1100}
            className="total_attendence_graph"
            data={attendanceList}
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
export default TabGraphIt