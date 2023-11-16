import {
	Progress,
	Box,
	ButtonGroup,
	Heading,
	Flex,
	Text,
	Button,
	Input,
	FormLabel,
	FormControl,
	useToast,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LeavepolicyDataTable from './leavepolicyDataTable';
import { BeatLoader } from 'react-spinners';

const LeavePolicies = () => {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(38);
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [leaveType, setLeaveType] = useState();
	const [totalLeave, setTotalLeave] = useState();
	const [carryForword, setCarryForword] = useState();
	const [encashment, setEncashment] = useState();
	const [leaveList, setLeaveList] = useState([]);
	const [isSelected, setIsSelected] = useState();
	const [isSelectedOne, setIsSelectedOne] = useState('one');
	const [isSelectedSandwitch, setIsSelectedSandwitch] = useState('1');
	const now = new Date();
	const firstDayOfYear = new Date(now.getFullYear(), 0, 2);
	const yearFirstDayString = firstDayOfYear.toISOString().substring(0, 10);
	const lastDayOfYear = new Date(now.getFullYear(), 11, 32);
	const yearLastDayString = lastDayOfYear.toISOString().substring(0, 10);
	const [yearFirstDay, setYearFirstDay] = useState(yearFirstDayString);
	const [yearLastDay, setYearLastDay] = useState(yearLastDayString);
	const [yearFirstDayCalender, setYearFirstDayCalender] = useState('');
	const [yearLastDayCalender, setYearLastDayCalender] = useState('');
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading1, setIsLoading1] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const [isLoading3, setIsLoading3] = useState(false);
	const [isLoading4, setIsLoading4] = useState(false);
	const [isLoading5, setIsLoading5] = useState(false);

	const customNavigate = (path) => {
		navigate(path);
	};

	const handleSelectionCalender = () => {
		setIsSelected('calender');
	};
	const handleSelectionFinancial = () => {
		setIsSelected('financial');
	};
	const handleInputChangeFirst = (event) => {
		setYearFirstDayCalender(event.target.value);
	};
	const handleInputChangeLast = (event) => {
		setYearLastDayCalender(event.target.value);
	};
	const handleSelectionOne = () => {
		setIsSelectedOne('one');
	};
	const handleSelectionIncrement = () => {
		setIsSelectedOne('increment');
	};

	const handleSelectionSandwitch = () => {
		setIsSelectedSandwitch('1');
	};
	const handleSelectionSkipSandwitch = () => {
		setIsSelectedSandwitch('2');
	};

	function toastCall() {
		return toast({
			title: 'Calender Type Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallRuleType() {
		return toast({
			title: 'Rule Type Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const leavepolicies = async () => {
			setLoader(true);
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/leave-system-create`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					let response = data1.data;

					setLeaveList(response);
					if (response.calender_type) {
						if (response.calender_type.cal_type) {
							setIsSelected(response.calender_type.cal_type);
							setYearLastDayCalender(
								response.calender_type.cal_end_month
							);
							setYearFirstDayCalender(
								response.calender_type.cal_start_month
							);
						} else {
							setIsSelected('calender');
						}
					} else {
						setIsSelected('calender');
					}
					setLoader(false);
				} else {
					customNavigate('/login');
				}
			} catch (error) {
				customNavigate('/login');
			}
		};
		leavepolicies();
	}, [msg]);

	const leavetypeAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('value_name', leaveType);
		formData.append('total', totalLeave);
		formData.append('carry', carryForword);
		formData.append('encash', encashment);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/leave-type`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastCall();
				setLeaveType('');
				setTotalLeave('');
				setCarryForword('');
				setEncashment('');
				setIsLoading(false);
			} else {
				setLeaveType('');
				setTotalLeave('');
				setCarryForword('');
				setEncashment('');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const yearTypeAddCalender = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('cal_type', isSelected);
		formData.append('cal_start_month', yearFirstDay);
		formData.append('cal_end_month', yearLastDay);

		try {
			setIsLoading1(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/calender-type`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastCall();
				setIsLoading1(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const yearTypeAddFinancial = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('cal_type', isSelected);
		formData.append('cal_start_month', yearFirstDayCalender);
		formData.append('cal_end_month', yearLastDayCalender);

		try {
			setIsLoading2(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/calender-type`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastCall();
				setIsLoading2(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const ruleTypeOne = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('rule', isSelectedOne);
		try {
			setIsLoading3(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/rule-type`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastCallRuleType();
				setIsLoading3(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const incrementFormData = [];
	const changeIncrementFormData = (index, field_name, val) => {
		incrementFormData[index][field_name] = val;
	};

	const ruleTypeIncrement = async (e) => {
		e.preventDefault();
		let formDataType = new FormData();
		formDataType.append('rule', isSelectedOne);
		let formData = new FormData();
		formData.append('datas', JSON.stringify(incrementFormData));
		try {
			setIsLoading4(true);
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/rule-type`,
				{
					method: 'POST',
					body: formDataType,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const response2 = await fetch(
				`${process.env.REACT_APP_API_URL}/increment-type`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok && response2.ok) {
				toastCallRuleType();
				setIsLoading4(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const ruleTypeSandwitch = async (e) => {
		e.preventDefault();
		function toastRuleTypeSandwitch() {
			return toast({
				title: 'Sandwich Rule Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
		let formData = new FormData();
		formData.append('value', isSelectedSandwitch);

		try {
			setIsLoading5(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/sandwich-update`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastRuleTypeSandwitch();
				setIsLoading5(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	console.log(isSelectedSandwitch, 'isSelectedSandwitch');

	return (
		<Box>
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
							Week-Off Variant
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='35%'>
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
							Leave Policies
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='60%'>
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
							Holiday Policies
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='80%'>
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
							Track Management
						</Box>
					</Box>
				</Box>
			</Box>

			<Box>
				{/* Leave type Start */}
				<Box
					margin='0 auto'
					bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					color='white'
					padding='10px 15px'>
					<Heading>Leave Policies</Heading>
				</Box>
				<Box
					display='-webkit-inline-box'
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					pb='10px'
					mt='24px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Leave Type
					</Text>
				</Box>
				<Box
					padding='30px'
					border='1px solid #CECECE'
					borderRadius='6px'
					display='flex'
					background='#EAEBEA'
					justifyContent='space-between'
					mt='28px'>
					<form onSubmit={leavetypeAdd} style={{ width: '48%' }}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'
							width='100%'
							background='white'
							boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
							p='40px 15px'
							borderRadius='6px'
							h='350px'>
							<Box w='100%' display='flex' gap='15px' mb='15px'>
								<FormControl w='100%'>
									<FormLabel>Leave Type</FormLabel>
									<Input
										type='text'
										placeholder='Enter Leave Type'
										value={leaveType}
										onChange={(e) =>
											setLeaveType(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%'>
									<FormLabel>Total Leave</FormLabel>
									<Input
										type='number'
										placeholder='Enter Total Leave'
										value={totalLeave}
										onChange={(e) =>
											setTotalLeave(e.target.value)
										}
										required
									/>
								</FormControl>
							</Box>
							<Box w='100%' display='flex' gap='15px'>
								<FormControl w='100%'>
									<FormLabel>Carry Forward</FormLabel>
									<Input
										type='number'
										placeholder='Enter Carry Forward'
										value={carryForword}
										onChange={(e) =>
											setCarryForword(e.target.value)
										}
										required
									/>
								</FormControl>
								<FormControl w='100%'>
									<FormLabel>Encashment</FormLabel>
									<Input
										type='number'
										placeholder='Enter Encashment'
										value={encashment}
										onChange={(e) =>
											setEncashment(e.target.value)
										}
										required
									/>
								</FormControl>
							</Box>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								p='20px 15px'
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
								mt='24px'
								type='submit'>
								<i className='fa-sharp fa-solid fa-plus'></i>{' '}
								<Box as='span' ml='5px'>
									Add Leave Type
								</Box>
							</Button>
						</Box>
					</form>
					<Box
						width='48%'
						h='350px'
						overflowY='hidden'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='6px'
						pb='10px'>
						<LeavepolicyDataTable
							leaveList={leaveList}
							Loader={loader}
							msg={msg}
							setMsg={setMsg}
						/>
					</Box>
				</Box>
				{/* Leave type End */}

				<Box>
					{/* calender type Start */}
					<Box>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							pb='10px'
							mt='24px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Calender Type
							</Text>
						</Box>
					</Box>

					<Box
						padding='30px'
						border='1px solid #CECECE'
						borderRadius='6px'
						background='#EAEBEA'
						mt='28px'>
						<RadioGroup onChange={setIsSelected} value={isSelected}>
							<Stack direction='row' gap='20px'>
								<Radio
									value='calender'
									size='lg'
									onChange={handleSelectionCalender}>
									<Box
										fontSize='1.4rem'
										fontWeight='700'
										textTransform='capitalize'
										color='claimzTextBlueLightColor'>
										Calender Year
									</Box>
								</Radio>
								<Radio
									value='financial'
									size='lg'
									onChange={handleSelectionFinancial}>
									<Box
										fontSize='1.4rem'
										fontWeight='700'
										textTransform='capitalize'
										color='claimzTextBlueLightColor'>
										Financial Year
									</Box>
								</Radio>
							</Stack>
						</RadioGroup>

						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'
							width='100%'
							background='white'
							boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
							p='40px 30px'
							borderRadius='6px'
							mt='15px'>
							{isSelected === 'calender' ? (
								<form
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'end',
									}}
									onSubmit={yearTypeAddCalender}>
									<Box
										w='100%'
										display='flex'
										gap='15px'
										mb='15px'>
										<FormControl w='100%'>
											<FormLabel>
												Year Start Date
											</FormLabel>
											<Input
												type='date'
												value={yearFirstDayString}
												placeholder='Enter leave Type'
											/>
										</FormControl>
										<FormControl w='100%'>
											<FormLabel>Year End Date</FormLabel>
											<Input
												type='date'
												value={yearLastDayString}
												placeholder='Enter Total Leave'
											/>
										</FormControl>
									</Box>
									<Button
										disabled={isLoading1}
										isLoading={isLoading1}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px 15px'
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
										mt='15px'
										type='submit'>
										<Box as='span' ml='5px'>
											Submit
										</Box>
									</Button>
								</form>
							) : (
								<form
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'end',
									}}
									onSubmit={yearTypeAddFinancial}>
									<Box
										w='100%'
										display='flex'
										gap='15px'
										mb='15px'>
										<FormControl w='100%'>
											<FormLabel>
												Year Start Date
											</FormLabel>
											<Input
												type='date'
												value={yearFirstDayCalender}
												onChange={
													handleInputChangeFirst
												}
												placeholder='Enter leave Type'
											/>
										</FormControl>
										<FormControl w='100%'>
											<FormLabel>Year End Date</FormLabel>
											<Input
												type='date'
												value={yearLastDayCalender}
												onChange={handleInputChangeLast}
												placeholder='Enter Total Leave'
											/>
										</FormControl>
									</Box>
									<Button
										disabled={isLoading2}
										isLoading={isLoading2}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px 15px'
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
										mt='15px'
										type='submit'>
										<Box as='span' ml='5px'>
											Submit
										</Box>
									</Button>
								</form>
							)}
						</Box>
					</Box>
					{/* calender type End */}

					{/* Rule type Start */}
					<Box>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							pb='10px'
							mt='24px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Rule Type
							</Text>
						</Box>
						<Box
							padding='30px'
							border='1px solid #CECECE'
							borderRadius='6px'
							background='#EAEBEA'
							mt='28px'>
							<form onSubmit={ruleTypeOne}>
								<RadioGroup
									onChange={setIsSelectedOne}
									value={isSelectedOne}>
									<Stack direction='row' gap='20px'>
										<Radio
											value='one'
											size='lg'
											onChange={handleSelectionOne}
											defaultChecked>
											<Box
												fontSize='1.4rem'
												fontWeight='700'
												textTransform='capitalize'
												color='claimzTextBlueLightColor'>
												One Time
											</Box>
										</Radio>
										<Radio
											value='increment'
											size='lg'
											onChange={handleSelectionIncrement}>
											<Box
												fontSize='1.4rem'
												fontWeight='700'
												textTransform='capitalize'
												color='claimzTextBlueLightColor'>
												Incremental
											</Box>
										</Radio>
									</Stack>
								</RadioGroup>

								{isSelectedOne === 'one' && (
									<Button
										disabled={isLoading3}
										isLoading={isLoading3}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='10px'
										p='20px 15px'
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
										mt='15px'
										type='submit'>
										<Box as='span' ml='5px'>
											Submit
										</Box>
									</Button>
								)}
							</form>

							{isSelectedOne === 'increment' && (
								<Box
									display='flex'
									flexDirection='column'
									height='350px'
									overflowY='auto'
									alignItems='end'
									width='100%'
									background='white'
									boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
									p='40px 30px'
									borderRadius='6px'
									mt='15px'>
									<form
										onSubmit={ruleTypeIncrement}
										style={{
											width: '100%',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'end',
										}}
										id='increment'>
										{(leaveList.increment
											? leaveList.increment
											: leaveList.leave_types
										)?.map((data, index) => {
											let start_date =
												isSelected === 'calender'
													? `${yearFirstDayString}`
													: `${yearFirstDay}`;
											let end_date =
												isSelected === 'calender'
													? `${yearLastDayString}`
													: `${yearLastDay}`;

											incrementFormData[index] = {
												id: data.leave_type_id,
												val: '',
												start: start_date,
												end: end_date,
											};

											return (
												<Box
													key={index}
													w='100%'
													display='flex'
													gap='15px'
													mb='15px'>
													<FormControl w='100%'>
														<FormLabel>
															{data.leave_types}
														</FormLabel>
														<Input
															type='text'
															value={
																data.leave_types
															}
															placeholder='Enter Sick Leave'
														/>
													</FormControl>
													<FormControl w='100%'>
														<FormLabel>
															Increment Balance
														</FormLabel>
														<Input
															type='number'
															step='any'
															onChange={(e) =>
																changeIncrementFormData(
																	index,
																	'val',
																	e.target
																		.value
																)
															}
															placeholder='Enter Increment Balance'
															required
														/>
													</FormControl>
													<FormControl w='100%'>
														<FormLabel>
															Start Date
														</FormLabel>
														<Input
															type='date'
															value={start_date}
															onChange={(e) =>
																changeIncrementFormData(
																	index,
																	'start',
																	e.target
																		.value
																)
															}
															placeholder='Enter Date'
														/>
													</FormControl>
													<FormControl w='100%'>
														<FormLabel>
															End Date
														</FormLabel>
														<Input
															type='date'
															value={end_date}
															onChange={(e) =>
																changeIncrementFormData(
																	index,
																	'end',
																	e.target
																		.value
																)
															}
															placeholder='Enter Date'
														/>
													</FormControl>
												</Box>
											);
										})}
										<Button
											disabled={isLoading4}
											isLoading={isLoading4}
											spinner={
												<BeatLoader
													size={8}
													color='white'
												/>
											}
											bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
											boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='10px'
											p='20px 15px'
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
											mt='15px'
											type='submit'>
											<Box as='span' ml='5px'>
												Submit
											</Box>
										</Button>
									</form>
									{/* <Ruletype leaveList={leaveList.leave_types} /> */}
								</Box>
							)}
						</Box>
					</Box>
					{/* Rule type End */}

					{/* Rule type Start */}
					<Box>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							pb='10px'
							mt='24px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Leave
							</Text>
						</Box>
						<Box
							padding='30px'
							border='1px solid #CECECE'
							borderRadius='6px'
							background='#EAEBEA'
							mt='28px'>
							<form
								onSubmit={ruleTypeSandwitch}
								value={isSelectedSandwitch}>
								<RadioGroup
									onChange={setIsSelectedSandwitch}
									defaultValue={isSelectedSandwitch}>
									<Stack direction='row' gap='20px'>
										<Radio
											value='1'
											size='lg'
											onChange={handleSelectionSandwitch}
											isChecked={
												isSelectedSandwitch === true
											}>
											<Box
												fontSize='1.4rem'
												fontWeight='700'
												textTransform='capitalize'
												color='claimzTextBlueLightColor'>
												Apply Sandwich Rule
											</Box>
										</Radio>
										<Radio
											value='0'
											size='lg'
											isChecked={
												isSelectedSandwitch === false
											}
											onChange={
												handleSelectionSkipSandwitch
											}>
											<Box
												fontSize='1.4rem'
												fontWeight='700'
												textTransform='capitalize'
												color='claimzTextBlueLightColor'>
												{' '}
												Skip Sandwich Rule
											</Box>
										</Radio>
									</Stack>
								</RadioGroup>

								<Button
									disabled={isLoading5}
									isLoading={isLoading5}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px 15px'
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
									mt='15px'
									type='submit'>
									<Box as='span' ml='5px'>
										Submit
									</Box>
								</Button>
							</form>
						</Box>
					</Box>
					{/* Rule type End */}
				</Box>
			</Box>

			<ButtonGroup w='100%'>
				<Flex w='100%' justifyContent='space-between'>
					<Button
						mr='20px'
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
						fontSize='1.6rem'
						color='white'
						mt='20px'
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
						onClick={() =>
							customNavigate(
								'/master-setting/attendance-settings/week-of-variant'
							)
						}>
						Previous
					</Button>

					<Button
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
						fontSize='1.6rem'
						color='white'
						mt='20px'
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
						onClick={() =>
							customNavigate(
								'/master-setting/attendance-settings/holiday-policies'
							)
						}>
						Next
					</Button>
				</Flex>
			</ButtonGroup>
		</Box>
	);
};

export default LeavePolicies;
