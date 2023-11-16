import React, { useState } from 'react';
import {
	Box,
	Text,
	Button,
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
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { BeatLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

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
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 335px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const AllEmployeeAttendanceReportTable = ({
	dataList,
	rows,
	setRows,
	first,
	setFirst,
}) => {
	const cols = [
		{ field: 'att_date', header: 'Date' },
		{ field: 'emp_name', header: 'Emp Name' },
		{ field: 'checkin', header: 'In Time' },
		{ field: 'half_day', header: 'Half Day' },
		{ field: 'in_address', header: 'In Address' },
		{ field: 'checkout', header: 'Out Time' },
		{ field: 'out_address', header: 'Out Address' },
		{ field: 'timediff', header: 'Total Time' },
		{ field: 'attendance_status', header: 'Status' },
	];

	const toast = useToast();
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [errorMsg, setErrorMsg] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function toastCall() {
		return toast({
			title: 'File Uploaded Sucessfully',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	}

	const data = [
		{
			Email: 'jasleen@figments.in',
			'Checkin Latitude': '22.5852324',
			'Checkin Longitude': '88.4871066',
			'CheckIn Time': '2023-09-04 10:47:00',
			Status: 'checkin',
			'Check In Address':
				'"HFPP+6V, Newtown, Kolkata, 700156, India (22.5852324 88.4871066)"',
			'CheckOut Latitude': '22.5850191',
			'CheckOut Longitude': '88.4868754',
			'CheckOut Address':
				'"HFPP+2P9, Newtown, Chakpachuria, 700156, India"',
			'CheckOut Time': '2023-09-04 18:47:00',
			'Attendance Status': 'Absent',
			'CheckIn Short Address': 'Newtown',
			'CheckOut Short Address': 'Newtown',
			'Half Day Leave': '0',
			Late: '0',
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
		saveAs(blob, 'Attendance-list-sample.csv');
	};

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

				doc.autoTable(exportColumns, attendanceListArr);
				doc.save('All-Employee-Attendence-List.pdf');
			});
		});
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(attendanceListArr);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ['data'],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'All Employee Attendence List');
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

	const csvUpload = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('uploaded_file', uploadedFile);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/attendance-upload`,
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

	const renderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<div className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<h4 className='m-0'>Search</h4>
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
				</Box>

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
								<Heading>
									Employee attendance bulk upload
								</Heading>
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
												CSV File
											</FormLabel>
											<Input
												type='file'
												placeholder='Logo'
												p='0px'
												onChange={(event) =>
													setUploadedFile(
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
		);
	};

	const header = renderHeader();

	let attendanceListArr = [];
	dataList?.data.map((empDetails, empKey) => {
		empDetails.attendance.map((attenRow, attenKey) => {
			attendanceListArr.push({
				att_date: attenRow.att_date,
				emp_name: empDetails.emp_name,
				checkin: attenRow.checkin,
				half_day: '',
				in_address: attenRow.in_address,
				out_address: attenRow.out_address,
				checkout: attenRow.checkout,
				timediff: attenRow.timediff,
				attendance_status: attenRow.attendance_status,
			});
		});
	});

	return (
		<CssWrapper>
			<Box className='card'>
				<DataTable
					value={attendanceListArr}
					header={header}
					filters={filters}
					onFilter={(e) => setFilters(e.filters)}
					dataKey='emp_code'>
					{cols.map((col, index) => (
						<Column
							key={index}
							field={col.field}
							header={col.header}
							style={{ width: '11%' }}
						/>
					))}
				</DataTable>
				{/* pegination */}
				<Box
					display='flex'
					justifyContent='flex-end'
					backgroundColor='white'>
					<Paginator
						first={first}
						rows={rows}
						totalRecords={dataList?.total}
						rowsPerPageOptions={[
							5,
							10,
							20,
							40,
							`${dataList?.total}`,
						]}
						onPageChange={onPageChange}
					/>
				</Box>
			</Box>
		</CssWrapper>
	);
};

export default AllEmployeeAttendanceReportTable;
