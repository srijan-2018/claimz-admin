import {
	Box,
	Text,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormHelperText,
	useToast,
	Heading,
	Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const ShiftAdd = () => {
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [flag, setFlag] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [shiftName, setShiftName] = useState();
	const [formFields, setFormFields] = useState([
		{
			days: 'Monday',
			in_time: '',
			out_time: '',
			grace_time: '',
			half_day: '',
			absent_time: '',
			over_time: '',
			early_leave_time: '',
			check_in_time_available: '',
		},
	]);

	const showToast = (
		status = 'success',
		message = 'Success',
		duration = 3000,
		closable = true
	) => {
		return toast({
			title: message,
			status: status,
			duration: duration,
			isClosable: closable,
		});
	};

	function toastCallFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	const handleChange = (index, event) => {
		const { name, value } = event.target;

		if (name == 'days') {
			let foundFlag = false;
			formFields.map((item) => {
				if (item.days == value) {
					foundFlag = true;
				}
			});

			if (foundFlag) {
				showToast('error', 'You have already selected the day.');
			} else {
				const updatedFields = [...formFields];
				updatedFields[index][name] = value;
				setFormFields(updatedFields);
			}
		} else {
			const updatedFields = [...formFields];
			updatedFields[index][name] = value;
			setFormFields(updatedFields);
		}
	};

	const addFormField = () => {
		let weekDays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		];
		let nextDay = weekDays[formFields.length];
		setFormFields([
			...formFields,
			{
				days: nextDay,
				in_time: '',
				out_time: '',
				grace_time: '',
				half_day: '',
				absent_time: '',
				over_time: '',
				early_leave_time: '',
				check_in_time_available: '',
			},
		]);
	};

	function toastCall() {
		return toast({
			title: 'Shift Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}
	const shiftAdd = async (e) => {
		e.preventDefault();
		const fromValues = new FormData();
		fromValues.append('shift_name', shiftName);
		fromValues.append('times', JSON.stringify(formFields));

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/shift-post`,
				{
					method: 'POST',
					body: fromValues,
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
				console.error('Error:', data.message);
				setIsLoading(false);
			}
		} catch (error) {
			toastCallFaild();
			setIsLoading(false);
		}
	};

	return (
		<Box>
			<Box
				width='100%'
				borderWidth='1px'
				rounded='lg'
				shadow='1px 1px 3px rgba(0,0,0,0.3)'
				maxWidth='100%'
				minH='100%'
				p='30px'
				m='0px auto'
				bg='white'>
				<Box display='flex' justifyContent='space-between'>
					<Box
						display='-webkit-inline-box'
						borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
						pb='10px'
						mb='15px'
						width='170px'
						pb='5px'
						mb='20px'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='28px'
							lineHeight='36px'>
							Shift Add
						</Text>
					</Box>
					<Link to='/shift-management/shift-list'>
						<Button
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							p='20px 20px'
							color='white'
							ml='15px'
							fontSize='1.6rem'
							borderRadius='15px'
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
							<Text fontSize='1.6rem' fontWeight='700'>
								<i className='fa-solid fa-list'></i> Shift list
							</Text>
						</Button>
					</Link>
				</Box>

				<Box>
					<form
						onSubmit={shiftAdd}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}>
						<Box w='100%'>
							<FormControl mb='15px'>
								<FormLabel> Shift Name</FormLabel>
								<Input
									type='text'
									onChange={(e) =>
										setShiftName(e.target.value)
									}
									required
								/>
							</FormControl>
						</Box>

						<Box w='100%' mt='20px'>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								backgroundImage='linear-gradient(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='var(--chakra-colors-white)'
								padding='10px 15px'>
								<Heading
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='2rem'
									color='white'>
									Set Shift Schedule Time :
								</Heading>
								{formFields.length < 7 && (
									<Button
										bgGradient='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='5px'
										p='18px 25px'
										fontSize='1.6rem'
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
										onClick={addFormField}>
										<Text mr='10px' fontWeight='700'>
											Add Others Day
										</Text>
										<i className='fa-solid fa-plus'></i>
									</Button>
								)}
							</Box>

							{formFields.map((field, index) => (
								<FormControl mt='15px' key={index}>
									<Box>
										<Box
											display='flex'
											justifyContent='space-between'
											mb='15px'>
											<FormControl width='19%'>
												<FormLabel> Day</FormLabel>
												<Select
													placeholder='Select Days'
													name='days'
													value={field.days}
													required
													onChange={(event) =>
														handleChange(
															index,
															event
														)
													}>
													<option
														value='Monday'
														key='Monday'>
														Monday
													</option>
													<option
														value='Tuesday'
														key='Tuesday'>
														Tuesday
													</option>
													<option
														value='Wednesday'
														key='Wednesday'>
														Wednesday
													</option>
													<option
														value='Thursday'
														key='Thursday'>
														Thursday
													</option>
													<option
														value='Friday'
														key='Friday'>
														Friday
													</option>
													<option
														value='Saturday'
														key='Saturday'>
														Saturday
													</option>
													<option
														value='Sunday'
														key='Sunday'>
														Sunday
													</option>
												</Select>
											</FormControl>
											<FormControl width='19%'>
												<FormLabel> In Time</FormLabel>
												<Input
													type='time'
													name='in_time'
													value={field.in_time}
													onChange={(event) =>
														handleChange(
															index,
															event
														)
													}
													required
												/>
											</FormControl>
											<FormControl width='19%'>
												<FormLabel> Out Time</FormLabel>
												<Input
													type='time'
													name='out_time'
													value={field.out_time}
													onChange={(event) =>
														handleChange(
															index,
															event
														)
													}
													required
												/>
											</FormControl>
											<FormControl width='19%'>
												<FormLabel>
													{' '}
													Grace Time
												</FormLabel>
												<Input
													type='time'
													name='grace_time'
													value={field.grace_time}
													onChange={(event) =>
														handleChange(
															index,
															event
														)
													}
													required
												/>
											</FormControl>
											<FormControl width='19%'>
												<Button
													width='100%'
													bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
													boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
													borderRadius='5px'
													p='18px 25px'
													fontSize='1.6rem'
													color='white'
													mt='26px'
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
													onClick={() => {
														setFlag(!flag);
													}}>
													{!flag ? (
														<Text mr='10px'>
															More{' '}
															<i className='fa-solid fa-plus'></i>
														</Text>
													) : (
														<Text mr='10px'>
															Less{' '}
															<i className='fa-solid fa-minus'></i>
														</Text>
													)}
												</Button>
											</FormControl>
										</Box>
										<Box
											display={flag ? 'block' : 'none'}
											bg='white'
											p='15px'
											boxShadow='1px 1px 3px rgba(0,0,0,0.3)'
											borderRadius='10px'>
											<Box
												display='flex'
												justifyContent='space-between'
												mb='15px'>
												<FormControl width='24%'>
													<FormLabel>
														{' '}
														Half Day
													</FormLabel>
													<Input
														type='time'
														name='half_day'
														value={field.half_day}
														onChange={(event) =>
															handleChange(
																index,
																event
															)
														}
													/>
												</FormControl>
												<FormControl width='24%'>
													<FormLabel>
														Mark as Absent
													</FormLabel>
													<Input
														type='time'
														name='absent_time'
														value={
															field.absent_time
														}
														onChange={(event) =>
															handleChange(
																index,
																event
															)
														}
													/>
												</FormControl>
												<FormControl width='24%'>
													<FormLabel>
														Early Leave
													</FormLabel>
													<Input
														type='time'
														name='over_time'
														value={field.over_time}
														onChange={(event) =>
															handleChange(
																index,
																event
															)
														}
													/>
												</FormControl>
												<FormControl width='24%'>
													<FormLabel>
														Overtime Shift
													</FormLabel>
													<Input
														type='time'
														name='early_leave_time'
														value={
															field.early_leave_time
														}
														onChange={(event) =>
															handleChange(
																index,
																event
															)
														}
													/>
												</FormControl>
											</Box>
											<Box
												display='flex'
												justifyContent='space-between'>
												<FormControl width='49%'>
													<FormLabel> Hour</FormLabel>
													<Input
														type='number'
														name='check_in_time_available'
														value={
															field.check_in_time_available
														}
														onChange={(event) =>
															handleChange(
																index,
																event
															)
														}
													/>
													<FormHelperText
														fontSize='12px'
														fontWeight='600'
														display='flex'
														alignItems='c'>
														<Box
															as='span'
															color='orange'
															fontSize='14px'>
															*
														</Box>
														<Box>
															Check in time
															available in hour
															format only.
														</Box>
													</FormHelperText>
												</FormControl>
											</Box>
										</Box>
									</Box>
								</FormControl>
							))}
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
							mb='28px'
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
				</Box>
			</Box>
		</Box>
	);
};

export default ShiftAdd;
