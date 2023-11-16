import { useState, useEffect } from 'react';
import {
	ChakraProvider,
	Box,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	Input,
	Select,
	Button,
	Stack,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
	Text,
	useToast,
} from '@chakra-ui/react';

import PtaxSlab from './PtaxSlab';
import EmployeeList from './EmployeeList';
import ComponentList from './componentlist';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

function App() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const toast = useToast();
	const [companyComponents, setCompanyComponents] = useState([]);
	const [type, setType] = useState('earning');
	const [ruleId, setRuleId] = useState('');
	const [isChecked, setIsChecked] = useState(0);
	const [sucess, setSucess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Request Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const [formData, setFormData] = useState({
		rule_id: '0',
		components: '',
		percentage: 0,
		type: 'earning',
		percentage_of: '0',
	});

	const [esicComponent1, setEsicComponent1] = useState({
		rule_id: '1',
		components: `Employee's contribution for Employees' State Insurance Corporation`,
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [esicComponent2, setEsicComponent2] = useState({
		rule_id: '1',
		components: `Employer's contribution for Employees' State Insurance Corporation`,
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [pfComponent1, setPfComponent1] = useState({
		rule_id: '3',
		components: `Employee's contribution for Provident Fund`,
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [pfComponent2, setPfComponent2] = useState({
		rule_id: '3',
		components: `Employer's contribution for Provident Fund`,
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [pfComponent3, setPfComponent3] = useState({
		rule_id: '3',
		components: 'Administrator charges',
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [ptaxComponent, setPtaxComponent] = useState({
		rule_id: '2',
		components: 'Professional Tax',
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});
	const [otherComponent, setOtherComponent] = useState({
		rule_id: '0',
		components: '',
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [tdsComponent, setTdsComponent] = useState({
		rule_id: '4',
		components: 'Tax Deducted at Source (TDS)',
		percentage: 0,
		type: 'deduction',
		percentage_of: '0',
	});

	const [perquisitsComponent, setPerquisitsComponent] = useState({
		rule_id: '0',
		components: '',
		percentage: 0,
		type: 'perquisits',
		percentage_of: '0',
	});
	const [profitComponent, setProfitComponent] = useState({
		rule_id: '0',
		components: '',
		percentage: 0,
		type: 'profit',
		percentage_of: '0',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type === 'earning') {
			// Perform API call with formData
			fetch(`${process.env.REACT_APP_API_URL}/company-components-write`, {
				method: 'POST',
				body: JSON.stringify({
					...formData,
					marking: isChecked,
				}),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then(() => {
					toastCall();
					setSucess(!sucess);
					setFormData({
						...formData,
						components: '',
						percentage: '',
						percentage_of: '',
					});
				})
				.catch((error) => {
					console.error('API error:', error);
					// Show error message
				});
		} else if (type === 'deduction') {
			if (ruleId === '1') {
				setIsLoading(true);
				// Perform API call with formData
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify({
							...esicComponent1,
							marking: isChecked,
						}),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setSucess(!sucess);
						setIsLoading(false);
						// Reset form data or show success message
					})
					.catch((error) => {
						setIsLoading(false);
						console.error('API error:', error);
						// Show error message
					});

				// Perform API call with formData
				setIsLoading(true);
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify(esicComponent2),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response2) => response2.json())
					.then((data) => {
						setSucess(!sucess);
						setIsLoading(false);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						setIsLoading(false);
						// Show error message
					});
			} else if (ruleId === '2') {
				// Perform API call with formData
				setIsLoading(true);
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify({
							...ptaxComponent,
							marking: isChecked,
						}),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setSucess(!sucess);
						// Reset form data or show success message
						setIsLoading(false);
					})
					.catch((error) => {
						console.error('API error:', error);
						// Show error message
						setIsLoading(false);
					});
			} else if (ruleId === '3') {
				// Perform API call with formData
				setIsLoading(true);
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify({
							...pfComponent1,
							marking: isChecked,
						}),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setSucess(!sucess);
						setIsLoading(false);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						setIsLoading(false);
						// Show error message
					});

				// Perform API call with formData
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify(pfComponent2),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response2) => response2.json())
					.then((data) => {
						setSucess(!sucess);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						// Show error message
					});

				// Perform API call with formData
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify(pfComponent3),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response3) => response3.json())
					.then((data) => {
						setSucess(!sucess);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						// Show error message
					});
			} else if (ruleId === '0') {
				// Perform API call with formData
				setIsLoading(true);
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify({
							...otherComponent,
							marking: isChecked,
						}),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setSucess(!sucess);
						setIsLoading(false);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						setIsLoading(false);
						// Show error message
					});
			} else if (ruleId === '4') {
				// Perform API call with formData
				setIsLoading(true);
				fetch(
					`${process.env.REACT_APP_API_URL}/company-components-write`,
					{
						method: 'POST',
						body: JSON.stringify({
							...tdsComponent,
							marking: isChecked,
						}),
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						setSucess(!sucess);
						setIsLoading(false);
						// Reset form data or show success message
					})
					.catch((error) => {
						console.error('API error:', error);
						setIsLoading(false);
						// Show error message
					});
			}
		} else if (type === 'perquisits') {
			// Perform API call with formData
			setIsLoading(true);
			fetch(`${process.env.REACT_APP_API_URL}/company-components-write`, {
				method: 'POST',
				body: JSON.stringify({
					...perquisitsComponent,
					marking: isChecked,
				}),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					toastCall();
					setSucess(!sucess);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('API error:', error);
					setIsLoading(false);
					// Show error message
				});
		} else if (type === 'profit') {
			// Perform API call with formData
			setIsLoading(true);
			fetch(`${process.env.REACT_APP_API_URL}/company-components-write`, {
				method: 'POST',
				body: JSON.stringify({
					...profitComponent,
					marking: isChecked,
				}),
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					toastCall();
					setSucess(!sucess);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('API error:', error);
					setIsLoading(false);
					// Show error message
				});
		}
	};

	useEffect(() => {
		// fetch all components
		const companyComponents = async () => {
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/company-components-read`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setCompanyComponents(data.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		companyComponents();
	}, [sucess]);

	const markAsBesic = companyComponents?.filter(
		(item) => item.fixed_component_marking === 1
	);
	const markAsHra = companyComponents?.filter(
		(item) => item.fixed_component_marking === 2
	);

	const sortedItems = companyComponents.sort(
		(a, b) => b.salary_component_id - a.salary_component_id
	);
	// percentage list
	const percentageSelect = sortedItems.map((data, index) => (
		<option value={data.salary_component_id} key={index}>
			{data.salary_component}
		</option>
	));
	const filteredArray = companyComponents.filter(
		(item) => item.type === 'perquisits'
	);
	const filteredArrayProfit = companyComponents.filter(
		(item) => item.type === 'profit'
	);
	const filteredArrayDeduction = companyComponents.filter(
		(item) => item.type === 'deduction'
	);
	const filteredArrayEsic = filteredArrayDeduction.filter(
		(item) => item.rule_id === 1
	);
	const filteredArrayPtax = filteredArrayDeduction.filter(
		(item) => item.rule_id === 2
	);
	const filteredArrayPf = filteredArrayDeduction.filter(
		(item) => item.rule_id === 3
	);
	const filteredArrayTds = filteredArrayDeduction.filter(
		(item) => item.rule_id === 4
	);

	return (
		<ChakraProvider>
			<Tabs size='md' isFitted>
				<TabList
					sx={{
						'& .chakra-tabs__tab': {
							borderRadius: '15px 15px 0px 0px',
							border: 'none',
							color: 'var(--chakra-colors-claimzTextBlueLightColor)',
							fontSize: '1.6rem',
							fontWeight: '700',
							pb: '10px',
							pt: '10px',
						},
						'& .chakra-tabs__tab[aria-selected=true]': {
							borderRadius: '15px 15px 0px 0px',
							color: 'white',
							bg: 'var(--chakra-colors-claimzMainGeadientColor)',
						},
					}}>
					<Tab fontSize='15px'>Payroll Settings</Tab>
					<Tab fontSize='15px'>Salary Settings</Tab>
					<Tab fontSize='15px'>Ptax Slab</Tab>
				</TabList>
				<TabPanels>
					<TabPanel
						p='0'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'>
						<Tabs
							bg='white'
							boxShadow='md'
							border='none'
							borderRadius='0px 0px 5px 5px'
							size='lg'
							isManual
							variant='enclosed'>
							<TabList
								bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='white'
								padding='10px 15px'>
								<Tab
									_selected={{
										color: 'var(--chakra-colors-claimzTextBlueColor)',
										bg: 'white',
									}}
									fontSize='1.4rem'
									borderRadius='5px'
									fontWeight='600'>
									Create Components
								</Tab>
								<Tab
									_selected={{
										color: 'var(--chakra-colors-claimzTextBlueColor)',
										bg: 'white',
									}}
									fontSize='1.4rem'
									borderRadius='5px'
									fontWeight='600'>
									Components List
								</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									{/* create components  */}
									<Box p={4}>
										<form
											onSubmit={handleSubmit}
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'flex-end',
											}}>
											<FormControl id='type' mb={4}>
												<FormLabel mb='10px'>
													<Text
														fontSize='1.6rem'
														fontWeight='700'>
														Type :
													</Text>
												</FormLabel>
												<RadioGroup
													value={type}
													onClick={(e) =>
														setType(e.target.value)
													}>
													<Stack
														direction='row'
														gap='20px'>
														<Radio
															value='earning'
															size='lg'
															defaultChecked>
															<Text
																fontSize='1.4rem'
																fontWeight='600'
																color='var(--chakra-colors-claimzTextBlueLightColor)'>
																Earning
															</Text>
														</Radio>
														<Radio
															mr='10'
															value='deduction'
															size='lg'>
															<Text
																fontSize='1.4rem'
																fontWeight='600'
																color='var(--chakra-colors-claimzTextBlueLightColor)'>
																Deduction
															</Text>
														</Radio>
														<Radio
															mr='10'
															value='perquisits'
															size='lg'>
															<Text
																fontSize='1.4rem'
																fontWeight='600'
																color='var(--chakra-colors-claimzTextBlueLightColor)'>
																Perquisite
															</Text>
														</Radio>
														<Radio
															mr='10'
															value='profit'
															size='lg'>
															<Text
																fontSize='1.4rem'
																fontWeight='600'
																color='var(--chakra-colors-claimzTextBlueLightColor)'>
																Profit
															</Text>
														</Radio>
													</Stack>
												</RadioGroup>
											</FormControl>

											{type === 'earning' && (
												<>
													<FormControl
														id='components'
														mb={4}>
														<FormLabel>
															Component
														</FormLabel>
														<Input
															type='text'
															id='components'
															required
															value={
																formData.components
															}
															onChange={(event) =>
																setFormData({
																	...formData,
																	components:
																		event
																			.target
																			.value,
																})
															}
														/>
													</FormControl>

													<FormControl
														id='percentage'
														mb={4}>
														<FormLabel>
															Percentage
														</FormLabel>
														<Input
															type='number'
															step='0.01'
															id='percentage'
															required
															value={
																formData.percentage
															}
															onChange={(event) =>
																setFormData({
																	...formData,
																	percentage:
																		event
																			.target
																			.value,
																})
															}
														/>
													</FormControl>

													<FormControl
														id='percentage_of'
														mb={4}>
														<FormLabel>
															Percentage Of
														</FormLabel>
														<Select
															placeholder='Select an option'
															id='percentage_of'
															value={
																formData.percentage_of
															}
															onChange={(event) =>
																setFormData({
																	...formData,
																	percentage_of:
																		event
																			.target
																			.value,
																})
															}>
															{percentageSelect}
															<option value='0'>
																CTC
															</option>
														</Select>
													</FormControl>

													{markAsBesic.length === 0 &&
													markAsHra.length === 0 ? (
														<Box w='100%'>
															<RadioGroup
																onChange={
																	setIsChecked
																}
																value={
																	isChecked
																}>
																<Stack direction='row'>
																	<Radio value='1'>
																		<Text
																			fontSize='1.2rem'
																			fontWeight='600'
																			color='var(--chakra-colors-claimzTextBlueLightColor)'>
																			Mark
																			as
																			Basic
																		</Text>
																	</Radio>
																	<Radio value='2'>
																		<Text
																			fontSize='1.2rem'
																			fontWeight='600'
																			color='var(--chakra-colors-claimzTextBlueLightColor)'>
																			Mark
																			as
																			HRA
																		</Text>
																	</Radio>
																</Stack>
															</RadioGroup>
														</Box>
													) : markAsBesic.length ===
													  0 ? (
														<Box w='100%'>
															<RadioGroup
																onChange={
																	setIsChecked
																}
																value={
																	isChecked
																}>
																<Stack direction='row'>
																	<Radio value='1'>
																		<Text
																			fontSize='1.2rem'
																			fontWeight='600'
																			color='var(--chakra-colors-claimzTextBlueLightColor)'>
																			Mark
																			as
																			Basic
																		</Text>
																	</Radio>
																</Stack>
															</RadioGroup>
														</Box>
													) : markAsHra.length ===
													  0 ? (
														<Box w='100%'>
															<RadioGroup
																onChange={
																	setIsChecked
																}
																value={
																	isChecked
																}>
																<Stack direction='row'>
																	<Radio value='2'>
																		<Text
																			fontSize='1.2rem'
																			fontWeight='600'
																			color='var(--chakra-colors-claimzTextBlueLightColor)'>
																			Mark
																			as
																			HRA
																		</Text>
																	</Radio>
																</Stack>
															</RadioGroup>
														</Box>
													) : (
														''
													)}

													<Button
														bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
														boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
														borderRadius='10px'
														p='20px 15px'
														fontSize='1.6rem'
														color='white'
														_hover={{
															bgGradient:
																'linear(180deg, #2267A2 0%, #0D4675 100%)',
														}}
														_active={{
															bgGradient:
																'linear(180deg, #2267A2 0%, #0D4675 100%)',
														}}
														_focus={{
															bgGradient:
																'linear(180deg, #2267A2 0%, #0D4675 100%)',
														}}
														mt='15px'
														type='submit'>
														Submit
													</Button>
												</>
											)}

											{type === 'deduction' && (
												<>
													<FormControl
														id='rule_id'
														mb={4}
														mt='10px'>
														<FormLabel mb='10px'>
															<Text
																fontSize='1.6rem'
																fontWeight='700'>
																Rule ID :
															</Text>
														</FormLabel>
														<RadioGroup
															value={ruleId}
															onClick={(e) =>
																setRuleId(
																	e.target
																		.value
																)
															}>
															<Radio
																size='lg'
																mr='10'
																value='1'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	ESIC
																</Text>
															</Radio>
															<Radio
																size='lg'
																mr='10'
																value='2'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	PTax
																</Text>
															</Radio>
															<Radio
																size='lg'
																mr='10'
																value='3'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	PF
																</Text>
															</Radio>
															<Radio
																size='lg'
																mr='10'
																value='4'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	TDS
																</Text>
															</Radio>
															<Radio
																size='lg'
																mr='10'
																value='0'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	Other
																</Text>
															</Radio>
														</RadioGroup>
													</FormControl>

													{ruleId === '1' && (
														<>
															<FormControl
																id='components'
																mb={4}>
																<FormLabel>
																	Component
																</FormLabel>
																<Input
																	type='text'
																	mb='10px'
																	value={
																		esicComponent1?.components
																	}
																	isReadOnly
																/>
																<Input
																	type='text'
																	value={
																		esicComponent2.components
																	}
																	isReadOnly
																/>
															</FormControl>

															{filteredArrayEsic?.length >
															0 ? (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	isDisabled>
																	Already
																	Added
																</Button>
															) : (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	type='submit'>
																	Submit
																</Button>
															)}
														</>
													)}

													{ruleId === '3' && (
														<>
															<FormControl
																id='components'
																mb={4}>
																<FormLabel fontSize='1.4rem'>
																	Component
																</FormLabel>
																<Input
																	type='text'
																	mb='10px'
																	value={
																		pfComponent1.components
																	}
																	isReadOnly
																/>
																<Input
																	type='text'
																	mb='10px'
																	value={
																		pfComponent2.components
																	}
																	isReadOnly
																/>
																<Input
																	type='text'
																	value={
																		pfComponent3.components
																	}
																	isReadOnly
																/>
															</FormControl>
															{filteredArrayPf?.length >
															0 ? (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	isDisabled>
																	Already
																	Added
																</Button>
															) : (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	type='submit'>
																	Submit
																</Button>
															)}
														</>
													)}

													{ruleId === '2' && (
														<>
															<FormControl
																id='components'
																mb={4}>
																<FormLabel>
																	Component
																</FormLabel>
																<Input
																	type='text'
																	value={
																		ptaxComponent.components
																	}
																	isReadOnly
																/>
															</FormControl>
															{filteredArrayPtax?.length >
															0 ? (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	isDisabled>
																	Already
																	Added
																</Button>
															) : (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	type='submit'>
																	Submit
																</Button>
															)}
														</>
													)}

													{ruleId === '0' && (
														<>
															<FormControl
																id='components'
																mb={4}>
																<FormLabel>
																	Component
																</FormLabel>
																<Input
																	type='text'
																	id='components'
																	required
																	value={
																		otherComponent.components
																	}
																	onChange={(
																		event
																	) =>
																		setOtherComponent(
																			{
																				...otherComponent,
																				components:
																					event
																						.target
																						.value,
																			}
																		)
																	}
																/>
															</FormControl>
															<FormControl
																id='percentage'
																mb={4}>
																<FormLabel>
																	Percentage
																</FormLabel>
																<Input
																	type='number'
																	step='0.01'
																	id='percentage'
																	value={
																		otherComponent.percentage
																	}
																	onChange={(
																		event
																	) =>
																		setOtherComponent(
																			{
																				...otherComponent,
																				percentage:
																					event
																						.target
																						.value,
																			}
																		)
																	}
																/>
															</FormControl>
															<FormControl
																id='percentage_of'
																mb={4}>
																<FormLabel>
																	Percentage
																	Of
																</FormLabel>
																<Select
																	placeholder='Select an option'
																	id='percentage_of'
																	value={
																		otherComponent.percentage_of
																	}
																	onChange={(
																		event
																	) =>
																		setFormData(
																			{
																				...otherComponent,
																				percentage_of:
																					event
																						.target
																						.value,
																			}
																		)
																	}>
																	{
																		percentageSelect
																	}
																	<option value='0'>
																		CTC
																	</option>
																</Select>
															</FormControl>

															<Button
																disabled={
																	isLoading
																}
																isLoading={
																	isLoading
																}
																spinner={
																	<BeatLoader
																		size={8}
																		color='white'
																	/>
																}
																bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																borderRadius='10px'
																p='20px 15px'
																fontSize='1.6rem'
																color='white'
																_hover={{
																	bgGradient:
																		'linear(180deg, #2267A2 0%, #0D4675 100%)',
																}}
																_active={{
																	bgGradient:
																		'linear(180deg, #2267A2 0%, #0D4675 100%)',
																}}
																_focus={{
																	bgGradient:
																		'linear(180deg, #2267A2 0%, #0D4675 100%)',
																}}
																mt='15px'
																type='submit'>
																Submit
															</Button>
														</>
													)}

													{ruleId === '4' && (
														<>
															<FormControl
																id='components'
																mb={4}>
																<FormLabel>
																	Component
																</FormLabel>
																<Input
																	type='text'
																	id='components'
																	value={
																		tdsComponent.components
																	}
																	onChange={(
																		event
																	) =>
																		setTdsComponent(
																			{
																				...tdsComponent,
																				components:
																					event
																						.target
																						.value,
																			}
																		)
																	}
																/>
															</FormControl>

															{filteredArrayTds?.length >
															0 ? (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	isDisabled>
																	Already
																	Added
																</Button>
															) : (
																<Button
																	disabled={
																		isLoading
																	}
																	isLoading={
																		isLoading
																	}
																	spinner={
																		<BeatLoader
																			size={
																				8
																			}
																			color='white'
																		/>
																	}
																	bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																	boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																	borderRadius='10px'
																	p='20px 15px'
																	fontSize='1.6rem'
																	color='white'
																	_hover={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_active={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	_focus={{
																		bgGradient:
																			'linear(180deg, #2267A2 0%, #0D4675 100%)',
																	}}
																	mt='15px'
																	type='submit'>
																	Submit
																</Button>
															)}
														</>
													)}
												</>
											)}

											{type === 'perquisits' && (
												<>
													<FormControl
														id='components'
														mb={4}>
														<FormLabel>
															Component
														</FormLabel>
														{/* Input or component input field for components */}
														<Input
															type='text'
															id='components'
															value={
																perquisitsComponent.components
															}
															onChange={(event) =>
																setPerquisitsComponent(
																	{
																		...perquisitsComponent,
																		components:
																			event
																				.target
																				.value,
																	}
																)
															}
														/>
													</FormControl>

													{filteredArray.type ===
													'perquisits' ? (
														<Button
															disabled={isLoading}
															isLoading={
																isLoading
															}
															spinner={
																<BeatLoader
																	size={8}
																	color='white'
																/>
															}
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='10px'
															p='20px 15px'
															fontSize='1.6rem'
															color='white'
															_hover={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_active={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_focus={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															mt='15px'
															isDisabled>
															Already Added
														</Button>
													) : (
														<Button
															disabled={isLoading}
															isLoading={
																isLoading
															}
															spinner={
																<BeatLoader
																	size={8}
																	color='white'
																/>
															}
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='10px'
															p='20px 15px'
															fontSize='1.6rem'
															color='white'
															_hover={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_active={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_focus={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															mt='15px'
															type='submit'>
															Submit
														</Button>
													)}
												</>
											)}

											{type === 'profit' && (
												<>
													<FormControl
														id='components'
														mb={4}>
														<FormLabel>
															Component
														</FormLabel>
														{/* Input or component input field for components */}
														<Input
															type='text'
															id='components'
															required
															value={
																profitComponent.components
															}
															onChange={(event) =>
																setProfitComponent(
																	{
																		...profitComponent,
																		components:
																			event
																				.target
																				.value,
																	}
																)
															}
														/>
													</FormControl>

													{filteredArrayProfit.type ===
													'"profit"' ? (
														<Button
															disabled={isLoading}
															isLoading={
																isLoading
															}
															spinner={
																<BeatLoader
																	size={8}
																	color='white'
																/>
															}
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='10px'
															p='20px 15px'
															fontSize='1.6rem'
															color='white'
															_hover={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_active={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_focus={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															mt='15px'
															isDisabled>
															Already Added
														</Button>
													) : (
														<Button
															disabled={isLoading}
															isLoading={
																isLoading
															}
															spinner={
																<BeatLoader
																	size={8}
																	color='white'
																/>
															}
															bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
															boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='10px'
															p='20px 15px'
															fontSize='1.6rem'
															color='white'
															_hover={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_active={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															_focus={{
																bgGradient:
																	'linear(180deg, #2267A2 0%, #0D4675 100%)',
															}}
															mt='15px'
															type='submit'>
															Submit
														</Button>
													)}
												</>
											)}
										</form>
									</Box>
								</TabPanel>
								<TabPanel>
									<ComponentList
										CompanyComponents={companyComponents}
									/>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</TabPanel>
					<TabPanel
						p='0'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'>
						<EmployeeList />
					</TabPanel>
					<TabPanel
						p='0'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'>
						<PtaxSlab />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</ChakraProvider>
	);
}

export default App;
