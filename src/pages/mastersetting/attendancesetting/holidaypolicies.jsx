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

const HolidayPolicies = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [progress, setProgress] = useState(67);
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

	useEffect(() => {
		let token = localStorage.getItem('token');
		const holidayPolicy = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/holiday`,
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

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [holiday, setHoliday] = useState(rowData.holiday);
		const [holidayDate, setHolidayDate] = useState(rowData.holiday_date);
		const [holidayImage, setHolidayImage] = useState(rowData.image);
		const [selectedValue, setSelectedValue] = useState(rowData.type);
		const [holidayId, setHolidayId] = useState(rowData.holiday_id);

		function toastCall(data) {
			return toast({
				title: data.data,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}

		const handleSelectChange = (event) => {
			setSelectedValue(event.target.value);
		};

		const updateHoliday = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('holiday', holiday);
			formData.append('holiday_date', holidayDate);
			formData.append('holiday_image', holidayImage);
			formData.append('type', selectedValue);
			formData.append('id', holidayId);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/holiday-update`,
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

		console.log(selectedValue, 'selectedValue');

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

						<DrawerBody>
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
											<FormLabel>Holiday Name</FormLabel>
											<Input
												type='text'
												value={holiday}
												placeholder='Enter Holiday Name'
												onChange={(e) =>
													setHoliday(e.target.value)
												}
												required
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>Holiday Date</FormLabel>
											<Input
												type='date'
												value={holidayDate}
												placeholder='Enter Holiday Date'
												onChange={(e) =>
													setHolidayDate(
														e.target.value
													)
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
										<FormControl
											w='48%'
											sx={{
												'& [type="file"]::-webkit-file-upload-button':
													{
														bg: '#F3F6FC',
														color: 'inputplaceholderColor',
														border: 'none',
														borderRight:
															'1px solid',
														borderColor:
															'inputStrokeColor',
														borderRadius:
															'2px 0px 0px 2px',
														fontWeight: '500',
														fontSize: '1.3rem',
														height: '35px',
														lineHeight: '2.2rem',
														padding: '0px 10px',
														marginRight: '15px',
													},
												'& [type="file"]::-webkit-file-upload-button:hover':
													{
														bg: 'dataTableRowBorder',
													},
											}}>
											<FormLabel textTransform='capitalize'>
												Holiday Image
											</FormLabel>
											<Input
												type='file'
												placeholder='Logo'
												p='0px'
												onChange={(event) =>
													setHolidayImage(
														event.target.files[0]
													)
												}
												sx={{
													'::file-selector-button': {
														borderTop: 'none',
														borderLeft: 'none',
														borderBottom: 'none',
														borderRight:
															'1px solid',
														borderRightColor:
															'var(--chakra-colors-inputStrokeColor);',
														outline: 'none',
														mr: 2,
														p: '12px 14px',
														color: 'var(--chakra-colors-inputplaceholderColor)',
														backgroundColor:
															'#f3f3f3',
													},
												}}
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>Holiday Type</FormLabel>
											<Select
												value={selectedValue}
												onChange={handleSelectChange}>
												<option value='common'>
													Common
												</option>
												<option value='optional'>
													Optional
												</option>
											</Select>
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

	const imageBodyTemplate = (rowData) => {
		const defaultImageUrl = UserLogo;

		const handleImageError = (event) => {
			event.target.src = defaultImageUrl;
		};

		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				m='0 auto'
				height='40px'
				width='40px'
				border='4px solid #2d689b'
				borderRadius='50px'>
				<Image
					src={rowData.image}
					borderRadius='50px'
					onError={handleImageError}
				/>
			</Box>
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
		const toast = useToast();
		const [holiday, setHoliday] = useState();
		const [holidayDate, setHolidayDate] = useState();
		const [holidayImage, setHolidayImage] = useState();
		const [selectedValue, setSelectedValue] = useState('common');
		const {
			isOpen: modalIsOpen,
			onOpen: modalOnOpen,
			onClose: modalOnClose,
		} = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Holiday Added Sucessfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}
		function toastCallError() {
			return toast({
				title: 'Holiday Add Request Failed',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}

		const handleSelectChange = (event) => {
			setSelectedValue(event.target.value);
		};

		const addHoliday = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('holiday', holiday);
			formData.append('holiday_date', holidayDate);
			formData.append('holiday_image', holidayImage);
			formData.append('type', selectedValue);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/holiday-post`,
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
					setIsLoading(false);
					modalOnClose();
				} else {
					toastCallError();
				}
			} catch (error) {
				toastCallError();
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
						onClick={modalOnOpen}>
						Add Holiday
					</Button>
				</Box>

				<Modal isOpen={modalIsOpen} onClose={modalOnClose} isCentered>
					<ModalOverlay bg='rgba(0,0,0,0.2)' />
					<ModalContent minW='50%' h='40vh'>
						<ModalHeader
							pt='24px'
							pb='15px'
							display='flex'
							justifyContent='space-between'
							alignItems='center'>
							<Box
								display='-webkit-inline-box'
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								pb='10px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Add Holiday List
								</Text>
							</Box>
						</ModalHeader>
						<ModalCloseButton size='lg' />
						<ModalBody>
							<Box p='0px 0px 20px'>
								<form
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'end',
									}}
									onSubmit={addHoliday}>
									<Box
										w='100%'
										mb='10px'
										display='flex'
										justifyContent='space-between'
										alignItems='center'>
										<FormControl width='48%'>
											<FormLabel>Holiday Name</FormLabel>
											<Input
												type='text'
												value={holiday}
												placeholder='Enter Holiday Name'
												onChange={(e) =>
													setHoliday(e.target.value)
												}
												required
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>Holiday Date</FormLabel>
											<Input
												type='date'
												value={holidayDate}
												placeholder='Enter Holiday Date'
												onChange={(e) =>
													setHolidayDate(
														e.target.value
													)
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
										<FormControl
											w='48%'
											sx={{
												'& [type="file"]::-webkit-file-upload-button':
													{
														bg: '#F3F6FC',
														color: 'inputplaceholderColor',
														border: 'none',
														borderRight:
															'1px solid',
														borderColor:
															'inputStrokeColor',
														borderRadius:
															'2px 0px 0px 2px',
														fontWeight: '500',
														fontSize: '1.3rem',
														height: '35px',
														lineHeight: '2.2rem',
														padding: '0px 10px',
														marginRight: '15px',
													},
												'& [type="file"]::-webkit-file-upload-button:hover':
													{
														bg: 'dataTableRowBorder',
													},
											}}>
											<FormLabel textTransform='capitalize'>
												Holiday Image
											</FormLabel>
											<Input
												type='file'
												placeholder='Logo'
												p='0px'
												onChange={(event) =>
													setHolidayImage(
														event.target.files[0]
													)
												}
												sx={{
													'::file-selector-button': {
														borderTop: 'none',
														borderLeft: 'none',
														borderBottom: 'none',
														borderRight:
															'1px solid',
														borderRightColor:
															'var(--chakra-colors-inputStrokeColor);',
														outline: 'none',
														mr: 2,
														p: '12px 14px',
														color: 'var(--chakra-colors-inputplaceholderColor)',
														backgroundColor:
															'#f3f3f3',
													},
												}}
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>Holiday Type</FormLabel>
											<Select
												value={selectedValue}
												onChange={handleSelectChange}>
												<option value='common'>
													Common
												</option>
												<option value='optional'>
													Optional
												</option>
											</Select>
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
										p='20px 20px'
										fontSize='1.6rem'
										color='white'
										mt='20px'
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
										Add Holiday
									</Button>
								</form>
							</Box>
						</ModalBody>
					</ModalContent>
				</Modal>
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
						left='35%'>
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
						left='60%'>
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
							4
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
							dataKey='department.id'
							tableStyle={{ minWidth: '50rem' }}>
							<Column
								field='holiday'
								header='Holiday '
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '20%' }}></Column>
							<Column
								field='holiday_date'
								header='Data'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '20%' }}></Column>
							<Column
								field='type'
								header='Holiday Type'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '20%' }}></Column>
							<Column
								field='image'
								header='Image'
								body={imageBodyTemplate}
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '20%' }}></Column>
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
								'/master-setting/attendance-settings/track-managment'
							)
						}>
						Next
					</Button>
				</Flex>
			</ButtonGroup>
		</CssWrapper>
	);
};

export default HolidayPolicies;
