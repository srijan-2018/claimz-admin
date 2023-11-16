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
	Image,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useToast,
} from '@chakra-ui/react';
import { Editor } from 'primereact/editor';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { BeatLoader } from 'react-spinners';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './progressbar';
import Loader from '../../assets/images/loader.gif';

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
		height: calc(100vh - 297px);
	}
`;
const ProbationEmployee = () => {
	const navigate = useNavigate();
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);
	const [offerLetter, setOfferLetter] = useState();
	const [isLoadingModal, setIsLoadingModal] = useState(false);
	const [sucess, setSucess] = useState(false);
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
					`${process.env.REACT_APP_API_URL}/probation-employee`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setEmpList(data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [first, rows, sucess]);

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
				</Box>
			</Box>
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
	const header = renderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const {
			isOpen: LetterIsOpen,
			onOpen: LetterOnOpen,
			onClose: LetterOnClose,
		} = useDisclosure();
		const navigate = useNavigate();
		const userId = rowData.id;
		const [permanentEmployee, setPermanentEmployee] = useState();
		const token = localStorage.getItem('token');
		const startDate = new Date(rowData.join_date);
		const endDate = new Date(rowData.join_date);
		endDate.setDate(endDate.getDate() + Number(rowData.probation_period));
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		const formattedStartDate = startDate.toLocaleDateString(
			'en-US',
			options
		);
		const formattedEndDate = endDate.toLocaleDateString('en-US', options);
		const currentDate = new Date().toLocaleDateString();
		const parts = currentDate.split('/');
		const formattedDate = `${parts[2]}-${parts[0].padStart(
			2,
			'0'
		)}-${parts[1].padStart(2, '0')}`;
		const year = endDate.getFullYear();
		const month = (endDate.getMonth() + 1).toString().padStart(2, '0');
		const day = endDate.getDate().toString().padStart(2, '0');
		const formattedLastDate = `${year}-${month}-${day}`;

		function toastCall() {
			return toast({
				title: 'Employee converted sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const probationToPermanent = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/convert-to-permanat-employee/${userId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					setPermanentEmployee(data);
					toastCall();
					setSucess(!sucess);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const sendConfirmationletter = async (e) => {
			e.preventDefault();
			let formValues = new FormData();
			formValues.append('id', rowData.id);
			formValues.append('confirmation_letter', offerLetter);
			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/send-confirmationletter`,
					{
						method: 'POST',
						body: formValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					setIsLoadingModal(false);
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
					_active={{ bg: 'none' }}
					_focus={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</Button>

				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='45% !important'
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
									{rowData.emp_name} Details
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box
								display='flex'
								justifyContent='flex-end'
								mb='20px'>
								<Button
									onClick={LetterOnOpen}
									mr='15px'
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
									<i className='fa-solid fa-envelope'></i>
									<Text
										ml='5px'
										fontSize='1.4rem'
										fontWeight='600'>
										Confirmation Letter
									</Text>
								</Button>
								<Button
									onClick={probationToPermanent}
									padding='20px 10px'
									fontSize='1.4rem'
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
									<i className='fa-solid fa-user-tie'></i>{' '}
									<Text
										ml='5px'
										fontSize='1.4rem'
										fontWeight='600'>
										Convert
									</Text>
								</Button>
							</Box>
							<Box
								background='var(--chakra-colors-claimzMainGeadientColor)'
								mb='15px'
								p='10px 10px 15px'
								color='white'>
								<Heading>Personal Information</Heading>
							</Box>
							<Box p='10px' mb='15px'>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Employee Name -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.emp_name}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Mobile No -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.mobile_no}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Emg Mobile No -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.contact_no}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Mail ID -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.email}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									PAN -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.pan_no}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Aadhar No -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.aadhar_no}
									</Box>
								</Text>
								<Text
									mb='10px'
									fontSize='1.6rem'
									fontWeight='600'
									color='claimzTextBlueColor'>
									Passport No -{' '}
									<Box as='span' color='claimzTextBlackColor'>
										{rowData.passport_no}
									</Box>
								</Text>
							</Box>
							<Box
								background='var(--chakra-colors-claimzMainGeadientColor)'
								mb='15px'
								p='10px 10px 15px'
								color='white'>
								<Heading>Probation Period</Heading>
							</Box>
							<Box>
								<Box
									display='flex'
									justifyContent='space-between'
									mb='10px'>
									<Text
										fontWeight='600'
										color='#019148'
										fontSize='1.4rem'>
										{formattedStartDate}
									</Text>
									<Text
										fontWeight='600'
										color='#F21D1D'
										fontSize='1.4rem'>
										{formattedEndDate}
									</Text>
								</Box>
								<ProgressBar
									startDate={startDate}
									endDate={endDate}
								/>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>

				<Modal onClose={LetterOnClose} isOpen={LetterIsOpen} isCentered>
					<ModalOverlay />
					<ModalContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<form onSubmit={sendConfirmationletter}>
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
										Letter Config Template
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
									Submit
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
	};

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 217px)'
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
							header='Details'
							body={ActionTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '14%' }}
						/>
						<Column
							header='Status'
							body={StatusTemplate}
							bodyStyle={{ textAlign: 'center' }}
							style={{ width: '14%' }}
						/>
					</DataTable>
				</Box>
			)}
		</CssWrapper>
	);
};

export default ProbationEmployee;
