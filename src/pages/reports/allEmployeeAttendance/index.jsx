import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	Text,
	Box,
	Input,
	FormControl,
	FormLabel,
	Button,
	Image,
} from '@chakra-ui/react';
import AllEmployeeAttendanceReportTable from './allEmployeeAttendanceReportTable';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const AllEmployeeAttendanceReportView = () => {
	let token = localStorage.getItem('token');
	let navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const [listValue, setListValue] = useState();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [msg, setMsg] = useState();
	let currentDate = new Date().toJSON().slice(0, 10);
	var date = new Date();
	var firstDay = convert(new Date(date.getFullYear(), date.getMonth(), 1));

	const [date1stValue, setDate1stValue] = useState(firstDay);
	const [date2ndValue, setDate2ndValue] = useState(currentDate);

	function convert(str) {
		var date = new Date(str),
			mnth = ('0' + (date.getMonth() + 1)).slice(-2),
			day = ('0' + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join('-');
	}

	const handle1stDateChange = (event) => {
		const newDateString = event.target.value;
		setDate1stValue(newDateString);
		const parts = newDateString.split('-');
		const newDate = new Date(parts[1] - 1, parts[0], parts[2]);
	};

	const handle2ndDateChange = (event) => {
		const newDateString = event.target.value;
		setDate2ndValue(newDateString);
		const parts = newDateString.split('-');
		const newDate = new Date(parts[1] - 1, parts[0], parts[2]);
	};

	useEffect(() => {
		const attendanceReportTable = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/all-employee-attendance/${date1stValue}/${date2ndValue}/${rows}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setListValue(data1?.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		attendanceReportTable();
	}, [first, rows, msg]);

	const attendanceReportTable = async () => {
		try {
			setLoader(true);
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/all-employee-attendance/${date1stValue}/${date2ndValue}/${rows}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data1 = await response1.json();
				setListValue(data1?.data);
				setMsg(!msg);
				setLoader(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<Card>
			<CardHeader
				w='100%'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				p='0px 10px'>
				<Box
					display='-webkit-inline-box'
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					pb='10px'
					mb='15px'
					width='450px'
					pb='5px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='24px'
						lineHeight='36px'>
						All Employee Attendance Report
					</Text>
				</Box>
				<Box
					mt='10px'
					display='flex'
					alignItems='end'
					justifyContent='flex-end'>
					<FormControl mr={3}>
						<FormLabel htmlFor='startDate'>Date Range</FormLabel>
						<Input
							type='date'
							id='startDate'
							value={date1stValue}
							onChange={handle1stDateChange}
						/>
					</FormControl>
					<FormLabel htmlFor='endDate'>To</FormLabel>
					<FormControl mr={3}>
						<FormLabel htmlFor='endDate' visibility='hidden'>
							To
						</FormLabel>
						<Input
							type='date'
							id='endDate'
							value={date2ndValue}
							onChange={handle2ndDateChange}
						/>
					</FormControl>
					<Button
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='17px 30px'
						fontSize='1.4rem'
						lineHeight='8px'
						color='white'
						mt='30px'
						_hover='none'
						_active='none'
						onClick={attendanceReportTable}>
						Apply
					</Button>
				</Box>
			</CardHeader>
			{loader ? (
				<Box
					height='calc(100vh - 195px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<AllEmployeeAttendanceReportTable
					dataList={listValue}
					rows={rows}
					setRows={setRows}
					first={first}
					setFirst={setFirst}
				/>
			)}
		</Card>
	);
};

export default AllEmployeeAttendanceReportView;
