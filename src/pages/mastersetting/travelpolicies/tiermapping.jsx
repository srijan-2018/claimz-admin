import React, { useEffect, useState } from 'react';
import {
	Box,
	Input,
	Progress,
	useToast,
	Select,
	Heading,
	Image,
} from '@chakra-ui/react';
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
		height: calc(100vh - 458px);
	}
`;
const TierMapping = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [progress, setProgress] = useState(100);
	const [products, setProducts] = useState([]);
	const [region, setRegion] = useState();
	const [tier, setTier] = useState();
	const [regionId, setRegionId] = useState();
	const [tierId, setTierId] = useState({});
	const [loader, setLoader] = useState(false);

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

	function toastCall() {
		return toast({
			title: 'Travel Limit Updated Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const travelLimit = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/city-tier`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/region-master`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response3 = await fetch(
					`${process.env.REACT_APP_API_URL}/tier`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok && response2.ok) {
					const data1 = await response1.json();
					const data2 = await response2.json();
					const data3 = await response3.json();
					setProducts(data1.data.tier);
					setRegion(data2.data.region);
					setTier(data3.data.tier);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		travelLimit();
	}, []);

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
						w='100%'
					/>
				</Box>
			</Box>
		);
	};
	const header = renderHeader();

	const travelLimitPost = async (city_id) => {
		let region_id = regionId[`id-${city_id}`];
		let tier_id = tierId[`id-${city_id}`];

		let formData = new FormData();
		formData.append('region_id', region_id);
		formData.append('city_id', city_id);
		formData.append('citytype_id', tier_id);

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/city-tier-post`,
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
			toastCall();
		} else {
			navigate('/login');
		}
	};

	const handleChangeRegions = (event, id) => {
		let temp = { ...regionId };
		temp[`id-${id}`] = event.target.value;
		setRegionId(temp);
	};

	const handleChangeTier = (event, id) => {
		let temp = { ...regionId };
		temp[`id-${id}`] = event.target.value;
		setTierId(temp);
		travelLimitPost(id);
	};

	const RegionsTemplate = (rowData) => {
		return (
			<Box>
				<Select
					placeholder='Select option'
					onChange={(e) => handleChangeRegions(e, rowData.city_id)}>
					{region?.map((data, index) => {
						return (
							<option
								value={data.id}
								selected={
									rowData.region_id == data.id
										? 'selected'
										: ''
								}
								key={index}>
								{data.name}
							</option>
						);
					})}
				</Select>
			</Box>
		);
	};

	const TiersTemplate = (rowData) => {
		return (
			<Box>
				<Select
					placeholder='Select option'
					onChange={(e) => handleChangeTier(e, rowData.city_id)}>
					{tier?.map((data, index) => {
						return (
							<option
								value={data.id}
								selected={
									rowData.city_type_id == data.id
										? 'selected'
										: ''
								}
								key={index}>
								{data.type}
							</option>
						);
					})}
				</Select>
			</Box>
		);
	};

	return (
		<CssWrapper>
			<Box position='relative'>
				<Progress
					colorScheme='green'
					position='relative'
					hasStripe
					value={progress}
					mb='50px'
					mt='15px'
					mx='5%'
					isAnimated></Progress>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='15%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						1
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Tier Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='33%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						2
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Mode of Travel Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='58%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						3
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Region Master
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='78%'>
					<Box
						bg='claimzIconGreentColor'
						w='30px'
						h='30px'
						color='white'
						borderRadius='50px'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						4
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						State And Tier Mapping
					</Box>
				</Box>
			</Box>

			<Box
				margin='50px auto 0px'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>List of Cities</Heading>
			</Box>

			<Box className='card p-fluid'>
				{loader ? (
					<Box
						height='calc(100vh - 364px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<DataTable
						value={products}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						dataKey='city_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='city_id'
							header='Id'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='city_name'
							header='Cities'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='state_name'
							header='States'
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='region_name'
							header='Regions'
							body={RegionsTemplate}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='city_type'
							header='Types/Categories/Tiers'
							body={TiersTemplate}
							sortable
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
					</DataTable>
				)}
			</Box>
		</CssWrapper>
	);
};

export default TierMapping;
