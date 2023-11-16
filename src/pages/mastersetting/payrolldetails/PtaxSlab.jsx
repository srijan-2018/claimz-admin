import React, { useEffect, useState } from 'react';
import { Box, Input, Heading, Image } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Loader from '../../../assets/images/loader.gif';

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
		background-color: white;
		padding: 10px;
		border-radius: 5px;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		background: none;
		padding-bottom: 10px;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.p-datatable-wrapper {
		margin-top: 5px;
		padding-right: 5px;
		overflow-y: scroll;
		height: calc(100vh - 263px);
	}
`;

const PtaxSlab = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [ptaxSlab, setPtaxSlab] = useState('');
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
		const departmentList = async () => {
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/ptax-slab`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setPtaxSlab(data1.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, []);

	const onRowEditComplete = (e) => {
		let _ptaxSlab = [...ptaxSlab];
		let { newData, index } = e;

		_ptaxSlab[index] = newData;
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
				flexDirection='column'>
				<Heading
					mb='5px'
					fontSize='1.4rem'
					color='var(--chakra-colors-claimzTextBlueColor)'>
					Search P-Tax Slab Name
				</Heading>
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
						w='100%'
					/>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();

	return (
		<CssWrapper>
			<div className='card p-fluid'>
				{loader ? (
					<Box
						height='calc(100vh - 184px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<DataTable
						value={ptaxSlab}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						editMode='row'
						dataKey='slab_id'
						onRowEditComplete={onRowEditComplete}
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='name'
							header='Name '
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='variant_name'
							header='Variant Name'
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='variant_id'
							header='Variant Id'
							editor={(options) => textEditor(options)}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
					</DataTable>
				)}
			</div>
		</CssWrapper>
	);
};

export default PtaxSlab;
