import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	Image,
	Select,
	useToast,
	FormControl,
	FormLabel,
	Textarea,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { Paginator } from 'primereact/paginator';
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
		height: calc(100vh - 245px);
	}
`;
const AssetsList = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [sucess, setSucess] = useState();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState();
	const [empList, setEmpList] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [uom, setUom] = useState();
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
	const [specificationError, setSpecificationError] = useState(false);

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/asset-list/${rows}?page=${first}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response3 = await fetch(
					`${process.env.REACT_APP_API_URL}/uom-master`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response1.ok) {
					const data1 = await response1.json();
					const data2 = await response2.json();
					const data3 = await response3.json();
					setProducts(data1.data);
					setEmpList(data2.data);
					setUom(data3.data);
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

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;
		setFilters(_filters);
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
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
						onClick={() => navigate('/master-setting/assets-add')}>
						Add Asset
					</Button>
				</Box>
			</Box>
		);
	};
	const header = renderHeader();

	const UpdateTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const toast = useToast();
		const [assetName, setAssetName] = useState(rowData?.asset_name);
		const [description, setDescription] = useState(
			rowData?.group_description
		);
		const [uomId, setUomId] = useState(rowData?.uom);
		const parsedData = rowData?.specifications?.map((item) => ({
			specification: item.specification,
			specification_details: item.specification_details,
		}));
		const [inputList, setInputList] = useState([
			...parsedData,
			{ specification: '', specification_details: '' },
		]);

		function toastCall() {
			return toast({
				title: 'Assets Assign Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const handleInputChange = (index, field, value) => {
			const updatedList = [...inputList];
			updatedList[index][field] = value;
			setInputList(updatedList);
		};

		const handleAddClick = () => {
			setInputList([
				...inputList,
				{ specification: '', specification_details: '' },
			]);
		};

		const handleRemoveClick = (index) => {
			const updatedList = [...inputList];
			updatedList.splice(index, 1);
			setInputList(updatedList);
		};

		const updateAssect = async (e) => {
			e.preventDefault();

			// Check if any specification fields are empty
			const hasEmptySpecification = inputList.some(
				(item) =>
					item.specification === '' ||
					item.specification_details === ''
			);

			if (hasEmptySpecification) {
				// Display an error toast
				toast({
					title: 'Error',
					description:
						'Please fill in all specification fields before updating.',
					status: 'error',
					duration: 5000, // Set the duration of the toast message
					isClosable: true,
				});
			} else {
				// No empty specification fields, proceed with the update
				let formData = new FormData();
				formData.append('id', rowData.asset_id);
				formData.append('group_id', rowData.asset_group_id);
				formData.append('name', assetName);
				formData.append('description', description);
				formData.append('uom', uomId);
				formData.append('specification', JSON.stringify(inputList));

				try {
					setIsLoading(true);
					const response = await fetch(
						`${process.env.REACT_APP_API_URL}/asset-update`,
						{
							method: 'POST',
							body: formData,
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (response.ok) {
						setSucess(!sucess);
						setIsLoading(false);
						toastCall();
					} else {
						navigate('/login');
					}
				} catch (error) {
					navigate('/login');
				}
			}
		};

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
									Asset Details Update
								</Text>
							</Box>
						</DrawerHeader>
						<DrawerBody>
							<form
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<Box w='100%'>
									<Box width='100%' paddingBottom='20px'>
										<FormControl mb='10px'>
											<FormLabel>Assets Name</FormLabel>
											<Input
												type='text'
												value={assetName}
												onChange={(e) =>
													setAssetName(e.target.value)
												}
											/>
										</FormControl>
										<FormControl mb='10px'>
											<FormLabel>
												Assets Description
											</FormLabel>
											<Textarea
												value={description}
												border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
												_hover={{
													border: '1px solid var(--chakra-colors-claimzBorderGrayColor)',
												}}
												type='text'
												onChange={(e) =>
													setDescription(
														e.target.value
													)
												}
												h='100px'
												fontSize='1.4rem'
											/>
										</FormControl>
										<FormLabel>Base UOM?</FormLabel>
										<Select
											placeholder='Select option'
											value={uomId}
											onChange={(e) =>
												setUomId(e.target.value)
											}>
											{uom?.map((data, index) => {
												return (
													<option
														value={data.uom_id}
														key={index}>
														{data.uom_name}
													</option>
												);
											})}
										</Select>
									</Box>
									<Box p='0px'>
										{inputList.map((input, index) => (
											<Box
												key={index}
												display='flex'
												alignItems='center'
												gap='15px'
												pb='15px'>
												<FormControl>
													<FormLabel>
														Specification
													</FormLabel>
													<Input
														value={
															input.specification
														}
														required
														onChange={(event) =>
															handleInputChange(
																index,
																'specification',
																event.target
																	.value
															)
														}
													/>
												</FormControl>
												<FormControl>
													<FormLabel>
														Specification Details
													</FormLabel>
													<Input
														value={
															input.specification_details
														}
														onChange={(event) =>
															handleInputChange(
																index,
																'specification_details',
																event.target
																	.value
															)
														}
													/>
												</FormControl>
												{index ===
													inputList.length - 1 && ( // Add the button only for the last item
													<Button
														color='var(--chakra-colors-claimzTextBlueLightColor)'
														mt='30px'
														bg='none'
														_hover={{ bg: 'none' }}
														_active={{ bg: 'none' }}
														_focus={{ bg: 'none' }}
														onClick={
															handleAddClick
														}>
														<i className='fa-sharp fa-solid fa-plus'></i>
													</Button>
												)}
												{index !==
													inputList.length - 1 && ( // Keep the Delete button for all items except the last one
													<Button
														color='var(--chakra-colors-claimzTextBlueLightColor)'
														mt='30px'
														bg='none'
														_hover={{ bg: 'none' }}
														_active={{ bg: 'none' }}
														_focus={{ bg: 'none' }}
														onClick={() =>
															handleRemoveClick(
																index
															)
														}>
														<i className='fa-solid fa-trash'></i>
													</Button>
												)}
											</Box>
										))}
									</Box>
								</Box>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									onClick={updateAssect}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									mt='15px'
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
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const ActionTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const toast = useToast();
		const [empId, setEmpId] = useState();
		const [takenDate, setTakenDate] = useState();

		function toastCall() {
			return toast({
				title: 'Assets Assign Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const assectAssign = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('user_id', empId);
			formData.append('asset_id', rowData.asset_id);
			formData.append('taken_date', takenDate);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/asset-assign-post`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					setIsLoading(false);
					setSucess(!sucess);
					toastCall();
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
						maxW='40% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
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
									Assign Asset to Employee
								</Text>
							</Box>
						</DrawerHeader>
						<DrawerBody>
							{rowData.occupied_status == 1 ? (
								<Box
									display='flex'
									justifyContent='space-between'>
									<Box>
										<Text
											fontSize='1.8rem'
											color='claimzTextBlueColor'
											fontWeight='700'>
											{' '}
											Asset Assigned{' '}
										</Text>
										<Text>{rowData?.user?.emp_name}</Text>
									</Box>

									<Box>
										<Text
											fontSize='1.8rem'
											color='claimzTextBlueColor'
											fontWeight='700'>
											{' '}
											Status{' '}
										</Text>
										<Text>Wating for approval</Text>
									</Box>
								</Box>
							) : rowData.occupied_status == 2 ? (
								<Box>
									<Text
										fontSize='1.8rem'
										color='claimzTextBlueColor'
										fontWeight='700'
										textAlign='right'>
										{' '}
										Status{' '}
									</Text>
									<Text>Asset Occupied</Text>
								</Box>
							) : rowData.occupied_status == 3 ? (
								<Box>
									<Text
										fontSize='1.8rem'
										color='claimzTextBlueColor'
										fontWeight='700'
										textAlign='right'>
										{' '}
										Status{' '}
									</Text>
									<Text>Asset Handover</Text>
								</Box>
							) : (
								<Box
									display='flex'
									alignItems='center'
									gap='15px'
									mb='15px'>
									<FormControl>
										<FormLabel>
											Assign Asset to Employee
										</FormLabel>
										<Select
											placeholder='Select option'
											onChange={(e) =>
												setEmpId(e.target.value)
											}
											required>
											{empList.map((data) => {
												return (
													<option
														value={data.id}
														key={data.id}>
														{data?.emp_name}
													</option>
												);
											})}
										</Select>
									</FormControl>
									<FormControl>
										<FormLabel>Assign Date</FormLabel>
										<Input
											type='Date'
											onChange={(e) =>
												setTakenDate(e.target.value)
											}
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
										p='18px 30px'
										fontSize='1.6rem'
										color='white'
										marginTop='24px'
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
										onClick={assectAssign}>
										Assign
									</Button>
								</Box>
							)}

							{rowData?.specifications[0]?.specification.length >
							0 ? (
								<Box height='500px'>
									{rowData?.specifications?.map(
										(data, index) => {
											return (
												<Box key={index}>
													<Text
														mb='10px'
														fontSize='1.6rem'
														fontWeight='600'
														color='claimzTextBlueColor'>
														{data.specification} -{' '}
														<Box
															as='span'
															color='claimzTextBlackColor'>
															{
																data.specification_details
															}
														</Box>
													</Text>
												</Box>
											);
										}
									)}
								</Box>
							) : (
								<Box w='100%' textAlign='center'>
									<Text
										as='span'
										fontSize='1.4rem'
										fontWeight='500'
										color='claimzTextBlackColor'
										textAlign='center'>
										Specification Not Added !
									</Text>
								</Box>
							)}
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
					height='calc(100vh - 117px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box className='card p-fluid'>
					<DataTable
						value={products?.data}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='asset_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='asset_name'
							header='Asset Name '
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '20%' }}></Column>
						<Column
							field='group_description'
							header='Group Description'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '40%' }}></Column>
						<Column
							field='group_name'
							header='Group Name'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '20%' }}></Column>
						<Column
							header='Edit'
							body={UpdateTemplate}
							style={{ width: '10%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							header='Action'
							body={ActionTemplate}
							style={{ width: '10%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
					<Box
						display='flex'
						justifyContent='flex-end'
						backgroundColor='white'>
						<Paginator
							first={first}
							rows={rows}
							totalRecords={products?.total}
							rowsPerPageOptions={[`${products?.total}`]}
							onPageChange={onPageChange}
						/>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default AssetsList;
