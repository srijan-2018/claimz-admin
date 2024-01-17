import { Box, Heading, Image, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import UpcomingHolidays from './upcomingholidays';
import Employee from '../../assets/images/employee.png';
import invoice from '../../assets/images/invoice.png';
import Employee2 from '../../assets/images/Employees2.png';
import Privacy from '../../assets/images/privacy.png';
import TabGraph from './tabgraph';
import { Link, useNavigate } from 'react-router-dom';
import AgeGraph from './agegraph';
import GradeListGraph from './gradelistgraph';
import Designationgraph from './designationgraph';

const Dashboard = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [upComingEvent, setUpComingEvent] = useState();
	const [loader, setLoader] = useState(false);
	const [attendanceList, setAttendanceList] = useState([]);
	const [designation, setDesignation] = useState();
	const [age, setAge] = useState([]);
	const [grade, setGrade] = useState([]);

	useEffect(() => {
		const upComingHoliday = async () => {
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/event-list-dashboard`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/attendance-list-dashboard`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/designation-wise-employee`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response3 = await fetch(
					`${process.env.REACT_APP_API_URL}/age-wise-employee`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response4 = await fetch(
					`${process.env.REACT_APP_API_URL}/grade-wise-employee`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					const data1 = await response1.json();
					const data2 = await response2.json();
					const data3 = await response3.json();
					const data4 = await response4.json();
					setUpComingEvent(data.data);
					setAttendanceList(data1.data);
					setDesignation(data2.data);
					setAge(data3.data);
					setGrade(data4.data);
					setLoader(false);
				} else if (response.status === 400) {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		upComingHoliday();
	}, []);

	return (
		<Box>
			<Box>
				<TabGraph AttendanceList={attendanceList} Loader={loader} />
			</Box>
			<Box
				mb='45px'
				borderRadius='15px'
				p='15px'
				bg='white'
				boxShadow='1px 1px 3px rgba(0, 0, 0, 0.3)'>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					flexWrap='wrap'>
					<Box w='42%' h='600px'>
						<Box mb='90px' mt='20px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Employee Grade List
							</Text>
							<Text>percentage of employee's grade</Text>
						</Box>
						<GradeListGraph Grade={grade} Loader={loader} />
					</Box>
					<Box w='56%' position='relative'>
						<Box>
							<Box position='absolute' top='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									{' '}
									Age Wise Employee List
								</Text>
								<Text>percentage of employee's</Text>
							</Box>
							<AgeGraph Age={age} Loader={loader} />
						</Box>

						<Box
							display='flex'
							position='absolute'
							bottom='75px'
							left='35%'>
							{age?.map((data, index) => {
								return (
									<Box
										display='flex'
										key={index}
										mr='10px'
										alignItems='center'>
										<Box
											width='10px'
											height='10px'
											bg={
												data.age_group === null
													? ''
													: data.age_group ===
													  '20 & below'
													? '#4781BF'
													: data.age_group === '20-29'
													? '#14355D'
													: data.age_group === '30-39'
													? '#1F5A85'
													: data.age_group === '40-49'
													? '#1C6FAD'
													: data.age_group === '50-59'
													? '#63a8dc'
													: data.age_group ===
													  '60 & above'
													? '#7dc7ff'
													: '#1C6FAD'
											}
											mr='10px'></Box>
										<Text>{data.age_group}</Text>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
			</Box>

			<Box mb='45px'>
				<Box
					w='100%'
					borderRadius='15px'
					p='15px'
					bg='white'
					boxShadow='1px 1px 3px rgba(0, 0, 0, 0.3)'
					mb='50px'>
					<Box mb='24px'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='28px'
							lineHeight='36px'>
							Designation wise list
						</Text>
						<Text>percentage of employee's designation</Text>
					</Box>
					<Designationgraph
						Designation={designation}
						Loader={loader}
					/>
				</Box>
				<Box
					w='100%'
					borderRadius='15px'
					p='15px'
					bg='white'
					boxShadow='1px 1px 3px rgba(0, 0, 0, 0.3)'>
					<UpcomingHolidays
						UpComingEvent={upComingEvent}
						Loader={loader}
					/>
				</Box>
			</Box>

			<Box display='flex' justifyContent='space-between' mb='50px'>
				<Box
					p='10px 24px'
					bgGradient='linear(180deg, #266EAB 0%, #03345E 100%)'
					borderRadius='15px'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					w='32%'
					display='flex'
					alignItems='center'>
					<Box color='white'>
						<Heading as='h2' mb='15px'>
							Employees
						</Heading>
						<Text>
							To create informative visual elements on your pages.
						</Text>
					</Box>
					<Image src={Employee} w='175px' h='175px' alt='Employees' />
				</Box>

				<Box
					p='10px 24px'
					bgGradient='linear(180deg, #266EAB 0%, #03345E 100%)'
					borderRadius='15px'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					w='32%'
					display='flex'
					alignItems='center'>
					<Box color='white'>
						<Heading as='h2' mb='15px'>
							Invoice
						</Heading>
						<Text>
							To create informative visual elements on your pages.
						</Text>
					</Box>
					<Image src={invoice} w='175px' h='175px' alt='Employees' />
				</Box>

				<Box
					p='10px 24px'
					bgGradient='linear(180deg, #266EAB 0%, #03345E 100%)'
					borderRadius='15px'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					w='32%'
					display='flex'
					alignItems='center'>
					<Box color='white'>
						<Heading as='h2' mb='15px'>
							Employees
						</Heading>
						<Text>
							To create informative visual elements on your pages.
						</Text>
					</Box>
					<Image
						src={Employee2}
						w='175px'
						h='175px'
						alt='Employees'
					/>
				</Box>
			</Box>

			<Box display='flex' justifyContent='space-between'>
				<Box
					p='15px 24px'
					bg='white'
					borderRadius='15px'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					w='48%'
					display='flex'
					alignItems='center'>
					<Box>
						<Heading as='h2' mb='15px'>
							Privacy Suggestions
						</Heading>
						<Text mb='15px'>
							Take our privacy checkup to choose which settings
							are right for you.
						</Text>
						<Link to='/privacy'>
							<Button colorScheme='blue'>
								Read More privacy
							</Button>
						</Link>
					</Box>
					<Image src={Privacy} w='175px' h='175px' alt='Employees' />
				</Box>

				<Box
					p='15px 24px'
					bg='white'
					borderRadius='15px'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					w='48%'
					display='flex'
					alignItems='center'>
					<Box>
						<Heading as='h2' mb='15px'>
							Privacy Suggestions
						</Heading>
						<Text mb='15px'>
							Take our privacy checkup to choose which settings
							are right for you.
						</Text>
						<Link to='/code-of-conduct'>
							<Button colorScheme='blue'>
								Read More Code of Conduct
							</Button>
						</Link>
					</Box>
					<Image src={Privacy} w='175px' h='175px' alt='Employees' />
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
