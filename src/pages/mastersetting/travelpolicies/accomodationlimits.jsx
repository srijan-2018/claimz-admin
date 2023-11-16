import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Progress,
	Button,
	Input,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
	Image,
} from '@chakra-ui/react';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const AccomodationLimits = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [progress, setProgress] = useState(30);
	const token = localStorage.getItem('token');
	const [travelMaster, setTravelMaster] = useState();
	const [empGread, setEmpGread] = useState();
	const [loader, setLoader] = useState(false);
	const [empTravelLimitInput, setEmpTravelLimitInput] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Accommodation Limit Updated Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const travelLimit = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/tier`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/travel-accomodation`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response3 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-grade`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok && response2.ok) {
					const tableHeader = await response1.json();
					const tableInputData = await response2.json();
					const tableColumn = await response3.json();
					setTravelMaster(tableHeader.data.tier);
					setEmpGread(tableColumn.data.grade_values);
					buildMyInputObj(tableInputData.data.accomodation_limit);
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

	const buildMyInputObj = (tableInputData1) => {
		let tableInputData = JSON.parse(JSON.stringify(tableInputData1));
		let tempObj = {};
		tableInputData.map((row, index) => {
			tempObj[`c-${row.grade_id}-${row.tier_id}`] = row.limit;
		});
		setEmpTravelLimitInput(tempObj);
	};

	const changeMyInputObj = async (objectKey, value) => {
		let copiedInput = Object.assign({}, empTravelLimitInput);
		copiedInput[objectKey] = value;
		setEmpTravelLimitInput(copiedInput);
	};

	const travelLimitPost = async (e) => {
		e.preventDefault();
		let formObj = [];
		Object.entries(empTravelLimitInput).map(([indexKey, value]) => {
			formObj.push({
				grade_id: indexKey.split('-')[1],
				tier_id: indexKey.split('-')[2],
				limit: value,
			});
		});

		let formData = new FormData();
		formData.append('array', JSON.stringify(formObj));

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/travel-accomodation-post`,
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
				setIsLoading(false);
			} else {
				toastCallFaild();
				setIsLoading(false);
			}
		} catch {
			toastCallFaild();
		}
	};

	return (
		<Box>
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
					left='10%'>
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
						Travel Limits
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='24%'>
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
						Accommodation Limits
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='45%'>
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
						Food Limits
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='62%'>
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
						Local Limits
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
						5
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Incidental Limits
					</Box>
				</Box>
			</Box>

			<Box bg='white' borderRadius='15px'>
				<Heading mb='15px' color='claimzTextBlueColor'>
					{' '}
					List of all Accommodation Limits
				</Heading>
				{loader ? (
					<Box
						height='calc(100vh - 310px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<form onSubmit={travelLimitPost}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='flex-end'>
							<Box
								w='100%'
								overflowY='auto'
								height='calc(100vh - 375px)'>
								<Table
									className='reportsTable'
									variant='striped'>
									<Thead
										margin='75px auto 0'
										bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										padding='10px 15px'>
										<Tr>
											<Th
												color='white'
												p='15px 0px'
												textAlign='center'
												fontSize='1.4rem'></Th>
											{travelMaster?.map(
												(data, index) => {
													return (
														<Th
															key={index}
															textTransform='capitalize'
															color='white'
															p='15px 0px'
															textAlign='center'
															fontSize='1.6rem'
															lineHeight='16px'>
															{data.type}
														</Th>
													);
												}
											)}
										</Tr>
									</Thead>
									<Tbody>
										{empGread?.map((value, index) => {
											return (
												<Tr key={index}>
													<Td
														p='15px 0px'
														textAlign='center'
														px='15px'
														fontSize='1.4rem'
														fontWeight='500'>
														{value.grade_value}
													</Td>
													{travelMaster?.map(
														(data, index) => {
															let inputKey = `c-${value.id}-${data.id}`;
															return (
																<Td
																	key={index}
																	p='15px 0px'
																	textAlign='center'
																	px='15px'
																	fontSize='1.4rem'
																	fontWeight='500'>
																	<Input
																		type='number'
																		onChange={(
																			e
																		) =>
																			changeMyInputObj(
																				inputKey,
																				e
																					.target
																					.value
																			)
																		}
																		value={
																			empTravelLimitInput[
																				inputKey
																			]
																		}
																	/>
																</Td>
															);
														}
													)}
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</Box>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								p='20px 20px'
								fontSize='1.6rem'
								color='white'
								mt='28px'
								mr='20px'
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
								Save Changes
							</Button>
						</Box>
					</form>
				)}
			</Box>
		</Box>
	);
};

export default AccomodationLimits;
