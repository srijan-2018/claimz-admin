import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Heading,
	Drawer,
	Image,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	useToast,
	Input,
} from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import Loader from '../../../assets/images/loader.gif';

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
		padding-right: 5px;
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
		border-radius: 5px 5px 0px 0px;
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 302px);
		padding-right: 5px;
	}
`;
const EmployeeList = () => {
	const navigate = useNavigate();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [msg, setMsg] = useState();
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);
	const [fromLoader, setFromLoader] = useState(false);

	const cols = [
		{ field: 'emp_name', header: 'Employee Name' },
		{ field: 'emp_code', header: 'Employee Id' },
	];

	useEffect(() => {
		let token = localStorage.getItem('token');
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/salary-emp-list/${rows}?page=${first}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setEmpList(data.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [first, rows, msg]);

	const filteredEmployee = empList?.data.filter(
		(item) =>
			item.candidate_status === 2 ||
			item.candidate_status === 3 ||
			item.candidate_status === 4
	);

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

	const exportColumns = cols.map((col) => ({
		title: col.header,
		dataKey: col.field,
	}));

	const exportPdf = () => {
		import('jspdf').then((jsPDF) => {
			import('jspdf-autotable').then(() => {
				const doc = new jsPDF.default(0, 0);

				doc.autoTable(exportColumns, empList.data);
				doc.save('empList.pdf');
			});
		});
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(empList.data);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ['data'],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'empList');
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		import('file-saver').then((module) => {
			if (module && module.default) {
				let EXCEL_TYPE =
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
				let EXCEL_EXTENSION = '.xlsx';
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				module.default.saveAs(
					data,
					fileName +
						'_export_' +
						new Date().getTime() +
						EXCEL_EXTENSION
				);
			}
		});
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const renderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Heading
						mb='5px'
						fontSize='1.4rem'
						color='var(--chakra-colors-claimzTextBlueColor)'>
						Search Employee
					</Heading>
					<Box
						as='span'
						className='p-input-icon-left'
						display='flex'
						alignItems='center'>
						<i
							style={{ lineHeight: 1.5 }}
							className='pi pi-search'
						/>
						<Input
							type='search'
							pl='24px'
							w='100%'
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</Box>
				</Box>
				<Box display='flex' justifyContent='space-between'>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'
						type='button'
						icon='pi pi-file-pdf'
						severity='warning'
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						onClick={exportPdf}
						data-pr-tooltip='PDF'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontSize='1.6rem'
							fontWeight='700'>
							PDF
						</Text>
					</Button>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'
						type='button'
						icon='pi pi-file-excel'
						severity='success'
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						onClick={exportExcel}
						data-pr-tooltip='XLS'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontSize='1.6rem'
							fontWeight='700'>
							Excel
						</Text>
					</Button>
					<Button
						border='2px solid var(--chakra-colors-claimzBorderColor)'
						borderRadius='15px'
						height='45px'
						padding='0px 20px'
						mr='10px'>
						<Link to='/manage-employee/create-new-employee'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontSize='1.6rem'
								fontWeight='700'>
								Create New
							</Text>
						</Link>
					</Button>
				</Box>
			</Box>
		);
	};

	const SalaryDetails = (rowData) => {
		return (
			<>
				<NavLink
					style={{ fontSize: '1rem' }}
					to={`/master-setting/salary-details/${rowData.id}`}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</NavLink>
			</>
		);
	};

	const EmployeePayroll = (rowData) => {
		const tokens = localStorage.getItem('token');
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [payrollDetails, setPayrollDetails] = useState();
		const currentYear = new Date().getFullYear();
		const [year, setYear] = useState(currentYear);
		const currentMonthIndex = new Date().getMonth();
		const currentMonth = currentMonthIndex + 1;
		const [month, setMonth] = useState(currentMonth);

		const employeePayroll = async (e) => {
			e.preventDefault();
			onOpen();
			let formData = new FormData();
			formData.append('year', year);
			formData.append('month', month);
			formData.append('id', rowData?.id);

			try {
				setFromLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/employee-payroll`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${tokens}`,
						},
					}
				);
				if (response1.ok) {
					const data = await response1.json();
					setPayrollDetails(data.data[0]);
					setFromLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const RenderItems = () => {
			let attendance = payrollDetails?.attendance;
			return (
				attendance &&
				Object.entries(attendance)?.map(([key, value]) => (
					<Box width='50px' height='50px' mr='15px' key={key}>
						<Box
							bgColor={
								value === 'A'
									? '#FF5733'
									: value === 'P'
									? '#008000'
									: value === 'W'
									? '#808080'
									: value === 'H'
									? '#ffd22b'
									: value === 'Ho'
									? '#36bfa8'
									: value === 'L'
									? '#2a9df4'
									: '#008000'
							}
							p='13px 20px'
							fontWeight='600'
							color='white'
							textAlign='center'>
							{value}
						</Box>
						<Text textAlign='center' fontWeight='600' mt='5px'>
							{key}
						</Text>
					</Box>
				))
			);
		};

		return (
			<>
				<Button
					onClick={employeePayroll}
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
						maxW='45% !important'
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
									Employee Payroll Details
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							{fromLoader ? (
								<Box
									height='100%'
									display='flex'
									justifyContent='center'
									alignItems='center'>
									<Image src={Loader} alt='Loader' />
								</Box>
							) : (
								<>
									<Box
										width='100%'
										bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										padding='10px 15px'
										mb='20px'>
										<Heading>{rowData.emp_name} :</Heading>
									</Box>

									<Box>
										<Box p='10px' mb='15px'>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Employee ID -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{rowData.emp_id}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Employee Name -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{rowData.emp_name}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Department -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.department}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Account No -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{rowData.email}
												</Box>
											</Text>
										</Box>
									</Box>

									<Box>
										<Box
											className='scrollBar'
											display='flex'
											overflowX='auto'
											height='100px'>
											{RenderItems()}
										</Box>
									</Box>

									<Box>
										<Box p='10px' mb='15px'>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Days Present -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.present}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Holiday -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.holidays}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Week Off -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.weekoff}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Leaves Off -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'></Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Leaves Taken -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.leaves}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Absent -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{payrollDetails?.absent}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Payable Days -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{
														payrollDetails?.net_payable_days
													}
												</Box>
											</Text>
											<Text
												mb='10px'
												fontSize='1.6rem'
												fontWeight='600'
												color='claimzTextBlueColor'>
												Regularization -{' '}
												<Box
													as='span'
													color='claimzTextBlackColor'>
													{
														payrollDetails?.regularisation
													}
												</Box>
											</Text>
										</Box>
									</Box>
								</>
							)}
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const PaySlip = (rowData) => {
		return (
			<NavLink
				style={{ fontSize: '1rem' }}
				to={`/master-setting/payslip-details/${rowData.id}`}
				bg='none'
				_hover={{ bg: 'none' }}
				_active={{ bg: 'none' }}
				_focus={{ bg: 'none' }}>
				<i className='fa-solid fa-pen-to-square fa-2x'></i>
			</NavLink>
		);
	};

	const header = renderHeader();

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 160px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box className='card'>
					<DataTable
						value={filteredEmployee}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='id'>
						{cols.map((col, index) => (
							<Column
								key={index}
								field={col.field}
								header={col.header}
								sortable
							/>
						))}
						<Column
							header='Salary Details'
							body={SalaryDetails}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '20%' }}
						/>
						<Column
							header='Employee Payroll'
							body={EmployeePayroll}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '20%' }}
						/>
						<Column
							header='Payslips'
							body={PaySlip}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '20%' }}
						/>
					</DataTable>
					{/* pegination */}
					<Box
						display='flex'
						justifyContent='flex-end'
						backgroundColor='white'
						borderRadius='0px 0px 5px 5px'>
						<Paginator
							first={first}
							rows={rows}
							totalRecords={empList?.total}
							rowsPerPageOptions={[
								30,
								50,
								100,
								`${empList?.total}`,
							]}
							onPageChange={onPageChange}
						/>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default EmployeeList;
