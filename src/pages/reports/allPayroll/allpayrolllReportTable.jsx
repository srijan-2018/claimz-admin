import React, { useState, useRef } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';

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
	.p-datatable .p-datatable-tbody > tr > td.Emp.Name:nth-of-type(2) {
		text-align: left;
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
		text-wrap: nowrap;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		background: white;
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 285px);
		width: 100%;
		padding-right: 5px;
	}
	.p-datatable-thead > tr > th .p-column-title {
		width: 100%;
		text-wrap: nowrap;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Days .p-column-title {
		width: 100px !important;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Leaves .p-column-title {
		width: 100px !important;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Number.of .p-column-title {
		width: 122px !important;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Payable .p-column-title {
		width: 115px !important;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Monthly .p-column-title {
		width: 115px !important;
		text-align: center;
	}
	.p-datatable-thead > tr > th.Earning .p-column-title {
		width: 85px !important;
		text-align: center;
	}
	.p-datatable-tbody > tr > td .A {
		background-color: #ff5733;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
	.p-datatable-tbody > tr > td .P {
		background-color: #008000;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
	.p-datatable-tbody > tr > td .W {
		background-color: #808080;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
	.p-datatable-tbody > tr > td .H {
		background-color: #ffd22b;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
	.p-datatable-tbody > tr > td .L {
		background-color: #2a9df4;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
	.p-datatable-tbody > tr > td .Ho {
		background-color: #36bfa8;
		padding: 10px;
		width: 100%;
		height: 100%;
		color: white;
		font-weight: 600;
	}
`;
const AllpayrolllReportTable = ({ dataList }) => {
	let attendanceHeaders = [];
	dataList &&
		Object.entries(dataList[0]['attendance']).map((rowData, rowKey) => {
			attendanceHeaders.push({
				field: `${rowData[0]}`,
				header: `${rowData[0]}`,
			});
		});

	let earningHeaders = [];
	dataList &&
		Object.entries(dataList[0]['earning']).map((rowData, rowKey) => {
			earningHeaders.push({
				field: `${rowData[0]}`,
				header: `${rowData[0]}`,
			});
		});

	let deductionHeaders = [];
	dataList &&
		Object.entries(dataList[0]['deduction']).map((rowData, rowKey) => {
			deductionHeaders.push({
				field: `${rowData[0]}`,
				header: `${rowData[0]}`,
			});
		});

	const cols = [
		{ field: 'emp_id', header: 'Emp Id' },
		{ field: 'emp_name', header: 'Emp Name' },
		{ field: 'department', header: 'Department' },
		{ field: 'account_number', header: 'Account No.' },
		...attendanceHeaders,
		{ field: 'present', header: 'Days present' },
		{ field: 'holidays', header: 'Holiday' },
		{ field: 'weekoff', header: ' Weekoff' },
		{ field: 'leaves', header: 'Leaves Taken' },
		{ field: 'absent', header: 'Number of Absent' },
		{ field: 'net_payable_days', header: 'Net Payable Days' },
		{ field: 'regularisation', header: 'No. Of Regularisation' },
		{ field: 'monthly_ctc', header: 'Monthly CTC' },
		...earningHeaders,
		{ field: 'gross_earning', header: 'Gross Earning' },
		...deductionHeaders,
		{ field: 'net_salary', header: 'Net Salary' },
	];

	dataList?.map((rowData, rowKey) => {
		dataList[rowKey] = {
			...rowData,
			...rowData.attendance,
			...rowData.earning,
			...rowData.deduction,
		};

		Object.entries(dataList[rowKey]).map(([key, value]) => {
			if (Number.isFinite(value) && !Number.isInteger(value)) {
				dataList[rowKey][key] = value.toFixed(2);
			}
		});
	});

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

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(dataList);
			const workbook = {
				Sheets: { data: worksheet },
				SheetNames: ['data'],
			};
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'dataList');
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
					{/* <Button border='2px solid var(--chakra-colors-claimzBorderColor)' borderRadius='15px' height='45px' padding='0px 20px' mr='10px' type="button" icon="pi pi-file-pdf" severity="warning" background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                        backgroundClip='text' onClick={exportPdf} data-pr-tooltip="PDF">
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontSize='1.6rem' fontWeight='700'>
                            <i className="fa-solid fa-file-pdf"></i>
                        </Text>
                    </Button> */}
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
							<Box as='span' mr='10px'>
								Export as Excel
							</Box>
							<i className='fa-solid fa-file-excel'></i>
						</Text>
					</Button>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();

	return (
		<CssWrapper>
			<Box className='card'>
				<DataTable
					value={dataList}
					header={header}
					filters={filters}
					onFilter={(e) => setFilters(e.filters)}
					dataKey='emp_id'>
					{cols.map((col, index) => (
						<Column
							key={index}
							field={col.field}
							header={col.header}
							body={(rowData) => (
								<span className={rowData[col.field]}>
									{rowData[col.field]}
								</span>
							)}
						/>
					))}
				</DataTable>
			</Box>
		</CssWrapper>
	);
};

export default AllpayrolllReportTable;
