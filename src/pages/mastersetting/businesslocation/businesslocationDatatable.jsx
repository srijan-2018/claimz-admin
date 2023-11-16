import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Button,
	Input,
	FormControl,
	FormLabel,
	useToast,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Image,
	Select,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
		padding: 15px 10px;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-column-header-content {
		justify-content: center;
	}
	.p-paginator .p-paginator-pages .p-paginator-page {
		font-size: 1.4rem;
	}
	.p-paginator .p-dropdown .p-dropdown-label {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
	}
`;
const BusinessLocationDatatable = () => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [sucess, setsucess] = useState();
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/get-office-details`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setEmpList(data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [sucess]);

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
		date: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
		},
		balance: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		status: {
			operator: FilterOperator.OR,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
	});

	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const RenderHeader = () => {
		const toast = useToast();
		const [latitude, setLatitude] = useState();
		const [longitude, setLongitude] = useState();
		const [radius, setRadius] = useState();
		const [place, setPlace] = useState();
		const [id, setId] = useState();
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Business Location Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallFaild() {
			return toast({
				title: 'Request Failed',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}

		useEffect(() => {
			const formDataValue = async () => {
				try {
					const response1 = await fetch(
						`${process.env.REACT_APP_API_URL}/state-master`,
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					if (response1.ok) {
						const data1 = await response1.json();
						setPlace(data1.data.state);
					}
				} catch (error) {
					navigate('/login');
				}
			};
			formDataValue();
		}, []);

		const addCompanyLocation = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('state_id', id);
			formData.append('lat', latitude);
			formData.append('lng', longitude);
			formData.append('radius', radius);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/add-office-details`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCall();
					setsucess(!sucess);
					setIsLoading(false);
					setLatitude('');
					setLongitude('');
					setRadius('');
					setId('');
				} else {
					setIsLoading(false);
					setLatitude('');
					setLongitude('');
					setRadius('');
					setId('');
				}
			} catch {
				setIsLoading(false);
			}
		};

		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
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
							lineHeight='36px'
							width='380px !important'>
							Business Locations
						</Text>
					</Box>
					<Box
						as='span'
						w='40%'
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
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Global Search'
							w='100%'
						/>
					</Box>
				</Box>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'>
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
						}}
						onClick={onOpen}>
						<Text fontSize='1.6rem' fontWeight='700'>
							<i className='fa-solid fa-plus'></i> Add New
						</Text>
					</Button>

					<Drawer
						isOpen={isOpen}
						placement='right'
						onClose={onClose}
						size='xl'>
						<DrawerOverlay />
						<DrawerContent
							maxW='40% !important'
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
										Add Business Location
									</Text>
								</Box>
							</DrawerHeader>
							<DrawerBody>
								<form
									onSubmit={addCompanyLocation}
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Enter Latitude
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='text'
											value={latitude}
											onChange={(e) =>
												setLatitude(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Enter Longitude
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='text'
											value={longitude}
											onChange={(e) =>
												setLongitude(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%' mb='15px'>
										<FormLabel>
											Enter Radius
											<Box as='span' color='orange'>
												*
											</Box>
										</FormLabel>
										<Input
											type='text'
											value={radius}
											onChange={(e) =>
												setRadius(e.target.value)
											}
											required
										/>
									</FormControl>
									<FormControl w='100%'>
										<FormLabel>Select Location</FormLabel>
										<Select
											placeholder='Select option'
											onChange={(event) =>
												setId(event.target.value)
											}>
											{place?.map((data, index) => {
												return (
													<option
														value={data.id}
														key={index}>
														{data.name}
													</option>
												);
											})}
										</Select>
									</FormControl>
									<Button
										disabled={isLoading}
										isLoading={isLoading}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										mt='20px'
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px'
										fontSize='1.6rem'
										color='white'
										type='submit'
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
										Submit
									</Button>
								</form>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Box>
			</Box>
		);
	};

	const DetailsTemplate = (rowData) => {
		const toast = useToast();
		const [latitude, setLatitude] = useState(rowData.company_lat);
		const [longitude, setLongitude] = useState(rowData.company_lng);
		const [radius, setRadius] = useState(rowData.radius);
		const [id, setId] = useState(rowData.state_id);
		const [companyAddressId, setCompanyAddressId] = useState(
			rowData?.company_address_id
		);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Business Location Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallFaild() {
			return toast({
				title: 'Request Failed',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}

		const updateCompanyLocation = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('state_id', id);
			formData.append('lat', latitude);
			formData.append('lng', longitude);
			formData.append('radius', radius);
			formData.append('company_address_id', companyAddressId);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/add-office-details`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCall();
					setsucess(!sucess);
					setIsLoading(false);
				} else {
					toastCallFaild();
					setIsLoading(false);
				}
			} catch {
				setIsLoading(false);
			}
		};

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
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
									Business Locations List Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<form
								onSubmit={updateCompanyLocation}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl w='100%' mb='15px'>
									<FormLabel>
										Enter Latitude
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={latitude}
										onChange={(e) =>
											setLatitude(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%' mb='15px'>
									<FormLabel>
										Enter Longitude
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={longitude}
										onChange={(e) =>
											setLongitude(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%' mb='15px'>
									<FormLabel>
										Enter Radius
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={radius}
										onChange={(e) =>
											setRadius(e.target.value)
										}
										required
									/>
								</FormControl>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									mt='20px'
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px'
									fontSize='1.6rem'
									color='white'
									type='submit'
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
									Update
								</Button>
							</form>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const LocationTemplate = (rowData) => {
		const [location, setLocation] = useState(empList?.state);
		const object = location.find((obj) => obj.id === rowData.state_id);

		return <Box>{object.name}</Box>;
	};
	const Header = RenderHeader();

	return (
		<CssWrapper
			width='100%'
			height='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			{loader ? (
				<Box
					height='calc(100vh - 139px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box className='card'>
					<DataTable
						value={empList?.address}
						header={Header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='company_address_id'>
						<Column
							header='Location'
							body={LocationTemplate}
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='Company Lat'
							field='company_lat'
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='Company Long'
							field='company_lng'
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='Company Radius'
							field='radius'
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='Edit'
							body={DetailsTemplate}
							bodyStyle={{ textAlign: 'center' }}
						/>
					</DataTable>
				</Box>
			)}
		</CssWrapper>
	);
};

export default BusinessLocationDatatable;
