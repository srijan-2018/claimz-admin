import {
	Progress,
	Box,
	ButtonGroup,
	Heading,
	Flex,
	Image,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';
import UserLogo from '../../../assets/images/no-image.png';
import { useGetEventListQuery } from '../../dashboard/features/dashboardGraphApi';

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
		height: calc(100vh - 390px);
	}
`;

const LeaveCorrection = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [progress, setProgress] = useState(50);
	const [holiday, setHoliday] = useState();
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
	const { refetch } = useGetEventListQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		let token = localStorage.getItem('token');
		const holidayPolicy = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/leave-balance-user`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setHoliday(data1.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		holidayPolicy();
	}, [msg]);

	useEffect(() => {
		refetch();
	}, [msg]);

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [balance, setBalance] = useState(rowData.leave_balance);
		const [carry, setCarry] = useState(rowData.carry_forward);
		const [encash, setEncash] = useState(rowData.encashment);
		const [id, setId] = useState(rowData.ulu_id);

		console.log(rowData, 'rowData');

		function toastCall(data) {
			return toast({
				title: data.data,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}

		const updateHoliday = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('balance', balance);
			formData.append('carry', carry);
			formData.append('encash', encash);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/leave-balance-post`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					toastCall(data);
					setMsg(!msg);
					setIsLoading(false);
				} else {
					const data = await response.json();
					toastCall(data);
				}
			} catch (response) {
				const data = await response.json();
				toastCall(data);
			}
		};

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
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
									Update Holiday List
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody overflow='hidden'>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<form
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'end',
									}}
									onSubmit={updateHoliday}>
									<Box
										w='100%'
										mb='10px'
										display='flex'
										justifyContent='space-between'
										alignItems='center'>
										<FormControl width='48%'>
											<FormLabel>Leave Balance</FormLabel>
											<Input
												type='text'
												value={balance}
												placeholder='Enter Leave Balance'
												onChange={(e) =>
													setBalance(e.target.value)
												}
												required
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>Carry Forward</FormLabel>
											<Input
												type='text'
												value={carry}
												placeholder='Enter Carry Forward'
												onChange={(e) =>
													setCarry(e.target.value)
												}
												required
											/>
										</FormControl>
									</Box>
									<Box
										w='100%'
										mb='10px'
										display='flex'
										justifyContent='space-between'
										alignItems='center'>
										<FormControl width='48%'>
											<FormLabel>EncashMent</FormLabel>
											<Input
												type='text'
												value={encash}
												placeholder='Enter EncashMent'
												onChange={(e) =>
													setEncash(e.target.value)
												}
												required
											/>
										</FormControl>
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
										type='submit'
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px'
										fontSize='1.6rem'
										color='white'
										mt='30px'
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
							</Box>
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

	const RenderHeader = () => {
		const value = filters['global'] ? filters['global'].value : '';
		return (
			<Box display='flex' justifyContent='end' alignItems='center'>
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
			</Box>
		);
	};

	const header = RenderHeader();

	return (
		<CssWrapper>
			<Box>
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
						left='10%'>
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
							Week-Off Variant
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='28%'>
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
							Leave Policies
						</Box>
					</Box>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='45%'>
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
							Leave Correction
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='63%'>
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
							Holiday Policies
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='80%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							5
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Track Management
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>List of all Holidays</Heading>
			</Box>

			<Box>
				{loader ? (
					<Box
						height='calc(100vh - 315px)'
						width='100%'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<div className='card p-fluid'>
						<DataTable
							value={holiday}
							header={header}
							filters={filters}
							onFilter={(e) => setFilters(e.filters)}
							dataKey='ulu_id'
							tableStyle={{ minWidth: '50rem' }}>
							<Column
								field='emp_name'
								header='Name '
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>
							<Column
								field='emp_code'
								header='Employee Code'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>
							<Column
								field='carry_forward'
								header='Carry Forward'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>
							<Column
								field='encashment'
								header='Encashment'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>
							<Column
								field='leave_balance'
								header='Leave Balance'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>
							<Column
								field='leave_types'
								header='Leave Types'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '15%' }}></Column>

							<Column
								header='Edit'
								body={ActionTemplate}
								headerStyle={{ width: '20%', minWidth: '8rem' }}
								bodyStyle={{ textAlign: 'center' }}></Column>
						</DataTable>
					</div>
				)}
			</Box>

			<ButtonGroup w='100%'>
				<Flex w='100%' justifyContent='space-between'>
					<Button
						mr='20px'
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
							navigate(
								'/master-setting/attendance-settings/leave-policies'
							)
						}>
						Previous
					</Button>

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
							navigate(
								'/master-setting/attendance-settings/holiday-policies'
							)
						}>
						Next
					</Button>
				</Flex>
			</ButtonGroup>
		</CssWrapper>
	);
};

export default LeaveCorrection;
