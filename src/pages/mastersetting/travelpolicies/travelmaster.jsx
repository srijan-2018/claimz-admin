import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	Progress,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	useToast,
	FormControl,
	FormLabel,
	Select,
	Heading,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Loader from '../../../assets/images/loader.gif';
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
		height: calc(100vh - 439px);
	}
`;

const TravelMaster = () => {
	const tokens = localStorage.getItem('token');
	const [progress, setProgress] = useState(40);
	const navigate = useNavigate();
	const [products, setProducts] = useState();
	const [sucess, setsucess] = useState();
	const [loader, setLoader] = useState(false);
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

	useEffect(() => {
		const Travelmaster = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/mode-of-travel`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${tokens}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setProducts(data1.data.mode_of_travels);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		Travelmaster();
	}, [sucess]);

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const [type, setType] = useState(rowData.type);
		const [mode, setMode] = useState(rowData.name);
		const [id, setId] = useState(rowData.id);
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [isLoading, setIsLoading] = useState(false);

		function toastCall() {
			return toast({
				title: 'Travel Master List Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const masterUpdate = async (e) => {
			e.preventDefault();
			setIsLoading(true);
			let formData = new FormData();
			formData.append('name', mode);
			formData.append('type', type);
			formData.append('id', id);

			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/mode-of-travel-update`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${tokens}`,
					},
				}
			);
			const data = await response.json();
			if (response.status === 200) {
				toastCall();
				setsucess(!sucess);
				setIsLoading(false);
			} else {
				navigate('/login');
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
									Travel Master Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<form
								onSubmit={masterUpdate}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl w='100%'>
									<FormLabel>
										Add Modes{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										bg='white'
										type='text'
										value={mode}
										onChange={(e) =>
											setMode(e.target.value)
										}
									/>
								</FormControl>
								<FormControl w='100%' mt='15px'>
									<FormLabel>
										Add Types{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										onChange={(e) =>
											setType(e.target.value)
										}>
										<option value='train'>Train</option>
										<option value='flight'>Flight</option>
										<option value='others'>Others</option>
									</Select>
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
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					as='span'
					className='p-input-icon-left'
					display='flex'
					alignItems='center'>
					<i style={{ lineHeight: 1.5 }} className='pi pi-search' />
					<Input
						pl='24px'
						type='search'
						value={value || ''}
						onChange={(e) => onGlobalFilterChange(e)}
						placeholder='Global Search'
						w='50%'
					/>
				</Box>
				<Box>
					<Button
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
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
						onClick={() =>
							navigate('/master-setting/add-new-travel-master')
						}>
						Add New
					</Button>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();
	return (
		<CssWrapper>
			<Box position='relative'>
				<Progress
					colorScheme='green'
					position='relative'
					hasStripe
					value={progress}
					mb='50px'
					mt='15px'
					mx='5%'
					isAnimated></Progress>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='15%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						1
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Tier Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='33%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						2
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Mode of Travel Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='58%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						3
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Region Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='78%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						4
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						State And Tier Mapping
					</Box>
				</Box>
			</Box>

			<Box
				margin='50px auto 0px'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>List of Travel Modes</Heading>
			</Box>

			<Box className='card p-fluid'>
				{loader ? (
					<Box
						height='calc(100vh - 364px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<DataTable
						value={products}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='name'
							header='Mode'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '33%' }}></Column>
						<Column
							field='type'
							header='Type'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '33%' }}></Column>
						<Column
							header='Action'
							body={ActionTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '33%' }}
						/>
					</DataTable>
				)}
			</Box>
		</CssWrapper>
	);
};

export default TravelMaster;
