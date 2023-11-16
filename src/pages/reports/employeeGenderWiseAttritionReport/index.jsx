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
import EmpGenderWiseAttritionReportGraph from './empGenderWiseAttritionReportGraph';
import EmpGenderWiseAttritionReportTable from './empGenderWiseAttritionReportTable';

const EmpGenderWiseAttritionReportView = () => {
	let token = localStorage.getItem('token');
	const [listValue, setListValue] = useState();
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
		fetch(
			`${process.env.REACT_APP_API_URL}/attrition-gender/${date1stValue}/${date2ndValue}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((data) => setListValue(data.data))
			.catch((error) => console.error(error));
	}, []);

	function apiCall() {
		fetch(
			`${process.env.REACT_APP_API_URL}/attrition-gender/${date1stValue}/${date2ndValue}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((data) => setListValue(data.data))
			.catch((error) => console.error(error));
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
					width='650px'
					pb='5px'
					ml='15px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Employee Gender Wise Attrition Report
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
					<TabPanel>
						<EmpGenderWiseAttritionReportGraph
							graphData={listValue}
						/>
					</TabPanel>
					<TabPanel>
						<EmpGenderWiseAttritionReportTable
							dataList={listValue}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	);
};

export default EmpGenderWiseAttritionReportView;
