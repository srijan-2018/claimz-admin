import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
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
	Image,
} from '@chakra-ui/react';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 475px);
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

const EmployeeCodeDataTable = ({ Msg }) => {
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();
	const [code, setCode] = useState();
	const [sucess, setsucess] = useState();
	const [startNumber, setStartNumber] = useState();
	const [id, setId] = useState('1');
	const [products, setProducts] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const empCodeList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-code`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setProducts(data1.data.code_values);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		empCodeList();
	}, [Msg, sucess]);

	const statusBodyTemplate = (rowData) => {
		return (
			<Box>
				{rowData.code}
				{rowData.start_number}
			</Box>
		);
	};

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const [valueName, setValueName] = useState(rowData.code);
		const [valueStart, setValueStart] = useState(rowData.start_number);
		const [id, setId] = useState(rowData.code_id);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Employee Code Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const tierUpdate = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('value_name', valueName);
			formData.append('value_start', valueStart);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/code-update`,
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
									Employee Code Update
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
										Enter Emp Code{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={valueName}
										onChange={(e) =>
											setValueName(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%'>
									<FormLabel>
										Enter value{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										value={valueStart}
										onChange={(e) =>
											setValueStart(e.target.value)
										}
										required
									/>
								</FormControl>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
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
									}}>
									Submit
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
					width='100%'
					height='200px'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable
						value={products}
						editMode='row'
						dataKey='code_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='code'
							header='Prefix'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='start_number'
							header='Start From'
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '25%' }}></Column>
						<Column
							field='inventoryStatus'
							header='Employee Code'
							body={statusBodyTemplate}
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

export default EmployeeCodeDataTable;
