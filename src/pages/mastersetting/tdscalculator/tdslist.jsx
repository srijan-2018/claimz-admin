import React, { useEffect, useState } from 'react';
import {
	Box,
	Image,
	Table,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Input,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const TdsList = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState([]);
	const [tdsSlab, setTdsSlab] = useState();

	function toastCall() {
		return toast({
			title: 'Business Location Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}
	function toastCallFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/declaration-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/tds-slab`,
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
					setProducts(data1.data);
					setTdsSlab(data2.data);
					setLoader(false);
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, []);

	const ActionTemplate = ({ rowData, tdsSlab }) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [earningComponents, setEarnignComponents] = useState([]);
		const [isLoading, setIsLoading] = useState(false);
		const userId = rowData?.list[0]?.user_id;

		const tierUpdate = async (e) => {
			e.preventDefault();
			onOpen();
			try {
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/all-exempt/${userId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response2.ok) {
					const data2 = await response2.json();
					setEarnignComponents(data2.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const handleEarningInputChange = (key, e) => {
			const inputVal = e.target.value;
			const earningComponentsObj = JSON.parse(
				JSON.stringify(earningComponents)
			);
			earningComponentsObj[key].value = inputVal;

			const findMyChildrenList = (mykey) => {
				let childrenList = [];
				Object.entries(earningComponentsObj).map(([index, row]) => {
					if (row.percentage_of == mykey) {
						childrenList.push(index);
					}
				});
				return childrenList;
			};

			const updateMyChildrensInput = (key, childrenList) => {
				childrenList.map((childrenKey) => {
					const parentValue = earningComponentsObj[key].value;
					earningComponentsObj[childrenKey].value = (
						(parentValue *
							earningComponentsObj[childrenKey].percentage) /
						100
					).toFixed(2);
					earningComponentsObj[childrenKey].inputPercentage =
						earningComponentsObj[childrenKey].percentage;
					updateMyChildrensInput(
						childrenKey,
						findMyChildrenList(childrenKey)
					);
				});
			};
			updateMyChildrensInput(key, findMyChildrenList(key));
			setEarnignComponents(earningComponentsObj);
		};

		let totalEarnings = 0; // Initialize the total earnings
		// dynamic calculation earning components
		const EarningDetails = Object.entries(earningComponents).map(
			([key, data], index, array) => {
				totalEarnings += parseFloat(data.value || 0);
				const isLastElement = index === array.length - 1;

				return (
					<Box
						key={data.exampt_details_id}
						display='flex'
						justifyContent='space-between'
						pt='15px'
						pb='5px'
						mb='1px'>
						<Box>
							{!isLastElement && (
								<Text
									mb='5px'
									fontWeight={
										data.exampt === 'Total CTC'
											? '600'
											: data.exampt ===
											  'Allowance to the extent exempt under section 10'
											? '600'
											: data.exampt ===
											  'Gross Total Income'
											? '600'
											: data.exampt ===
											  'Total taxable income'
											? '600'
											: data.exampt === 'Tax payable'
											? '600'
											: data.exampt === 'Net tax payable'
											? '600'
											: '400'
									}>
									{data.exampt}
								</Text>
							)}
						</Box>
						{!isLastElement && (
							<Box>
								<Input
									type='number'
									placeholder={data.salary_component}
									name={data.salary_component}
									value={data.value}
									className='handleScroll'
									fontWeight={
										data.exampt === 'Total CTC'
											? '600'
											: data.exampt ===
											  'Allowance to the extent exempt under section 10'
											? '600'
											: data.exampt ===
											  'Gross Total Income'
											? '600'
											: data.exampt ===
											  'Total taxable income'
											? '600'
											: data.exampt === 'Tax payable'
											? '600'
											: data.exampt === 'Net tax payable'
											? '600'
											: '400'
									}
									isReadOnly={
										data.exampt === 'Total CTC'
											? true
											: data.exampt ===
											  'Allowance to the extent exempt under section 10'
											? true
											: data.exampt ===
											  'Gross Total Income'
											? true
											: data.exampt ===
											  'Total taxable income'
											? true
											: data.exampt === 'Tax payable'
											? true
											: data.exampt === 'Net tax payable'
											? true
											: false
									}
									onChange={(e) =>
										handleEarningInputChange(key, e)
									}
								/>
							</Box>
						)}
					</Box>
				);
			}
		);

		// Calculate the sum of the values of the first three components
		const sumOfFirstThreeValues = Object.values(earningComponents)
			.slice(0, 3)
			.reduce((sum, data) => sum + parseFloat(data.value || 0), 0);

		// Update the fourth component's value with the calculated sum
		if (earningComponents['3']) {
			earningComponents['3'].value = sumOfFirstThreeValues.toFixed(2);
		}

		const sumOfLastSixthValues = Object.values(earningComponents)
			.slice(4, 9)
			.reduce((sum, data) => sum + parseFloat(data.value || 0), 0);

		// Update the fourth component's value with the calculated sum
		if (earningComponents['9']) {
			earningComponents['9'].value = sumOfLastSixthValues.toFixed(2);
		}

		const difference = sumOfFirstThreeValues - sumOfLastSixthValues;
		// Update the fourth component's value with the calculated sum
		if (earningComponents['10']) {
			earningComponents['10'].value = difference.toFixed(2);
		}
		const deductionUnderChapterVIA =
			Object.values(earningComponents)[11]?.value;

		const TotalTaxableIncome = difference - deductionUnderChapterVIA;

		if (earningComponents['12']) {
			earningComponents['12'].value = TotalTaxableIncome.toFixed(2);
		}

		const TaxTotalIncome = Object.values(earningComponents)[13]?.value;
		const SurchargeWhereverApplicable =
			Object.values(earningComponents)[15]?.value;
		const HealthEducationCess = Object.values(earningComponents)[16]?.value;
		const RebateUnderSection87A =
			Object.values(earningComponents)[14]?.value;

		const totalTaxPayable =
			TaxTotalIncome +
			SurchargeWhereverApplicable +
			HealthEducationCess -
			RebateUnderSection87A;

		if (earningComponents['17']) {
			earningComponents['17'].value = totalTaxPayable.toFixed(2);
		}

		const ReliefUnderSection89 =
			Object.values(earningComponents)[18]?.value;
		const NetTaxPayable = totalTaxPayable - ReliefUnderSection89;

		if (earningComponents['19']) {
			earningComponents['19'].value = NetTaxPayable.toFixed(2);
		}

		const taxStructure = tdsSlab;

		const calculateTax = (salary) => {
			let tax = 0;
			for (const [lower, upper, rate] of taxStructure) {
				if (upper === '') {
					if (salary >= lower) {
						tax += salary * (rate / 100);
					}
				} else if (lower <= salary && salary < upper) {
					tax += (salary - lower) * (rate / 100);
					break;
				} else {
					tax += (upper - lower) * (rate / 100);
				}
			}
			return tax;
		};

		if (earningComponents['13']) {
			earningComponents['13'].value =
				calculateTax(TotalTaxableIncome).toFixed(2);
			earningComponents['17'].value =
				calculateTax(TotalTaxableIncome).toFixed(2);
		}

		const tdsSubmit = async (e) => {
			e.preventDefault();
			const submitEarningComponents = earningComponents.map((item) => ({
				exampt_submit_id: '',
				exampt_detail_id: item.exampt_details_id,
				user_id: userId,
				exampt_amount: item.value,
			}));
			let formData = new FormData();
			formData.append('exempt', JSON.stringify(submitEarningComponents));

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/exempt-submit`,
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
					setIsLoading(false);
				} else if (response.status === 400) {
					toastCallFaild();
					setIsLoading(false);
				} else {
					toastCallFaild();
					setIsLoading(false);
				}
			} catch (error) {
				navigate('/login');
			}
		};

		return (
			<>
				<Button
					onClick={tierUpdate}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-eye fa-2x'></i>
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
									TDS Value Declaration
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody
							display='flex'
							flexDirection='column'
							alignItems='flex-end'
							width='100%'>
							<Box
								width='100%'
								background='white'
								border='1px dashed #CECECE'
								boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='6px'
								padding='15px 10px'>
								<Box
									display='flex'
									justifyContent='space-between'
									borderBottom='1px dashed #CECECE'
									pb='5px'
									mb='1px'>
									<Text fontSize='1.7rem' fontWeight='600'>
										Particulars
									</Text>
									<Text fontSize='1.7rem' fontWeight='600'>
										Value
									</Text>
								</Box>

								<Box>{EarningDetails}</Box>

								<Box
									display='flex'
									justifyContent='space-between'
									borderTop='1px dashed #CECECE'
									pt='5px'>
									<Box>
										<Text mb='5px' fontWeight='600'>
											{
												Object.values(
													earningComponents
												)[19]?.exampt
											}
										</Text>
									</Box>
									<Box>
										<Text mb='5px' fontWeight='600'>
											{
												Object.values(
													earningComponents
												)[19]?.value
											}
										</Text>
									</Box>
								</Box>
							</Box>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
								onClick={tdsSubmit}
								mt='15px'
								mb='15px'
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
								}}>
								Submit
							</Button>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	const submitedTdsList = products?.filter((item) => item.submitted === 0);

	return (
		<>
			{loader ? (
				<Box
					height='calc(100vh - 160px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box
					height='calc(100vh - 160px)'
					width='100%'
					display='flex'
					alignItems='flex-start'>
					<Table>
						<Thead>
							<Tr
								bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='white'
								padding='10px 15px'>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'>
									EMP CODE
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									EMP Name
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									CTC
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									Declaration
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{submitedTdsList?.map((section) => (
								<Tr key={section?.list[0].id}>
									<Td p='15px'>
										{section?.list[0].emp_code}
									</Td>
									<Td p='15px' textAlign='center'>
										{section?.list[0].emp_name}
									</Td>
									<Td p='15px' textAlign='center'>
										{section?.ctc}
									</Td>
									<Td p='15px' textAlign='center'>
										<ActionTemplate
											rowData={section}
											tdsSlab={tdsSlab}
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};

export default TdsList;
