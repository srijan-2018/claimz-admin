import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	Text,
	Box,
	Input,
	FormControl,
	FormLabel,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Button,
} from '@chakra-ui/react';
import AttendanceReportGraph from './attendanceReportGraph';
import AttendanceReportTable from './attendanceReportTable';
import { BeatLoader } from 'react-spinners';

const AttendanceReportView = () => {
	let token = localStorage.getItem('token');
	const [listValue, setListValue] = useState();
	const [graphValue, setgraphValue] = useState();
	let currentDate = new Date().toJSON().slice(0, 10);
	var date = new Date();
	var firstDay = convert(new Date(date.getFullYear(), date.getMonth(), 1));
	const [date1stValue, setDate1stValue] = useState(firstDay);
	const [date2ndValue, setDate2ndValue] = useState(currentDate);
	const [loader, setLoader] = useState(false);
	const [isLoadingModal, setIsLoadingModal] = useState(false);

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
		setLoader(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/monthly-attendance/${date1stValue}/${date2ndValue}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				let chartData = data.data;
				let finalData = [];
				let outerIndex = 0;

				for (let obj of chartData) {
					const outerObj = finalData.map((obj) => {
						return obj.emp_code;
					});
					outerIndex = outerObj.indexOf(obj.emp_code);

					if (outerIndex !== -1) {
						if (obj.attendance_status === 0) {
							finalData[outerIndex].absent += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 1) {
							finalData[outerIndex]['half day'] += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 2) {
							finalData[outerIndex].present += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 3) {
							finalData[outerIndex].holiday += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 4) {
							finalData[outerIndex].leave += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 5) {
							finalData[outerIndex].weekend += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						}
					} else {
						finalData.push({
							emp_code: obj.emp_code,
							emp_name: obj.emp_name,
							absent:
								obj.attendance_status === 0
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							'half day':
								obj.attendance_status === 1
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							present:
								obj.attendance_status === 2
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							holiday:
								obj.attendance_status === 3
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							leave:
								obj.attendance_status === 4
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							weekend:
								obj.attendance_status === 5
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
						});
					}
				}

				setListValue(finalData);

				let absent = 0;
				let half_day = 0;
				let leave = 0;
				let present = 0;
				let weekend = 0;
				let holiday = 0;

				for (let obj of finalData) {
					absent += Number(obj.absent);
					half_day += Number(obj['half day']);
					leave += Number(obj.leave);
					present += Number(obj.present);
					weekend += Number(obj.weekend);
					holiday += Number(obj.holiday);
				}

				let graphicalData = [
					{
						category: 'absent',
						value: absent,
					},
					{
						category: 'half day',
						value: half_day,
					},
					{
						category: 'leave',
						value: leave,
					},
					{
						category: 'present',
						value: present,
					},
					{
						category: 'weekend',
						value: weekend,
					},
					{
						category: 'holiday',
						value: holiday,
					},
				];

				setgraphValue(graphicalData);
				setLoader(false);
			})
			.catch((error) => {
				console.error(error);
				setLoader(false);
			});
	}, [isLoadingModal]);

	function apiCall() {
		setIsLoadingModal(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/monthly-attendance/${date1stValue}/${date2ndValue}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((data) => {
				let chartData = data.data;
				let finalData = [];
				let outerIndex = 0;

				for (let obj of chartData) {
					const outerObj = finalData.map((obj) => {
						return obj.emp_code;
					});
					outerIndex = outerObj.indexOf(obj.emp_code);

					if (outerIndex !== -1) {
						if (obj.attendance_status === 0) {
							finalData[outerIndex].absent += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 1) {
							finalData[outerIndex]['half day'] += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 2) {
							finalData[outerIndex].present += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 3) {
							finalData[outerIndex].holiday += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 4) {
							finalData[outerIndex].leave += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						} else if (obj.attendance_status === 5) {
							finalData[outerIndex].weekend += Number(
								obj['COUNT(attendance.attendance_status)']
							);
						}
					} else {
						finalData.push({
							emp_code: obj.emp_code,
							emp_name: obj.emp_name,
							absent:
								obj.attendance_status === 0
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							'half day':
								obj.attendance_status === 1
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							present:
								obj.attendance_status === 2
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							holiday:
								obj.attendance_status === 3
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							leave:
								obj.attendance_status === 4
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
							weekend:
								obj.attendance_status === 5
									? Number(
											obj[
												'COUNT(attendance.attendance_status)'
											]
									  )
									: 0,
						});
					}
				}

				setListValue(finalData);

				let absent = 0;
				let half_day = 0;
				let leave = 0;
				let present = 0;
				let weekend = 0;
				let holiday = 0;

				for (let obj of finalData) {
					absent += Number(obj.absent);
					half_day += Number(obj['half day']);
					leave += Number(obj.leave);
					present += Number(obj.present);
					weekend += Number(obj.weekend);
					holiday += Number(obj.holiday);
				}

				let graphicalData = [
					{
						category: 'present',
						value: present,
					},
					{
						category: 'half day',
						value: half_day,
					},
					{
						category: 'weekend',
						value: weekend,
					},
					{
						category: 'holiday',
						value: holiday,
					},
					{
						category: 'leave',
						value: leave,
					},
					{
						category: 'absent',
						value: absent,
					},
				];

				setgraphValue(graphicalData);
				setIsLoadingModal(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoadingModal(false);
			});
	}

	return (
		<Card>
			<CardHeader
				w='100%'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					display='-webkit-inline-box'
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					pb='10px'
					mb='15px'
					width='320px'
					pb='5px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Attendance Report
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
					<FormLabel htmlFor='endDate' fontSize='18px'>
						To
					</FormLabel>
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
						disabled={isLoadingModal}
						isLoading={isLoadingModal}
						spinner={<BeatLoader size={8} color='white' />}
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
						onClick={apiCall}>
						Apply
					</Button>
				</Box>
			</CardHeader>

			<Tabs>
				<TabList p='0px 20px'>
					<Tab fontSize='1.5rem' fontWeight='600' p='10px' mr='15px'>
						Visual Representation
					</Tab>
					<Tab fontSize='1.5rem' fontWeight='600' p='10px'>
						Tabular Representation
					</Tab>
				</TabList>

				<TabPanels>
					<TabPanel height='calc(100vh - 260px)'>
						<AttendanceReportGraph graphData={graphValue} />
					</TabPanel>
					<TabPanel px='0px'>
						<AttendanceReportTable
							dataList={listValue}
							loader={loader}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	);
};

export default AttendanceReportView;
