import React, { useState } from 'react';
import {
	Box,
	Button,
	Text,
	Input,
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useToast,
	FormControl,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BudgetTemplate from './BudgetTemplate';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 550px);
	}
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
`;

const CostCenterTable = ({ data }) => {
	const toast = useToast();
	let navigate = useNavigate();
	const [sucess, setSucess] = useState();
	const token = localStorage.getItem('token');

	function toastCall() {
		return toast({
			title: 'Cost Center Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const BudgetBodyTemplate = (rowData) => {
		const [loader, setLoader] = useState(false);
		const [budget, setBudget] = useState([]);
		const {
			isOpen: bugetIsOpen,
			onOpen: bugetOnOpen,
			onClose: bugetOnClose,
		} = useDisclosure();

		const empBudget = async (e) => {
			e.preventDefault();
			bugetOnOpen();
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-budget/${rowData.id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const responseData = await response.json();
					setBudget(responseData.data.budget);
					setLoader(false);
				} else {
					setLoader(false);
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const modifiedData = budget?.map((item) => ({
			budget_amount: item.budget_amount,
			financial_year_start: item.financial_year_start,
			financial_year_end: item.financial_year_end,
		}));

		return (
			<>
				<Button onClick={empBudget} fontSize='1.4rem'>
					<i className='fa-solid fa-chart-simple'></i>
				</Button>
				<Drawer
					isOpen={bugetIsOpen}
					placement='right'
					onClose={bugetOnClose}
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
									Manage Budget for {rowData.cost_center_name}
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<BudgetTemplate
								rowData={rowData}
								modifiedData={modifiedData}
								loader={loader}
							/>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const ActionTemplate = (rowData) => {
		const [costCenterId, setCostcenterId] = useState(rowData.id);
		const [costCenterName, setCostCentername] = useState(
			rowData?.cost_center_name
		);
		const {
			isOpen: editIsOpen,
			onOpen: editOnOpen,
			onClose: editOnClose,
		} = useDisclosure();

		const updateCostCenter = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('id', costCenterId);
			formData.append('cost_center_name', costCenterName);

			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/cost-center-update`,
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
				setSucess(!sucess);
			} else {
				console.error('Error:', data.message);
			}
		};
		return (
			<>
				<Button onClick={editOnOpen} fontSize='1.4rem'>
					<i className='fa-solid fa-pen-to-square'></i>
				</Button>
				<Drawer
					isOpen={editIsOpen}
					placement='right'
					onClose={editOnClose}
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
									Cost Center List Update
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<form
								onSubmit={updateCostCenter}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl mb='15px'>
									<FormLabel>Cost Center Name</FormLabel>
									<Input
										bg='white'
										type='text'
										value={costCenterName}
										onChange={(e) =>
											setCostCentername(e.target.value)
										}
									/>
								</FormControl>
								<Button
									mt='20px'
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
									}}
									onClick={editOnClose}>
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
			<Box className='card p-fluid'>
				<DataTable
					value={data?.cost_center}
					dataKey='id'
					tableStyle={{ minWidth: '100%' }}>
					<Column
						field='cost_center_name'
						header='Cost Centers'
						headerStyle={{ textAlign: 'center' }}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
					<Column
						header='Manage Budget'
						headerStyle={{ textAlign: 'center' }}
						body={BudgetBodyTemplate}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
					<Column
						header='Edit Cost Centers'
						headerStyle={{ textAlign: 'center' }}
						body={ActionTemplate}
						bodyStyle={{ textAlign: 'center' }}
						style={{ width: '31%' }}></Column>
				</DataTable>
			</Box>
		</CssWrapper>
	);
};

export default CostCenterTable;
