import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	useToast,
	useDisclosure,
	FormControl,
	FormLabel,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	FormHelperText,
	Select,
	Heading,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import LoaderImg from '../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
		padding-bottom: 10px;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		padding-bottom: 10px;
		background: #fff;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.p-datatable-wrapper {
		margin-top: 5px;
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 247px);
	}
`;

const ShiftDataTable = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const token = localStorage.getItem('token');
	const [flag, setFlag] = useState(false);
	const [sucess, setSucess] = useState();
	const [products, setProducts] = useState();
	const [updatedValue, setUpdatedValue] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		'country.name': {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		representative: { value: null, matchMode: FilterMatchMode.IN },
		status: {
			operator: FilterOperator.OR,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
	});

	function toastCallFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/shift`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setProducts(data1.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, [sucess]);

	const onRowEditComplete = (e) => {
		let _products = [...products];
		let { newData, index } = e;

		_products[index] = newData;

		setUpdatedValue(_products);
	};

	const textEditor = (options) => {
		return (
			<Input
				textAlign='center'
				type='text'
				value={options.value}
				onChange={(e) => options.editorCallback(e.target.value)}
			/>
		);
	};

	const ShiftBodyTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [shiftId, setShiftId] = useState(rowData.shift_id);
		const [shiftData, setShiftData] = useState();

		const shiftView = async (e) => {
			e.preventDefault();
			onOpen();
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/shift-time/${shiftId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			setShiftData(data.data);
		};

		return (
			<Box>
				<Button
					bg='none'
					onClick={shiftView}
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</Button>

				<Drawer
					placement='right'
					onClose={onClose}
					isOpen={isOpen}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								display='-webkit-inline-box'
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									View Shift Details
								</Text>
							</Box>
						</DrawerHeader>
						<DrawerBody>
							<Accordion>
								{shiftData?.map((data, index) => {
									return (
										<AccordionItem key={index}>
											<AccordionButton
												background='var(--chakra-colors-claimzMainGeadientColor)'
												p='10px 10px'
												color='white'
												fontSize='1.4rem'
												fontWeight='600'
												_hover={{
													bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												}}
												_active={{
													bg: 'var(--chakra-colors-claimzMainGeadientColor)',
												}}
												_focus={{ bg: 'none' }}
												mb='10px'>
												<Box
													as='span'
													flex='1'
													textAlign='left'>
													{data?.days}
												</Box>
												<AccordionIcon />
											</AccordionButton>
											<AccordionPanel pb={4}>
												<Box p='10px' mb='15px'>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Absent Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.absent_time}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Check in Time Available
														-{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{
																data?.check_in_time_available
															}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Created at -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.created_at}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Days -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.days}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Early Leave Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{
																data?.early_leave_time
															}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Grace Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.grace_time}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Half Day -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.half_day}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														In Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.in_time}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Out Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.out_time}
														</Box>
													</Text>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														Over Time -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'
															fontSize='14px'>
															{data?.over_time}
														</Box>
													</Text>
												</Box>
											</AccordionPanel>
										</AccordionItem>
									);
								})}
							</Accordion>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		);
	};

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
	};

	const renderHeader = () => {
		const value = filters['global'] ? filters['global'].value : '';

		return (
			<Box
				w='100%'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					display='-webkit-inline-box'
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					pb='10px'
					mb='15px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Shift Management List
					</Text>
				</Box>
				<Box display='flex' alignItems='center'>
					<Box
						as='span'
						w='auto !important'
						className='p-input-icon-left'
						display='flex'
						alignItems='center'>
						<i
							style={{ lineHeight: 1.5 }}
							className='pi pi-search'
						/>
						<Input
							pl='24px'
							type='search'
							value={value || ''}
							onChange={(e) => onGlobalFilterChange(e)}
							placeholder='Global Search'
							w='100%'
						/>
					</Box>
					<Link to='/shift-management/add-shift-management'>
						<Button
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							p='20px 20px'
							color='white'
							ml='15px'
							fontSize='1.6rem'
							borderRadius='15px'
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
							}}>
							<Text fontSize='1.6rem' fontWeight='700'>
								<i className='fa-solid fa-plus'></i> Add Shift
							</Text>
						</Button>
					</Link>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [shiftName, setShiftName] = useState();
		const [formFields, setFormFields] = useState([
			{
				days: 'Monday',
				in_time: '',
				out_time: '',
				grace_time: '',
				half_day: '',
				absent_time: '',
				over_time: '',
				early_leave_time: '',
				check_in_time_available: '',
			},
		]);

		const showToast = (
			status = 'success',
			message = 'Success',
			duration = 3000,
			closable = true
		) => {
			return toast({
				title: message,
				status: status,
				duration: duration,
				isClosable: closable,
			});
		};
		const handleChange = (index, event) => {
			const { name, value } = event.target;

			if (name == 'days') {
				let foundFlag = false;
				formFields.map((item) => {
					if (item.days == value) {
						foundFlag = true;
					}
				});

				if (foundFlag) {
					showToast('error', 'You have already selected the day.');
				} else {
					const updatedFields = [...formFields];
					updatedFields[index][name] = value;
					setFormFields(updatedFields);
				}
			} else {
				const updatedFields = [...formFields];
				updatedFields[index][name] = value;
				setFormFields(updatedFields);
			}
		};

		const addFormField = () => {
			let weekDays = [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			];
			let nextDay = weekDays[formFields.length];
			setFormFields([
				...formFields,
				{
					days: nextDay,
					in_time: '',
					out_time: '',
					grace_time: '',
					half_day: '',
					absent_time: '',
					over_time: '',
					early_leave_time: '',
					check_in_time_available: '',
				},
			]);
		};

		function toastCall() {
			return toast({
				title: 'Question List Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const updateQuestion = async (e) => {
			e.preventDefault();
			const fromValues = new FormData();
			fromValues.append('shift_name', shiftName);
			fromValues.append('shift_id', rowData.shift_id);
			fromValues.append('times', JSON.stringify(formFields));

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/shift-post`,
					{
						method: 'POST',
						body: fromValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				if (response.status === 200) {
					toastCall();
					setSucess(!sucess);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			} catch {
				toastCallFaild();
				setIsLoading(false);
			}
		};

		console.log(formFields, 'formFields');

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-pen'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='60% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								display='-webkit-inline-box'
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Shift Master Details Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box>
								<form
									onSubmit={updateQuestion}
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}>
									<Box w='100%'>
										<FormControl mb='15px'>
											<FormLabel> Shift Name</FormLabel>
											<Input
												type='text'
												onChange={(e) =>
													setShiftName(e.target.value)
												}
											/>
										</FormControl>
									</Box>
									<Box w='100%'>
										<Box
											display='flex'
											justifyContent='space-between'>
											<Heading
												mb='5px'
												background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
												backgroundClip='text'
												fontWeight='700'
												fontSize='18px'>
												Set Shift Schedule Time :
											</Heading>
											{formFields.length < 7 && (
												<Button
													bgGradient='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
													boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
													borderRadius='5px'
													p='18px 25px'
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
													onClick={addFormField}>
													<Text
														mr='10px'
														fontWeight='700'>
														Add Others Day
													</Text>
													<i className='fa-solid fa-plus'></i>
												</Button>
											)}
										</Box>
										{formFields.map((field, index) => (
											<FormControl mt='15px' key={index}>
												<Box>
													<Box
														display='flex'
														justifyContent='space-between'
														mb='15px'>
														<FormControl width='19%'>
															<FormLabel>
																{' '}
																Day
															</FormLabel>
															<Select
																placeholder='Select Days'
																name='days'
																value={
																	field.days
																}
																onChange={(
																	event
																) =>
																	handleChange(
																		index,
																		event
																	)
																}>
																<option
																	value='Monday'
																	key='Monday'>
																	Monday
																</option>
																<option
																	value='Tuesday'
																	key='Tuesday'>
																	Tuesday
																</option>
																<option
																	value='Wednesday'
																	key='Wednesday'>
																	Wednesday
																</option>
																<option
																	value='Thursday'
																	key='Thursday'>
																	Thursday
																</option>
																<option
																	value='Friday'
																	key='Friday'>
																	Friday
																</option>
																<option
																	value='Saturday'
																	key='Saturday'>
																	Saturday
																</option>
																<option
																	value='Sunday'
																	key='Sunday'>
																	Sunday
																</option>
															</Select>
														</FormControl>
														<FormControl width='19%'>
															<FormLabel>
																{' '}
																In Time
															</FormLabel>
															<Input
																type='time'
																name='in_time'
																value={
																	field.in_time
																}
																onChange={(
																	event
																) =>
																	handleChange(
																		index,
																		event
																	)
																}
															/>
														</FormControl>
														<FormControl width='19%'>
															<FormLabel>
																{' '}
																Out Time
															</FormLabel>
															<Input
																type='time'
																name='out_time'
																value={
																	field.out_time
																}
																onChange={(
																	event
																) =>
																	handleChange(
																		index,
																		event
																	)
																}
															/>
														</FormControl>
														<FormControl width='19%'>
															<FormLabel>
																{' '}
																Grace Time
															</FormLabel>
															<Input
																type='time'
																name='grace_time'
																value={
																	field.grace_time
																}
																onChange={(
																	event
																) =>
																	handleChange(
																		index,
																		event
																	)
																}
															/>
														</FormControl>
														<FormControl width='19%'>
															<Button
																width='100%'
																bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
																boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
																borderRadius='5px'
																p='18px 25px'
																fontSize='1.6rem'
																color='white'
																mt='26px'
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
																onClick={() => {
																	setFlag(
																		!flag
																	);
																}}>
																<Text mr='10px'>
																	Add More
																</Text>
																{flag ? (
																	<i className='fa-solid fa-minus'></i>
																) : (
																	<i className='fa-solid fa-plus'></i>
																)}
															</Button>
														</FormControl>
													</Box>
													<Box
														display={
															flag
																? 'block'
																: 'none'
														}
														bg='white'
														p='15px'
														boxShadow='1px 1px 3px rgba(0,0,0,0.3)'
														borderRadius='10px'>
														<Box
															display='flex'
															justifyContent='space-between'
															mb='15px'>
															<FormControl width='24%'>
																<FormLabel>
																	{' '}
																	Half Day
																</FormLabel>
																<Input
																	type='time'
																	name='half_day'
																	value={
																		field.half_day
																	}
																	onChange={(
																		event
																	) =>
																		handleChange(
																			index,
																			event
																		)
																	}
																/>
															</FormControl>
															<FormControl width='24%'>
																<FormLabel>
																	Mark as
																	Absent
																</FormLabel>
																<Input
																	type='time'
																	name='absent_time'
																	value={
																		field.absent_time
																	}
																	onChange={(
																		event
																	) =>
																		handleChange(
																			index,
																			event
																		)
																	}
																/>
															</FormControl>
															<FormControl width='24%'>
																<FormLabel>
																	Early Leave
																</FormLabel>
																<Input
																	type='time'
																	name='over_time'
																	value={
																		field.over_time
																	}
																	onChange={(
																		event
																	) =>
																		handleChange(
																			index,
																			event
																		)
																	}
																/>
															</FormControl>
															<FormControl width='24%'>
																<FormLabel>
																	Overtime
																	Shift
																</FormLabel>
																<Input
																	type='time'
																	name='early_leave_time'
																	value={
																		field.early_leave_time
																	}
																	onChange={(
																		event
																	) =>
																		handleChange(
																			index,
																			event
																		)
																	}
																/>
															</FormControl>
														</Box>
														<Box
															display='flex'
															justifyContent='space-between'>
															<FormControl width='49%'>
																<FormLabel>
																	{' '}
																	Hour
																</FormLabel>
																<Input
																	type='number'
																	name='check_in_time_available'
																	value={
																		field.check_in_time_available
																	}
																	onChange={(
																		event
																	) =>
																		handleChange(
																			index,
																			event
																		)
																	}
																/>
																<FormHelperText
																	fontSize='12px'
																	fontWeight='600'
																	display='flex'
																	alignItems='c'>
																	<Box
																		as='span'
																		color='orange'
																		fontSize='14px'>
																		*
																	</Box>
																	<Box>
																		Check in
																		time
																		available
																		in hour
																		format
																		only.
																	</Box>
																</FormHelperText>
															</FormControl>
														</Box>
													</Box>
												</Box>
											</FormControl>
										))}
									</Box>
									<Button
										disabled={isLoading}
										isLoading={isLoading}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='5px'
										p='20px 20px'
										fontSize='1.6rem'
										color='white'
										mt='28px'
										mb='28px'
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
										type='submit'>
										Submit
									</Button>
								</form>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 147px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={LoaderImg} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable
						value={products}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						editMode='row'
						dataKey='shift_id'
						onRowEditComplete={onRowEditComplete}
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='shift_name'
							header='Shift Name '
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '31%' }}></Column>
						<Column
							field='inventoryStatus'
							header='Shift View'
							body={ShiftBodyTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '31%' }}></Column>
						<Column
							header='Edit'
							body={ActionTemplate}
							headerStyle={{ width: '31%', minWidth: '8rem' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
				</div>
			)}
		</CssWrapper>
	);
};

export default ShiftDataTable;
