import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import {
	Box,
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
	useToast,
	Image,
} from '@chakra-ui/react';
import Loader from '../../../assets/images/loader.gif';
import { MultiSelect } from 'primereact/multiselect';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		padding-right: 9px;
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100vh - 445px);
	}
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
	.p-datatable .p-datatable-header {
		border-top: none;
		padding-bottom: 10px;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const WeekOfTable = ({ Msg }) => {
	const navigate = useNavigate();
	const [variant, setVariant] = useState();
	const token = localStorage.getItem('token');
	const [dataSubmit, setDataSubmit] = useState('');
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const day = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];

	const weeks = ['first', 'second', 'third', 'fourth'];

	useEffect(() => {
		const weekOffTable = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/weekoff`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setVariant(data1.data.weekoff);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		weekOffTable();
	}, [Msg, dataSubmit]);

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [variantName, setVariantName] = useState(rowData.variant_name);
		// const [selectedDay, setSelectedDay] = useState('');
		const [selectedDay, setSelectedDay] = useState(
			rowData.selected_regular_days
		); // Replace 'rowData.selected_regular_days' with the actual property that holds the selected regular days in your 'rowData' object.

		const [selectedWeeks, setSelectedWeeks] = useState('');
		const [weekDays, setWeekDays] = useState();
		const [variantId, setVariantId] = useState(rowData.variant_id);

		function toastCall() {
			return toast({
				title: 'Variant Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const updateVariant = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('variant_name', variantName);
			formData.append('weekoff', `["${selectedDay}"]`);
			formData.append('alt', `["${selectedWeeks}"]`);
			formData.append('week', weekDays);
			formData.append('id', variantId);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/weekoff-update`,
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
					setDataSubmit(!dataSubmit);
					toastCall();
					setIsLoading(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		console.log(rowData, 'rowData');
		console.log(selectedDay, 'selectedDay');

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
									Update Variant Details
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
									onSubmit={updateVariant}>
									<FormControl mb='10px'>
										<FormLabel>
											Enter Variant Name
										</FormLabel>
										<Input
											type='text'
											value={variantName}
											placeholder='Enter Variant Name'
											onChange={(e) =>
												setVariantName(e.target.value)
											}
											required
										/>
									</FormControl>
									<Box
										w='100%'
										mb='10px'
										display='flex'
										justifyContent='space-between'
										alignItems='center'>
										<FormControl
											width='48%'
											sx={{
												'& .p-multiselect': {
													width: '100%',
													bg: 'none',
													fontSize: '1.4rem',
													border: '1px solid var(--chakra-colors-claimzBorderGrayColor)',
												},
											}}>
											<FormLabel>
												Regular Variant
											</FormLabel>
											<MultiSelect
												value={selectedDay}
												onChange={(e) =>
													setSelectedDay(e.value)
												}
												options={day}
												placeholder='Select Regular Variant'
												maxSelectedLabels={3}
												className='w-full md:w-20rem'
											/>
										</FormControl>
										<FormControl width='48%'>
											<FormLabel>
												Alternative Variant
											</FormLabel>
											<Select
												color='#6c757d'
												placeholder='Select option'
												onChange={(event) =>
													setWeekDays(
														event.target.value
													)
												}>
												<option value='1'>
													Sunday
												</option>
												<option value='2'>
													Monday
												</option>
												<option value='3'>
													Tuesday
												</option>
												<option value='4'>
													Wednesday
												</option>
												<option value='5'>
													Thursday
												</option>
												<option value='6'>
													Friday
												</option>
												<option value='7'>
													Saturday
												</option>
											</Select>
										</FormControl>
									</Box>
									<FormControl
										mb='10px'
										width='100%'
										sx={{
											'& .p-multiselect': {
												width: '100%',
												bg: 'none',
												fontSize: '1.4rem',
												border: '1px solid var(--chakra-colors-claimzBorderGrayColor)',
											},
										}}>
										<FormLabel>
											Alternative Week Off
										</FormLabel>
										<MultiSelect
											value={selectedWeeks}
											onChange={(e) =>
												setSelectedWeeks(e.value)
											}
											options={weeks}
											placeholder='Select Alternate Week Off'
											maxSelectedLabels={3}
											className='w-full md:w-20rem'
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
										type='submit'
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px 20px'
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

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='300px'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable value={variant} dataKey='variant_id'>
						<Column
							field='variant_name'
							header='Variant Name'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							rowEditor
							header='Edit'
							body={ActionTemplate}
							headerStyle={{ width: '25%', minWidth: '8rem' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
				</div>
			)}
		</CssWrapper>
	);
};

export default WeekOfTable;
