import React, { useState } from 'react';
import { Box, Input, Heading } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';

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
		padding: 0px;
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
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 319px);
	}
`;
const ComponentList = ({ CompanyComponents }) => {
	const [updatedValue, setUpdatedValue] = useState();
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

	const onRowEditComplete = (e) => {
		let _CompanyComponents = [...CompanyComponents];
		let { newData, index } = e;

		_CompanyComponents[index] = newData;

		setUpdatedValue(_CompanyComponents);
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
					Search Component Name
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
				<DataTable
					value={CompanyComponents}
					header={header}
					filters={filters}
					onFilter={(e) => setFilters(e.filters)}
					editMode='row'
					dataKey='salary_component_id'
					onRowEditComplete={onRowEditComplete}
					tableStyle={{ minWidth: '50rem' }}>
					<Column
						field='salary_component'
						header='Components '
						editor={(options) => textEditor(options)}
						sortable
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '20%' }}></Column>
					<Column
						field='type'
						header='Types'
						editor={(options) => textEditor(options)}
						sortable
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '20%' }}></Column>
					<Column
						field='percentage'
						header='Percentage '
						editor={(options) => textEditor(options)}
						sortable
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '20%' }}></Column>
					<Column
						field='percentage_of'
						header='Percentage Of '
						editor={(options) => textEditor(options)}
						sortable
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '20%' }}></Column>
					<Column
						field='rules'
						header='Rule'
						editor={(options) => textEditor(options)}
						sortable
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '20%' }}></Column>
				</DataTable>
			</div>
		</CssWrapper>
	);
};

export default ComponentList;
