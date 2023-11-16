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
import DepartmentWiseSalaryReportGraph from './departmentWiseSalaryReportGraph';
import DepartmentWiseSalaryReportTable from './departmentWiseSalaryReportTable';

const DepartmentWiseSalaryReportView = () => {
	let token = localStorage.getItem('token');
	const [listValue, setListValue] = useState();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/department-salary`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				let finalData = data.data;
				finalData.map((obj) => {
					obj.gross_amount = obj.gross_amount.toFixed(2);
					obj.net_amount = obj.net_amount.toFixed(2);
					return obj;
				});
				setListValue(finalData);
			})
			.catch((error) => console.error(error));
	}, []);

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
					width='550px'
					pb='5px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Department Wise Salary Report
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
						<DepartmentWiseSalaryReportGraph
							graphData={listValue}
						/>
					</TabPanel>
					<TabPanel>
						<DepartmentWiseSalaryReportTable dataList={listValue} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	);
};

export default DepartmentWiseSalaryReportView;
