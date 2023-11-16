import { Box } from '@chakra-ui/react'
import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const Array = [
    {
        name: 'python',
        student: 12,
        fees: '30$'
    },
    {
        name: 'Php',
        student: 20,
        fees: '20$'
    },
    {
        name: 'Node js',
        student: 6,
        fees: '40$'
    },
    {
        name: 'js',
        student: 25,
        fees: '22$'
    }
]

const AttendanceBar = () => {
    return (
        <Box borderRadius='15px' p='15px' bgGradient='linear(180deg, #DFFAFF 0%, #8ECBFF 100%)' sx={{
            '& .barChart': {
                display: 'flex',
                alignItems: 'center'
            }
        }}>
            <ResponsiveContainer className='barChart' width='90%' height='420px' aspect={1.5}>
                <BarChart data={Array}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="student" fill="#1a5b91" />
                </BarChart>
            </ResponsiveContainer>
        </Box >
    )
}

export default AttendanceBar