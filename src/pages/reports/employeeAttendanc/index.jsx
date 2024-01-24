import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	Text,
	Box,
	FormControl,
	FormLabel,
	Button,
	Image,
	Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EmployeeAttendanceReportTable from './employeeAttendanceReportTable';
import Loader from '../../../assets/images/loader.gif';

const EmployeeAttendancReportView = () => {
	let token = localStorage.getItem('token');
	let navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const [listValue, setListValue] = useState();
	const [empList, setEmpList] = useState();
	const [employee, setemployee] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const selectEmployee = (event) => {
		setemployee(event.target.value);
	};
	const selectMonth = (event) => {
		setMonth(event.target.value);
	};
	const selectYear = (event) => {
		setYear(event.target.value);
	};

	useEffect(() => {
		const attendanceReportTable = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setEmpList(data1.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		attendanceReportTable();
	}, []);

	const attendanceReportTable = async () => {
		try {
			setLoader(true);
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/employee-attendance/${employee}/${month}/${year}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data1 = await response1.json();
				setListValue(data1.data);
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
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					width='470px'
					pb='5px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Employee Attendance Report
					</Text>
				</Box>

				<Box
					mt='10px'
					display='flex'
					alignItems='end'
					justifyContent='flex-end'>
					<FormControl mr={3}>
						<FormLabel htmlFor='startDate'>
							Select Employee
						</FormLabel>
						<Select
							placeholder='Select Employee'
							onChange={selectEmployee}>
							{empList?.map((data, index) => {
								return (
									<option value={data.id} key={index}>
										{data.emp_name}
									</option>
								);
							})}
						</Select>
					</FormControl>

					<FormControl mr={3}>
						<FormLabel>Select Month</FormLabel>
						<Select
							placeholder='Select Month'
							onChange={selectMonth}>
							<option value='01'>January</option>
							<option value='02'>February</option>
							<option value='03'>March</option>
							<option value='04'>April</option>
							<option value='05'>May</option>
							<option value='06'>June</option>
							<option value='07'>July</option>
							<option value='08'>August</option>
							<option value='09'>September</option>
							<option value='10'>October</option>
							<option value='11'>November</option>
							<option value='12'>December</option>
						</Select>
					</FormControl>

					<FormControl mr={3}>
						<FormLabel htmlFor='endDate'>Select Year</FormLabel>
						<Select placeholder='Select Year' onChange={selectYear}>
							<option value='2025'>2025</option>
							<option value='2024'>2024</option>
							<option value='2023'>2023</option>
							<option value='2022'>2022</option>
							<option value='2021'>2021</option>
							<option value='2020'>2020</option>
							<option value='2013'>2019</option>
						</Select>
					</FormControl>

					{employee.length > 0 &&
					month.length > 0 &&
					year.length > 0 ? (
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
					) : (
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
							isDisabled>
							Apply
						</Button>
					)}
				</Box>
			</CardHeader>

			{loader ? (
				<Box
					height='calc(100vh - 190px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<EmployeeAttendanceReportTable dataList={listValue} />
			)}
		</Card>
	);
};

export default EmployeeAttendancReportView;
