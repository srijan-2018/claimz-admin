import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	Text,
	Box,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import EmpGenderWiseDiversityReportGraph from './empGenderWiseDiversityReportGraph';
import EmpGenderWiseDiversityReportTable from './empGenderWiseDiversityReportTable';

const EmpGenderWiseDiversityReportView = () => {
	let token = localStorage.getItem('token');
	const [selectedTab, setSelectedTab] = React.useState(0);
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
		fetch(`${process.env.REACT_APP_API_URL}/diversity-gender`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => setListValue(data.data))
			.catch((error) => console.error(error));
	}, []);

	function apiCall() {
		fetch(`${process.env.REACT_APP_API_URL}/diversity-gender`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		})
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
					pb='5px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Employee Gender Wise Diversity Report
					</Text>
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
						<EmpGenderWiseDiversityReportGraph
							graphData={listValue}
						/>
					</TabPanel>
					<TabPanel>
						<EmpGenderWiseDiversityReportTable
							dataList={listValue}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	);
};

export default EmpGenderWiseDiversityReportView;
