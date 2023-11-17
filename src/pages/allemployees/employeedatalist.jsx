import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	useToast,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Heading,
	Tooltip,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import EmployeeUpdate from './updateEmploye.jsx';
import { useNavigate } from 'react-router-dom';
import Loader from '../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';
import { saveAs } from 'file-saver';

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
		background: white;
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 360px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const EmployeeDataList = () => {
	const navigate = useNavigate();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [msg, setMsg] = useState();
	const [empList, setEmpList] = useState();
	const [offerLetter, setOfferLetter] = useState();
	const [warningLetter, setWarningLetter] = useState();
	const [appointmentLetter, setAppointmentLetter] = useState();
	const [fromValue, setFromValue] = useState([]);
	const [userData, setUserData] = useState('');
	const [loader, setLoader] = useState(false);
	const [fromLoader, setFromLoader] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoadingModal, setIsLoadingModal] = useState(false);

	const cols = [
		{ field: 'emp_code', header: 'Emp Code' },
		{ field: 'emp_name', header: 'Emp Name' },
		{ field: 'mobile_no', header: 'Ph Number' },
		{ field: 'department_name', header: 'Department' },
		{ field: 'primary', header: '1st Reporting' },
		{ field: 'secondary', header: '2nd Reporting' },
	];

	useEffect(() => {
		let token = localStorage.getItem('token');
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list/${rows}?page=${first}`,
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
	}, [first, rows, msg, isLoadingModal]);

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

	const RenderHeader = () => {
		const toast = useToast();
		const token = localStorage.getItem('token');
		const [isLoading, setIsLoading] = useState(false);
		const [uploadedFile, setUploadedFile] = useState(null);
		const [errorMsg, setErrorMsg] = useState([]);

		const data = [
			{
				'Employee Code': 'EMP10002',
				Grade: 'M1',
				Name: 'Hello World',
				'Date of Birth': '2023-10-02',
				'Joining Date': '2023-10-02',
				Gender: 'Male',
				"Father's Name": 'Hello',
				'Permanat Address': '10/88 Bijoygarh',
				'Present Address': '10/88 Bijoygarh',
				'PAN Number': '243432424',
				'Mobile Number': '123456789',
				'Aadhaar Number': '123456789',
				Email: 'test@gmail.com',
				'Emergency Contact Number': 'NULL',
				'Passport Number': 'NULL',
				'Visa Number': 'NULL',
				'Blood Group': 'O+',
				'Place Of Posting': 'West Bengal',
				Department: 'HR',
				'Cost Center': '1007',
				'Week Off Variant': 'CXO',
				Designation: 'Manager',
				'Claim Approval Variant': 'NULL',
				'Ptax Variant': 'NULL',
				'Shift Variant': 'Morning Shift',
				'Bank Account Number': '42343443',
				'Bank Name': 'State Bank Of India',
				Branch: 'Regent Estate',
				'IFSC Code': '234234',
				'Primary Reporting': 'Soumyajit Das',
				'Secondary Reporting': 'Soumyajit Das',
			},
		];
		function generateCSVData(data) {
			const headers = Object.keys(data[0]); // Get the keys from the first object as headers
			const headerRow = headers.join(',') + '\n'; // CSV header row

			const rows = data
				.map((item) => {
					const values = headers.map((header) => item[header]);
					return values.join(',');
				})
				.join('\n');

			return headerRow + rows;
		}

		const handleDownload = () => {
			const csvData = generateCSVData(data);
			const blob = new Blob([csvData], {
				type: 'text/csv;charset=utf-8',
			});
			saveAs(blob, 'data.csv');
		};

		function toastCall() {
			return toast({
				title: 'File Uploaded Sucessfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}

		const csvUpload = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('uploaded_file', uploadedFile);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/employee-upload`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const errorResponse = await response.json();
					setErrorMsg(errorResponse);
					toastCall();
					setIsLoading(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const errorList = errorMsg.errors?.map((error, index) => (
			<Text fontWeight='600' mb='10px' key={index}>
				{error}
			</Text>
		));

		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<div className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Heading
						mb='5px'
						fontSize='1.4rem'
						color='var(--chakra-colors-claimzTextBlueColor)'>
						Search Employee
					</Heading>
					<span className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</span>
				</div>
				<Box display='flex' justifyContent='space-between'>
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={
								<ChevronDownIcon
									boxSize={8}
									color='var(--chakra-colors-claimzTextBlueColor)'
								/>
							}
							border='2px solid var(--chakra-colors-claimzBorderColor)'
							borderRadius='15px'
							height='45px'
							padding='0px 20px'
							mr='10px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontSize='1.6rem'
								fontWeight='700'>
								Show More
							</Text>
						</MenuButton>
						<MenuList
							sx={{
								'& .chakra-menu__menuitem': {
									padding: '10px 15px',
								},
							}}>
							<Link to='/manage-employee/all-employee'>
								<MenuItem fontWeight='600'>
									All Employee
								</MenuItem>
							</Link>
							<Link to='/manage-employee/probation-employee'>
								<MenuItem fontWeight='600'>
									Probation Employee{' '}
								</MenuItem>
							</Link>
							<Link to='/manage-employee/separation-employee'>
								<MenuItem fontWeight='600'>
									Separation Employee
								</MenuItem>
							</Link>
							<Link to='/manage-employee/notice-period-employee'>
								<MenuItem fontWeight='600'>
									Notice Period Employee
								</MenuItem>
							</Link>
						</MenuList>
					</Menu>

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
								<i className='fa-solid fa-plus'></i> Create New
							</Text>
						</Link>
					</Button>
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
							<i className='fa-solid fa-file-pdf'></i>
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
							<i className='fa-solid fa-file-excel'></i>
						</Text>
					</Button>
					<Tooltip
						hasArrow
						label='Bulk User Data Upload'
						fontSize='1rem'>
						<Button
							border='2px solid var(--chakra-colors-claimzBorderColor)'
							borderRadius='15px'
							height='45px'
							padding='0px 20px'
							type='button'
							icon='pi pi-file-excel'
							severity='success'
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							onClick={onOpen}>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontSize='1.6rem'
								fontWeight='700'>
								<i className='fa-solid fa-upload'></i>
							</Text>
						</Button>
					</Tooltip>
					<Modal onClose={onClose} isOpen={isOpen} isCentered>
						<ModalOverlay />
						<ModalContent minW='40%' height='auto'>
							<ModalCloseButton mt='7px' color='white' />
							<ModalBody p='0px'>
								<Box
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'>
									<Heading>Employee List Bulk Upload</Heading>
								</Box>
								<Box
									border='1px dashed var(--chakra-colors-claimzTextGrayColor)'
									m='20px'
									p='0px 20px 20px'>
									<Button
										mb='15px'
										borderRadius='15px'
										_hover={{ bg: 'none' }}
										_active={{ bg: 'none' }}
										height='45px'
										padding='0px'
										type='button'
										icon='pi pi-file-excel'
										severity='success'
										background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										backgroundClip='text'
										onClick={handleDownload}>
										<Text
											background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
											backgroundClip='text'
											fontSize='1.6rem'
											fontWeight='700'>
											<Box as='span' mr='10px'>
												CSV Demo
											</Box>
											<i className='fa-solid fa-download'></i>
										</Text>
									</Button>
									<form onSubmit={csvUpload}>
										<Box
											w='100%'
											mb='10px'
											display='flex'
											justifyContent='space-between'
											alignItems='center'>
											<FormControl
												w='100%'
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
															lineHeight:
																'2.2rem',
															padding: '0px 10px',
															marginRight: '15px',
														},
													'& [type="file"]::-webkit-file-upload-button:hover':
														{
															bg: 'dataTableRowBorder',
														},
												}}>
												<FormLabel textTransform='capitalize'>
													CSV File
												</FormLabel>
												<Input
													type='file'
													placeholder='Logo'
													p='0px'
													onChange={(event) =>
														setUploadedFile(
															event.target
																.files[0]
														)
													}
													sx={{
														'::file-selector-button':
															{
																borderTop:
																	'none',
																borderLeft:
																	'none',
																borderBottom:
																	'none',
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
											mt='10px'
											mb='20px'
											type='submit'
											bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
											boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='15px'
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
											}}>
											Upload File
										</Button>
										<Box>
											<Text
												fontWeight='600'
												mb='10px'
												color='red'>
												{errorMsg.message}
											</Text>
											<Box>{errorList}</Box>
										</Box>
									</form>
								</Box>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			</Box>
		);
	};

	const ActionTemplate = (rowData) => {
		const token = localStorage.getItem('token');
		const toast = useToast();
		const [empId, setEmpId] = useState(rowData.id);
		const { isOpen, onOpen, onClose } = useDisclosure();
		const {
			isOpen: LetterIsOpen,
			onOpen: LetterOnOpen,
			onClose: LetterOnClose,
		} = useDisclosure();
		const {
			isOpen: WarningIsOpen,
			onOpen: WarningOnOpen,
			onClose: WarningOnClose,
		} = useDisclosure();
		const {
			isOpen: appointmentIsOpen,
			onOpen: appointmentOnOpen,
			onClose: appointmentOnClose,
		} = useDisclosure();

		function toastCall(data) {
			return toast({
				title: `${data.data}`,
				status: `${data.request_status}`,
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallBlock() {
			return toast({
				title: 'User Blocked Successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallUnblock() {
			return toast({
				title: 'User Unblocked Successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		function toastCallDeviceIDSuccessfully() {
			return toast({
				title: 'Device ID Cleared Successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}

		function toastCallDeviceIDFaild() {
			return toast({
				title: 'Device ID Cleared Failed',
				status: 'error',
				duration: 5000,
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

		const empBlock = async (e) => {
			e.preventDefault();
			const formDataValue = async () => {
				try {
					const response1 = await fetch(
						`${process.env.REACT_APP_API_URL}/emp-block/${empId}`,
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (response1.ok) {
						toastCallBlock();
						setMsg(!msg);
						onClose();
					} else {
						toastCallFaild();
					}
				} catch (error) {
					navigate('/login');
				}
			};
			formDataValue();
		};

		const empUnBlock = async (e) => {
			e.preventDefault();

			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/emp-unblock/${empId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (response.status === 200) {
				toastCallUnblock();
				setMsg(!msg);
				onClose();
			} else {
				toastCallFaild();
			}
		};

		const formDataValue = async (e) => {
			e.preventDefault();
			onOpen();
			try {
				setFromLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-form-view`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-details/${empId}`,
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
					setFromValue(data1);
					let tempUserData = data2;
					setUserData(tempUserData);
					setFromLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const sendTermination = async (e) => {
			e.preventDefault();
			let formValues = new FormData();
			formValues.append('id', rowData.id);
			formValues.append('termination_letter', offerLetter);
			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/send-terminationletter`,
					{
						method: 'POST',
						body: formValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const responseData = await response.json();
					setIsLoadingModal(false);
					toastCall(responseData);
				} else {
					const responseData = await response.json();
					toastCall(responseData);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const sendWarning = async (e) => {
			e.preventDefault();
			let formValues = new FormData();
			formValues.append('id', rowData.id);
			formValues.append('warning_letter', warningLetter);
			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/send-warningletter`,
					{
						method: 'POST',
						body: formValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const responseData = await response.json();
					setIsLoadingModal(false);
					toastCall(responseData);
				} else {
					const responseData = await response.json();
					toastCall(responseData);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const sendAppointment = async (e) => {
			e.preventDefault();
			let formValues = new FormData();
			formValues.append('id', rowData.id);
			formValues.append('appointment_letter', appointmentLetter);
			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/send-appointmentletter`,
					{
						method: 'POST',
						body: formValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const responseData = await response.json();
					setIsLoadingModal(false);
					toastCall(responseData);
				} else {
					const responseData = await response.json();
					toastCall(responseData);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const clearId = async (e) => {
			e.preventDefault();
			const userId = rowData?.id;
			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/clear-device-id/${userId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCallDeviceIDSuccessfully();
					setIsLoadingModal(false);
				} else {
					toastCallDeviceIDFaild();
					setIsLoadingModal(false);
				}
			} catch (error) {
				toastCallDeviceIDFaild();
				setIsLoadingModal(false);
			}
		};

		const document = userData?.documents;

		return (
			<>
				<Button
					onClick={formDataValue}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-pen fa-2x'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='60% !important'
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
									{rowData.emp_name} Employee Details
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box display='flex' flexWrap='wrap' gap='15px'>
								{rowData.is_active == true ? (
									<Button
										onClick={empBlock}
										fontSize='1.4rem'
										padding='20px 10px'
										background='var(--chakra-colors-claimzMainGeadientColor)'
										color='white'
										display='flex'
										alignItems='center'
										justifyContent='center'
										borderRadius='50px'
										_hover={{
											background:
												'var(--chakra-colors-claimzMainGeadientColor)',
										}}
										_active={'none'}>
										<Text fontWeight='600'>
											<i className='fa-solid fa-lock'></i>{' '}
											Block User
										</Text>
									</Button>
								) : (
									<Button
										onClick={empUnBlock}
										fontSize='1.4rem'
										padding='20px 10px'
										background='var(--chakra-colors-claimzMainGeadientColor)'
										color='white'
										display='flex'
										alignItems='center'
										justifyContent='center'
										borderRadius='50px'
										_hover={{
											background:
												'var(--chakra-colors-claimzMainGeadientColor)',
										}}
										_active={'none'}>
										<Text fontWeight='600'>
											<i className='fa-solid fa-unlock'></i>{' '}
											Unblock User
										</Text>
									</Button>
								)}
								<Button
									onClick={WarningOnOpen}
									fontSize='1.4rem'
									padding='20px 10px'
									background='var(--chakra-colors-claimzMainGeadientColor)'
									color='white'
									display='flex'
									alignItems='center'
									justifyContent='center'
									borderRadius='50px'
									_hover={{
										background:
											'var(--chakra-colors-claimzMainGeadientColor)',
									}}
									_active={'none'}>
									Warning Letter
								</Button>
								<Button
									onClick={LetterOnOpen}
									fontSize='1.4rem'
									padding='20px 10px'
									background='var(--chakra-colors-claimzMainGeadientColor)'
									color='white'
									display='flex'
									alignItems='center'
									justifyContent='center'
									borderRadius='50px'
									_hover={{
										background:
											'var(--chakra-colors-claimzMainGeadientColor)',
									}}
									_active={'none'}>
									Terminate Letter
								</Button>
								<Button
									onClick={appointmentOnOpen}
									fontSize='1.4rem'
									padding='20px 10px'
									background='var(--chakra-colors-claimzMainGeadientColor)'
									color='white'
									display='flex'
									alignItems='center'
									justifyContent='center'
									borderRadius='50px'
									_hover={{
										background:
											'var(--chakra-colors-claimzMainGeadientColor)',
									}}
									_active={'none'}>
									Appointment Letter
								</Button>
								{userData?.data?.device_id ? (
									<Button
										disabled={isLoadingModal}
										isLoading={isLoadingModal}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										onClick={clearId}
										fontSize='1.4rem'
										padding='20px 10px'
										background='var(--chakra-colors-claimzMainGeadientColor)'
										color='white'
										display='flex'
										alignItems='center'
										justifyContent='center'
										borderRadius='50px'
										_hover={{
											background:
												'var(--chakra-colors-claimzMainGeadientColor)',
										}}
										_active={'none'}>
										<i className='fa-solid fa-ban'></i>
										<Text
											fontSize='1.4rem'
											fontWeight='600'
											ml='5px'>
											Clear Device ID
										</Text>
									</Button>
								) : (
									<Button
										isDisabled
										fontSize='1.4rem'
										padding='20px 10px'
										background='var(--chakra-colors-claimzMainGeadientColor)'
										color='white'
										display='flex'
										alignItems='center'
										justifyContent='center'
										borderRadius='50px'
										_hover={{
											background:
												'var(--chakra-colors-claimzMainGeadientColor)',
										}}
										_active={'none'}>
										<i className='fa-solid fa-ban'></i>
										<Text
											fontSize='1.4rem'
											fontWeight='600'
											ml='5px'>
											Device ID Not Exists
										</Text>
									</Button>
								)}
							</Box>
							<Box mt='20px'>
								{fromLoader ? (
									<Box
										width='100%'
										height='calc(100vh - 172px)'
										display='flex'
										alignItems='center'
										justifyContent='center'>
										<Image src={Loader} alt='Loader' />
									</Box>
								) : (
									<EmployeeUpdate
										details={rowData.id}
										fromValue={fromValue}
										userData={userData}
										FromLoader={fromLoader}
										msg={msg}
										setMsg={setMsg}
									/>
								)}
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>

				<Modal onClose={LetterOnClose} isOpen={LetterIsOpen} isCentered>
					<ModalOverlay />
					<ModalContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<form onSubmit={sendTermination}>
							<ModalHeader pt='28px'>
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
										Termination Letter
									</Text>
								</Box>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<div className='card'>
									<Editor
										value={offerLetter}
										onTextChange={(e) =>
											setOfferLetter(e.htmlValue)
										}
										style={{ height: '320px' }}
									/>
								</div>
							</ModalBody>
							<ModalFooter pb='28px'>
								<Button
									disabled={isLoadingModal}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									type='submit'
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
									onClick={onClose}>
									Send
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
				<Modal
					onClose={WarningOnClose}
					isOpen={WarningIsOpen}
					isCentered>
					<ModalOverlay />
					<ModalContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<form onSubmit={sendWarning}>
							<ModalHeader pt='28px'>
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
										Warning Letter
									</Text>
								</Box>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<div className='card'>
									<Editor
										value={warningLetter}
										onTextChange={(e) =>
											setWarningLetter(e.htmlValue)
										}
										style={{ height: '320px' }}
									/>
								</div>
							</ModalBody>
							<ModalFooter pb='28px'>
								<Button
									disabled={isLoadingModal}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									type='submit'
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
									onClick={onClose}>
									Send
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
				<Modal
					onClose={appointmentOnClose}
					isOpen={appointmentIsOpen}
					isCentered>
					<ModalOverlay />
					<ModalContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<form onSubmit={sendAppointment}>
							<ModalHeader pt='28px'>
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
										Appointment Letter
									</Text>
								</Box>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<div className='card'>
									<Editor
										value={appointmentLetter}
										onTextChange={(e) =>
											setAppointmentLetter(e.htmlValue)
										}
										style={{ height: '320px' }}
									/>
								</div>
							</ModalBody>
							<ModalFooter pb='28px'>
								<Button
									disabled={isLoadingModal}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									type='submit'
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
									onClick={onClose}>
									Send
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const DocumentTemplate = (rowData) => {
		const token = localStorage.getItem('token');
		const empId = rowData.id;
		const [modalImageSrc, setModalImageSrc] = useState('');
		const { isOpen, onOpen, onClose } = useDisclosure();
		const {
			isOpen: modalIsOpen,
			onOpen: modalOnOpen,
			onClose: modalOnClose,
		} = useDisclosure();

		const handleDocDownload = (imageUrl, fileName) => {
			console.log(
				imageUrl,
				fileName,
				'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
			);
			// const link = document.createElement('a');
			// link.href = imageUrl;
			// link.download = fileName;
			// document.body.appendChild(link);
			// link.click();
			// document.body.removeChild(link);
		};

		const updateModalImageSrc = (imageSrc) => {
			setModalImageSrc(imageSrc);
			modalOnOpen(); // Open the modal
		};

		const formDataValue = async (e) => {
			e.preventDefault();
			onOpen();
			try {
				setFromLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-details/${empId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setUserData(data);
					setFromLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const document = userData?.documents;

		return (
			<>
				<Button
					onClick={formDataValue}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-file fa-2x'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='60% !important'
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
									{rowData.emp_name} Employee Document View
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box>
								{fromLoader ? (
									<Box
										width='100%'
										height='calc(100vh - 172px)'
										display='flex'
										alignItems='center'
										justifyContent='center'>
										<Image src={Loader} alt='Loader' />
									</Box>
								) : (
									<>
										<Box>
											{document &&
												typeof document === 'object' &&
												Object.keys(document).map(
													(key, index) => (
														<Box
															display='flex'
															gap='10px'
															alignItems='center'
															justifyContent='space-between'
															bg='gray.300'
															p='10px'
															marginBottom='15px'
															borderRadius='10px'>
															<Text
																key={index}
																mb='10px'
																fontSize='1.6rem'
																fontWeight='600'
																color='claimzTextBlueColor'
																borderRadius='5px'
																onClick={() =>
																	updateModalImageSrc(
																		document[
																			key
																		]
																	)
																} // Pass document[key] as image source
																cursor='pointer'>
																<i className='fa-solid fa-image'></i>{' '}
																- {key} -{' '}
																{document[key]}
															</Text>
															<Link
																to={
																	document[
																		key
																	]
																}
																target='blank'
																download>
																<i className='fa-solid fa-download'></i>
															</Link>
														</Box>
													)
												)}
										</Box>

										<Modal
											onClose={modalOnClose}
											isOpen={modalIsOpen}
											isCentered>
											<ModalOverlay />
											<ModalContent
												minW='50%'
												h='70vh'
												p='0px'>
												<ModalHeader p='0px'>
													<Box
														bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
														boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
														color='white'
														padding='10px 15px'>
														<Heading>
															Document Preview
														</Heading>
													</Box>
												</ModalHeader>
												<ModalCloseButton
													color='white'
													mt='10px'
												/>
												<ModalBody>
													<Box
														width='100%'
														height='60vh'
														overflowY='scroll'>
														<Image
															src={modalImageSrc} // Set the image source from modalImageSrc
															alt='Modal Image'
															width='100%'
															loading='lazy'
														/>
													</Box>
												</ModalBody>
											</ModalContent>
										</Modal>
									</>
								)}
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const StatusTemplate = (rowData) => {
		return (
			<Box>
				{rowData.is_active === '1' ? (
					<Box
						width='20px'
						height='20px'
						display='flex'
						margin='0 auto'
						alignItems='center'
						justifyContent='center'
						borderRadius='100%'
						border='2px solid var(--chakra-colors-statusInactiveStrokeColor)'
						boxShadow='0px 0px 7px var(--chakra-colors-boxShadowGrayColor)'
						color='var(--chakra-colors-statusActiveColor)'>
						<i className='fa-solid fa-circle'></i>
					</Box>
				) : (
					<Box
						width='20px'
						height='20px'
						display='flex'
						margin='0 auto'
						alignItems='center'
						justifyContent='center'
						borderRadius='100%'
						border='2px solid var(--chakra-colors-statusInactiveStrokeColor)'
						boxShadow='0px 0px 7px var(--chakra-colors-boxShadowGrayColor)'
						color='var(--chakra-colors-claimzTextGrayColor)'>
						<i className='fa-solid fa-circle'></i>
					</Box>
				)}
			</Box>
		);
	};

	const header = RenderHeader();

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 216px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box className='card'>
					<DataTable
						value={empList?.data}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='id'>
						{cols.map((col, index) => (
							<Column
								key={index}
								field={col.field}
								header={col.header}
							/>
						))}
						<Column
							header='Status'
							body={StatusTemplate}
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='Edit'
							body={ActionTemplate}
							bodyStyle={{ textAlign: 'center' }}
						/>
						<Column
							header='View'
							body={DocumentTemplate}
							bodyStyle={{ textAlign: 'center' }}
						/>
					</DataTable>
					{/* pegination */}
					<Box
						display='flex'
						justifyContent='flex-end'
						backgroundColor='white'>
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

export default EmployeeDataList;
