import React, { useState } from 'react';
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
	Input,
	FormLabel,
	FormControl,
	useToast,
	Image,
} from '@chakra-ui/react';
import LoaderImg from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		overflow-y: scroll;
		height: calc(100vh - 380px);
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

const LeavepolicyDataTable = ({ leaveList, Loader, msg, setMsg }) => {
	const token = localStorage.getItem('token');
	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [leaveType, setLeaveType] = useState(rowData.leave_types);
		const [total, setTotal] = useState(rowData.number);
		const [carry, setCarry] = useState(rowData.carryforward);
		const [encash, setEncash] = useState(rowData.encashment);
		const [id, setId] = useState(rowData.leave_type_id);
		const [isLoading, setIsLoading] = useState(false);

		function toastCall() {
			return toast({
				title: 'Added Leave Type Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallFaild() {
			return toast({
				title: 'Request Failed',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}

		const updateVariant = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('value_name', leaveType);
			formData.append('total', total);
			formData.append('carry', carry);
			formData.append('encash', encash);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/leave-type`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				if (response.status === 200) {
					setMsg(!msg);
					toastCall();
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			} catch {
				toastCallFaild();
				setIsLoading(false);
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
										alignItems: 'end',
										flexDirection: 'column',
									}}
									onSubmit={updateVariant}>
									<Box width='100%'>
										<Box
											w='100%'
											display='flex'
											gap='15px'
											mb='15px'>
											<FormControl w='100%'>
												<FormLabel>
													Leave Type
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter leave Type'
													value={leaveType}
													onChange={(e) =>
														setLeaveType(
															e.target.value
														)
													}
													required
												/>
											</FormControl>
											<FormControl w='100%'>
												<FormLabel>
													Total Leave
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter Total Leave'
													value={total}
													onChange={(e) =>
														setTotal(e.target.value)
													}
													required
												/>
											</FormControl>
										</Box>
										<Box w='100%' display='flex' gap='15px'>
											<FormControl w='100%'>
												<FormLabel>
													Carry Forward
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter Carry Forward'
													value={carry}
													onChange={(e) =>
														setCarry(e.target.value)
													}
													required
												/>
											</FormControl>
											<FormControl w='100%'>
												<FormLabel>
													Encashment
												</FormLabel>
												<Input
													type='text'
													placeholder='Enter Encashment'
													value={encash}
													onChange={(e) =>
														setEncash(
															e.target.value
														)
													}
													required
												/>
											</FormControl>
										</Box>
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
										borderRadius='5px'
										p='20px 20px'
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

	return (
		<CssWrapper>
			{Loader ? (
				<Box
					height='320px'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={LoaderImg} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable
						value={leaveList.leave_types}
						dataKey='leave_type_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='leave_types'
							header='Leave Types'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='number'
							header='Total Leave'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='carryforward'
							header='Carry Forward'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='encashment'
							header='Encashment'
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

export default LeavepolicyDataTable;
