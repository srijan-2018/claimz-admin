import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Image,
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
} from '@chakra-ui/react';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const TravelLimit = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [travelLimit, setTravelLimit] = useState();
	const [travelMaster, setTravelMaster] = useState();
	const [empGread, setEmpGread] = useState();
	const [loader, setLoader] = useState(false);
	const [empTravelLimitInput, setEmpTravelLimitInput] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Accomodation Limit Updated Sucessfully',
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
					`${process.env.REACT_APP_API_URL}/convayence-mode-of-travel`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/convayence-travel`,
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
					setTravelMaster(tableHeader.data.mode_of_travels);
					setTravelLimit(tableInputData.data.travel_limit);
					setEmpGread(tableColumn.data.grade_values);
					buildMyInputObj(tableInputData.data.travel_limit);
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
			tempObj[`c-${row.grade_id}-${row.conveyance_mode_id}`] =
				row.limit_per_km;
		});
		setEmpTravelLimitInput(tempObj);
	};

	const changeMyInputObj = async (objectKey, value) => {
		console.log('inputKey', objectKey);
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
				conveyance_id: indexKey.split('-')[2],
				limit_per_km: value,
			});
		});

		let formData = new FormData();
		formData.append('array', JSON.stringify(formObj));

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/convayence-travel-post`,
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
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<Box>
			<Box bg='white' borderRadius='15px'>
				<Heading mb='15px' color='claimzTextBlueColor'>
					{' '}
					List of all Travel Limits
				</Heading>
				{loader ? (
					<Box
						height='calc(100vh - 220px)'
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
								height='calc(100vh - 290px)'>
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
															{
																data.component_name
															}
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
															let inputKey = `c-${value.id}-${data.conveyance_mode_id}`;
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
								borderRadius='5px'
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

export default TravelLimit;
