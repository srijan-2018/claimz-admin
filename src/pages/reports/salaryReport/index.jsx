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
import SalaryReportGraph from './salaryReportGraph';
import SalaryReportTable from './salaryReportTable';

const SalaryReportView = () => {
	let token = localStorage.getItem('token');
	const [listValue, setListValue] = useState();
	const [graphValue, setgraphValue] = useState();
	const [componentsList, setComponentsList] = useState();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/monthly-salary`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				let chartData = data.data;
				let finalData = [];
				let outerIndex = 0;

				for (let obj of chartData) {
					const outerObj = finalData.map((obj) => {
						return obj.emp_id;
					});
					outerIndex = outerObj.indexOf(obj.emp_id);

					let amount = Number(obj.amount);
					let salary_component = obj.salary_component;

					if (outerIndex !== -1) {
						finalData[outerIndex][`${salary_component}`] = amount;
					} else {
						let tempObj = {
							emp_id: obj.emp_id,
							emp_name: obj.emp_name,
							department_name: obj.department_name,
						};
						tempObj[salary_component] = amount;
						finalData.push(tempObj);
					}
				}

				setListValue(finalData);

				let componentList = [];

				data.components.map((elem) => {
					componentList.push(elem.salary_component);
					return componentList;
				});

				let tableCols = [];

				tableCols.push({ field: 'emp_name', header: 'Employee' });
				tableCols.push({
					field: 'department_name',
					header: 'Department',
				});
				for (let obj of componentList) {
					tableCols.push({ field: obj, header: obj });
				}
				setComponentsList(tableCols);

				let graphicalData = [];
				let counterIndex = 0;

				for (let obj of chartData) {
					const outerObj = graphicalData.map((obj) => {
						return obj.component_id;
					});
					counterIndex = outerObj.indexOf(obj.component_id);

					let amount = Number(obj.amount);
					let salary_component = obj.salary_component;

					if (counterIndex !== -1) {
						graphicalData[counterIndex].value += amount;
					} else {
						let tempObj = {
							component_id: obj.component_id,
							category: salary_component,
							value: amount,
						};
						graphicalData.push(tempObj);
					}
				}

				setgraphValue(graphicalData);
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
					width='270px'
					pb='5px'
					ml='15px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Salary Report
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
						<SalaryReportGraph graphData={graphValue} />
					</TabPanel>
					<TabPanel>
						<SalaryReportTable dataList={listValue} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	);
};

export default SalaryReportView;
