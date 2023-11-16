import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	useToast,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
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
		border: none;
		padding-bottom: 20px;
		background: white;
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
		height: calc(100vh - 265px);
	}
`;

const TravelMaster = () => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState();
	const [sucess, setsucess] = useState();
	const [msg, setMsg] = useState();
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

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/convayence-mode-of-travel`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
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

		departmentList();
	}, [sucess, msg]);

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
	};

	const RenderHeader = () => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const toast = useToast();
		const [componentName, setComponentName] = useState();
		const [type, setType] = useState();
		const [msg, setMsg] = useState();
		const value = filters['global'] ? filters['global'].value : '';

		function toastCall() {
			return toast({
				title: 'Mode of Travel Master Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const travelMasterAdd = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('component_name', componentName);
			formData.append('type', type);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/convayence-mode-of-travel-post`,
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
					setMsg(!msg);
					setComponentName('');
					setType('');
					setIsLoading(false);
				} else {
					setComponentName('');
					setType('');
				}
			} catch (error) {
				navigate('/login');
			}
		};

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
						// onClick={() => navigate("/master-setting/add-tarvel-mode")}
						onClick={onOpen}>
						Add Travel Mode
					</Button>

					<Modal onClose={onClose} isOpen={isOpen} isCentered>
						<ModalOverlay />
						<ModalContent minW='600px' minH='400px'>
							<ModalHeader
								textAlign='center'
								fontWeight='700'
								mb='20px'
								fontSize='2.4rem'
								bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='white'
								padding='15px 15px'
								textTransform='capitalize'>
								Add Mode of Travels
							</ModalHeader>
							<ModalCloseButton
								color='white'
								size='lg'
								mt='10px'
								_hover={{ bg: 'none' }}
								_active={{ bg: 'none' }}
							/>
							<ModalBody px='24px'>
								<Box
									display='flex'
									flexDirection='column'
									alignItems='flex-end'>
									<Box
										w='100%'
										display='flex'
										gap='10px'
										mb='10px'
										alignItems='center'
										justifyContent='space-between'>
										<form
											style={{
												width: '100%',
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'flex-end',
											}}
											onSubmit={travelMasterAdd}>
											<FormControl w='100%' mb='15px'>
												<FormLabel>
													Enter Mode Of Travel{' '}
													<Box
														as='span'
														color='orange'>
														*
													</Box>
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter Mode Of Travel'
													value={componentName}
													onChange={(e) =>
														setComponentName(
															e.target.value
														)
													}
													required
												/>
											</FormControl>
											<FormControl w='100%'>
												<FormLabel>
													Enter Mode Of Type{' '}
													<Box
														as='span'
														color='orange'>
														*
													</Box>
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter Mode Of Type'
													value={type}
													onChange={(e) =>
														setType(e.target.value)
													}
													required
												/>
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
												bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
												boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
												borderRadius='5px'
												p='20px 20px'
												fontSize='1.6rem'
												color='white'
												mt='28px'
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
								</Box>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			</Box>
		);
	};
	const header = RenderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const [updateComponentName, setUpdateComponentName] = useState(
			rowData.component_name
		);
		const [updateType, setUpdateType] = useState(rowData.type);
		const [id, setId] = useState(rowData.conveyance_mode_id);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Mode of Travel Master Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
		function showErrorToast(message) {
			return toast({
				title: message,
				status: 'warning',
				duration: 3000,
				isClosable: true,
			});
		}

		const tierUpdate = async (e) => {
			e.preventDefault();

			// Check if the input fields are empty
			if (updateComponentName.trim() === '' || updateType.trim() === '') {
				// You can display an error message, show a toast, or perform any other action to inform the user that the fields are required.
				// For example:
				showErrorToast('Input fields are required.');
				return;
			}

			let formData = new FormData();
			formData.append('component_name', updateComponentName);
			formData.append('type', updateType);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/convayence-mode-of-travel-update`,
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
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
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
									{' '}
									Tier Master Item Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<form
								onSubmit={tierUpdate}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl w='100%' mb='15px'>
									<FormLabel>
										Enter Mode Of Travel{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={updateComponentName}
										onChange={(e) =>
											setUpdateComponentName(
												e.target.value
											)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%'>
									<FormLabel>
										Enter Mode Of Type{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={updateType}
										onChange={(e) =>
											setUpdateType(e.target.value)
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

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 180px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable
						value={products}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						editMode='row'
						dataKey='conveyance_mode_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='component_name'
							header='Modes'
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
							headerStyle={{ width: '33%', minWidth: '8rem' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
				</div>
			)}
		</CssWrapper>
	);
};

export default TravelMaster;
