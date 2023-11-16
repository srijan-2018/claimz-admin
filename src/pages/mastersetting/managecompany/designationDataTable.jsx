import React, { useEffect, useState } from 'react';
import {
	Box,
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
	Button,
	Select,
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
	.p-datatable-wrapper {
		padding-top: 5px;
		padding-right: 9px;
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100vh - 475px);
	}
`;
const DesignationDataTable = ({ Msg, GradeItems }) => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [products, setProducts] = useState();
	const [loader, setLoader] = useState(false);
	const [sucess, setsucess] = useState();
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
		const designationData = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-designtion`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setProducts(data1.data.values);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		designationData();
	}, [Msg, sucess]);

	const onRowEditComplete = (e) => {
		let _products = [...products];
		let { newData, index } = e;

		_products[index] = newData;

		setProducts(_products);
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
					/>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const [designation, setDesignation] = useState(
			rowData.designation_name
		);
		const [gradeId, setGradeId] = useState();
		const [id, setId] = useState(rowData.designation_id);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Employee Designation Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const tierUpdate = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('designation', designation);
			formData.append('grade', gradeId);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/designtion-update`,
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
									Employee Grade Update
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
										Enter Grade Code{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={designation}
										onChange={(e) =>
											setDesignation(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Add Grade</FormLabel>
									<Select
										placeholder='Select Grade'
										onChange={(e) =>
											setGradeId(e.target.value)
										}>
										{GradeItems?.map((list) => {
											return (
												<option
													key={list.id}
													value={list.id}>
													{list.grade_value}
												</option>
											);
										})}
									</Select>
								</FormControl>
								<Button
									mt='20px'
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
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
					height='353px'
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
						editMode='row'
						onRowEditComplete={onRowEditComplete}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='designation_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='designation_name'
							header='Designation '
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='grade_value'
							header='Grade'
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							header='Action'
							body={ActionTemplate}
							headerStyle={{ width: '25%', minWidth: '8rem' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
				</div>
			)}
		</CssWrapper>
	);
};

export default DesignationDataTable;
