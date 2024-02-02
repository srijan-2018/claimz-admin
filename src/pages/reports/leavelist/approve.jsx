import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Button, useToast } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
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
		height: calc(100vh - 280px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const Approve = () => {
	const navigate = useNavigate();
	const toast = useToast();
	let token = localStorage.getItem('token');
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);

	function toastCall() {
		return toast({
			title: 'Something Went wrong',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/approve-leave-list/${rows}?page=${first}`,
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
					toastCall();
					setLoader(false);
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [first, rows]);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	console.log(empList?.data, 'setEmpList');

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

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const RenderHeader = () => {
		const filteredData = empList?.data?.map((leaveEntry) => ({
			'Employee Name': leaveEntry.emp_name,
			'Start Half Day': leaveEntry.start_half_day,
			'End Half Day': leaveEntry.end_half_day,
			Description: leaveEntry.description,
			'leave Type': leaveEntry.leave_types,
			'Approved By': leaveEntry.approve_by_name,
			'Emp Code': leaveEntry.emp_code,
		}));
		const exportExcel = () => {
			import('xlsx').then((xlsx) => {
				const worksheet = xlsx.utils.json_to_sheet(filteredData);
				const workbook = {
					Sheets: { data: worksheet },
					SheetNames: ['data'],
				};
				const excelBuffer = xlsx.write(workbook, {
					bookType: 'xlsx',
					type: 'array',
				});

				saveAsExcelFile(excelBuffer, 'empList_approve');
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
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					width='40%'
					className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Box as='span' width='100%' className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							style={{ width: '100%' }}
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
				</Box>
			</Box>
		);
	};

	const Header = RenderHeader();

	const dateTemplate = (rowData) => {
		function formatDate(dateString) {
			const date = new Date(dateString);
			const options = { day: '2-digit', month: 'short', year: 'numeric' };
			return date.toLocaleDateString('en-US', options);
		}
		const dateStrings = rowData?.dates;
		const parsedDates = JSON.parse(dateStrings);
		const formattedDates = parsedDates.map(formatDate);
		return (
			<Box>
				<Text fontSize='1.4rem'>{formattedDates.join(', ')}</Text>
			</Box>
		);
	};

	return (
		<CssWrapper
			width='100%'
			height='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Box width='100%' bg='rgba(230, 237, 239, 1)'>
				{loader ? (
					<Box
						height='calc(100vh - 139px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<Box
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'
						padding='0px 10px'>
						<Box className='card'>
							<DataTable
								value={empList?.data}
								header={Header}
								filters={filters}
								onFilter={(e) => setFilters(e.filters)}
								dataKey='emp_code'>
								<Column
									style={{ width: '12%' }}
									header='Name'
									field='emp_name'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='User ID'
									field='emp_code'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Leave Type'
									field='leave_types'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Leave Dates'
									body={dateTemplate}
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Description'
									field='description'
									bodyStyle={{ textAlign: 'center' }}
								/>
							</DataTable>
							<Box
								display='flex'
								justifyContent='flex-end'
								backgroundColor='white'>
								<Paginator
									first={first}
									rows={rows}
									totalRecords={empList?.total}
									rowsPerPageOptions={[
										5,
										`${empList?.total}`,
									]}
									onPageChange={onPageChange}
								/>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</CssWrapper>
	);
};

export default Approve;
