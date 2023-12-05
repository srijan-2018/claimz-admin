import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Image,
	FormControl,
	FormLabel,
	useToast,
	Heading,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { string } from 'yup';

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
		background: none;
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
		height: calc(100vh - 213px);
	}
`;
const PayslipList = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const { empid } = useParams();
	const [loader, setLoader] = useState(false);
	const [sucess, setSucess] = useState();
	const [products, setProducts] = useState();
	const [empCode, setEmpCode] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [payslipData, setPayslipData] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisclosure();
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
			title: 'Payslip Created Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastErrorCall() {
		return toast({
			title: 'Payslip Creation Failed',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/payslip-list/${empid}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setProducts(data.payslip);
					setEmpCode(data.emp_code);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, [sucess]);

	const onRowEditComplete = (e) => {
		let _products = [...products];
		let { newData, index } = e;

		_products[index] = newData;
	};

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
	};

	const RenderHeader = (rowData) => {
		const value = filters['global'] ? filters['global'].value : '';
		const [payDate, setPayDate] = useState('');

		const generatePaySlip = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('id', empid);
			formData.append('pay_date', payDate);

			try {
				setIsLoading(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/generate-payslip`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					toastCall();
					setSucess(!sucess);
					setIsLoading(false);
					onClose();
				} else {
					toastErrorCall();
					setIsLoading(false);
					onClose();
				}
			} catch (error) {
				navigate('/login');
				onClose();
			}
		};

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
						w='30%'
					/>
				</Box>
				<Box>
					<Button
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
						onClick={onOpen}>
						Create
					</Button>

					<Modal
						isCentered
						onClose={onClose}
						isOpen={isOpen}
						motionPreset='slideInBottom'>
						<ModalOverlay />
						<ModalContent minW='400px'>
							<ModalHeader fontSize='1.6rem' p='0px'>
								<Box
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'>
									<Heading>Generate Payslip</Heading>
								</Box>
							</ModalHeader>
							<ModalCloseButton mt='10px' color='white' />
							<ModalBody>
								<form
									onSubmit={generatePaySlip}
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
									}}>
									<FormControl mt='15px'>
										<FormLabel>Select Date</FormLabel>
										<Input
											type='date'
											onChange={(e) =>
												setPayDate(e.target.value)
											}
										/>
									</FormControl>
									<Button
										disabled={isLoading}
										isLoading={isLoading}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px'
										my='15px'
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
										type='submit'>
										Submit
									</Button>
								</form>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			</Box>
		);
	};

	const EmpCode = (rowData) => {
		return <Box>{empCode}</Box>;
	};

	const ViewPaySlip = (rowData) => {
		const payslip = async () => {
			modalOnOpen();
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/view-payslip/${rowData.payslip_unique_id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setPayslipData(data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		let gross = payslipData.gross;
		let deduction = payslipData.total_deduction;
		const earning = gross - deduction;

		function numberToWords(number) {
			// Array of units and their word representations
			const units = [
				'',
				'One',
				'Two',
				'Three',
				'Four',
				'Five',
				'Six',
				'Seven',
				'Eight',
				'Nine',
				'Ten',
				'Eleven',
				'Twelve',
				'Thirteen',
				'Fourteen',
				'Fifteen',
				'Sixteen',
				'Seventeen',
				'Eighteen',
				'Nineteen',
			];

			// Array of tens and their word representations
			const tens = [
				'',
				'',
				'Twenty',
				'Thirty',
				'Forty',
				'Fifty',
				'Sixty',
				'Seventy',
				'Eighty',
				'Ninety',
			];

			// Function to convert a three-digit number to words
			function convertThreeDigitNumber(number) {
				let words = '';

				const hundredsDigit = Math.floor(number / 100);
				const tensDigit = Math.floor((number % 100) / 10);
				const unitsDigit = number % 10;

				if (hundredsDigit > 0) {
					words += units[hundredsDigit] + ' Hundred ';
				}

				if (tensDigit === 1) {
					words += units[10 + unitsDigit];
				} else if (tensDigit > 1) {
					words += tens[tensDigit] + ' ' + units[unitsDigit];
				} else if (unitsDigit > 0) {
					words += units[unitsDigit];
				}

				return words.trim();
			}

			// Function to convert a four-digit number to words
			function convertFourDigitNumber(number) {
				const thousandsDigit = Math.floor(number / 1000);
				const remainingDigits = number % 1000;

				let words = '';

				if (thousandsDigit > 0) {
					words +=
						convertThreeDigitNumber(thousandsDigit) + ' Thousand ';
				}

				if (remainingDigits > 0) {
					words += convertThreeDigitNumber(remainingDigits);
				}

				return words.trim();
			}

			// Convert the integer part to words
			const integerPart = Math.floor(number);
			let words = convertFourDigitNumber(integerPart);

			// Add the currency name
			if (words.length > 0) {
				words += ' Rupee';
			}

			// Convert the decimal part to words
			const decimalPart = Math.floor((number - integerPart) * 100);
			if (decimalPart > 0) {
				words += ' And ';
				words += convertThreeDigitNumber(decimalPart);
				words += ' Paise';
			}

			return words;
		}

		// Test the function
		const number = earning;
		const result = numberToWords(number);

		console.log(payslipData, 'payslipData');

		return (
			<>
				<Button
					onClick={payslip}
					display='flex'
					margin='0 auto'
					alignItems='center'
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</Button>

				<Modal
					isCentered
					onClose={modalOnClose}
					isOpen={modalIsOpen}
					motionPreset='slideInBottom'>
					<ModalOverlay />
					<ModalContent minW='70%' h='90vh' overflowY='scroll'>
						<ModalCloseButton />
						<ModalBody>
							<Box width='100%' margin='20px auto 0px'>
								<Box
									display='flex'
									justifyContent='space-between'
									p='10px 0px'>
									<Box>
										<Heading mb='10px'>
											{payslipData.company_name ===
												'null' || 'undefined'
												? ''
												: payslipData.company_name}
										</Heading>
										<Text fontWeight='600' mb='5px'>
											{payslipData.company_address ===
												'null' || 'undefined'
												? ''
												: payslipData.company_address}
										</Text>
									</Box>
									<Box height='100px' width='100px'>
										<Image
											src={payslipData.company_logo}
											alt='Company Logo'
										/>
									</Box>
								</Box>
							</Box>
							<hr />
							<Box p='10px 0px'>
								<Box>
									<Text fontWeight='600' mb='5px'>
										{payslipData.payment_date === 'null' ||
										'undefined'
											? ''
											: payslipData.payment_date}
									</Text>
									<Text fontWeight='600' mb='5px'>
										{payslipData.emp_name === 'null' ||
										'undefined'
											? ''
											: payslipData.emp_name}
										{payslipData.emp_code === 'null' ||
										'undefined'
											? ''
											: payslipData.emp_code}
									</Text>
									<Text mb='10px'>
										System | Date of joining:{' '}
										{payslipData.date_of_joining ===
											'null' || 'undefined'
											? ''
											: payslipData.date_of_joining}
									</Text>
								</Box>
								<Box display='flex' m='50px 0px 20px'>
									<Box w='25%'>
										<Text fontWeight='600' mb='5px'>
											UAN number
										</Text>
										<Text>
											{payslipData.uan === 'null' ||
											'undefined'
												? 'No UAN Number'
												: payslipData.uan}
										</Text>
									</Box>
									<Box w='25%'>
										<Text fontWeight='600' mb='5px'>
											PF number
										</Text>
										<Text>
											{payslipData.pf === 'null' ||
											'undefined'
												? 'No Pf Number'
												: payslipData.pf}
										</Text>
									</Box>
									<Box w='25%'>
										<Text fontWeight='600' mb='5px'>
											Bank account no.
										</Text>
										<Text>
											{payslipData.account_no ===
												'null' || 'undefined'
												? 'No Account Number'
												: payslipData.account_no}
										</Text>
									</Box>
									<Box w='25%'>
										<Text fontWeight='600' mb='5px'>
											Employee net pay
										</Text>
										<Text
											fontWeight='600'
											fontSize='2rem'
											mb='5px'>
											₹{earning.toFixed(2)}
										</Text>
										<Text>
											LOP Days : {payslipData.lop}
										</Text>
									</Box>
								</Box>
							</Box>
							<Box m='50px 0px'>
								<Box display='flex'>
									<Table variant='simple'>
										<Thead>
											<Tr>
												<Th
													fontSize='1.6rem'
													fontWeight='700'>
													EARNINGS
												</Th>
												<Th
													fontSize='1.6rem'
													fontWeight='700'>
													AMOUNT
												</Th>
												<Th
													fontSize='1.6rem'
													fontWeight='700'
													textAlign='right'>
													YTD
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{payslipData.earning?.map(
												(data, index) => {
													return (
														<Tr key={index}>
															<Td p='15px'>
																{
																	data.salary_component
																}
															</Td>
															<Td p='15px'>
																{Number(
																	data.component_amount
																).toFixed(2)}
															</Td>
															<Td
																p='15px'
																textAlign='right'>
																{Number(
																	data.ytd
																).toFixed(2)}
															</Td>
														</Tr>
													);
												}
											)}
										</Tbody>
									</Table>
									<Table variant='simple'>
										<Thead>
											<Tr>
												<Th
													fontSize='1.6rem'
													fontWeight='700'>
													DEDUCTIONS
												</Th>
												<Th
													fontSize='1.6rem'
													fontWeight='700'>
													AMOUNT
												</Th>
												<Th
													fontSize='1.6rem'
													fontWeight='700'
													textAlign='right'>
													YTD
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{payslipData.deduction?.map(
												(data, index) => {
													return (
														<Tr key={index}>
															<Td p='15px'>
																{
																	data.salary_component
																}
															</Td>
															<Td p='15px'>
																{Number(
																	data.component_amount
																).toFixed(2)}
															</Td>
															<Td
																p='15px'
																textAlign='right'>
																{Number(
																	data.ytd
																).toFixed(2)}
															</Td>
														</Tr>
													);
												}
											)}
										</Tbody>
									</Table>
								</Box>
								<Table variant='simple' mt='75px'>
									<Tbody>
										<Tr>
											<Td
												fontSize='1.7rem'
												fontWeight='700'>
												Gross Earnings
											</Td>
											<Td
												fontSize='1.7rem'
												fontWeight='700'>
												₹
												{Number(
													payslipData.gross
												).toFixed(2)}
											</Td>
											<Td
												fontSize='1.7rem'
												fontWeight='700'
												textAlign='right'>
												Total Deductions
											</Td>
											<Td
												fontSize='1.7rem'
												fontWeight='700'>
												₹
												{Number(
													payslipData.total_deduction
												).toFixed(2)}
											</Td>
										</Tr>
									</Tbody>
								</Table>
								<Box
									maxW='85%'
									color='#0c5460'
									backgroundColor='#d1ecf1'
									borderColor=' #bee5eb'
									m='50px auto'
									p='20px'
									textAlign='center'>
									<Text>
										<Box as='span' fontWeight='600'>
											Total Net Payable ₹
											{Number(earning).toFixed(2)}{' '}
										</Box>
										({result})<br />
										Total Net Payable= Gross Earnings -
										Total Deductions
									</Text>
								</Box>
							</Box>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		);
	};

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 191px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box
					background='white'
					border='1px solid #CECECE'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='6px'
					padding='0px 10px'
					mt='20px'>
					<Box className='card p-fluid'>
						<DataTable
							value={products}
							header={RenderHeader}
							filters={filters}
							onFilter={(e) => setFilters(e.filters)}
							editMode='row'
							dataKey='payslip_id'
							onRowEditComplete={onRowEditComplete}
							tableStyle={{ minWidth: '50rem' }}>
							<Column
								field='pay_date'
								header='Employee Id'
								body={EmpCode}
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '33.33%' }}></Column>
							<Column
								field='pay_date'
								header='Payslip Date'
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '33.33%' }}></Column>
							<Column
								field='payslip_unique_id'
								header='View Payslip'
								body={ViewPaySlip}
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '33.33%' }}></Column>
						</DataTable>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default PayslipList;
