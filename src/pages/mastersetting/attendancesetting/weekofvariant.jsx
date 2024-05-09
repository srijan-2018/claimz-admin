import React, { useState } from 'react';
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import WeekOfTable from './weekoftable';
import { MultiSelect } from 'primereact/multiselect';
import { BeatLoader } from 'react-spinners';

const WeekofVariant = () => {
	const tokens = localStorage.getItem('token');
	const navigate = useNavigate();
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [progress, setProgress] = useState(12);
	const [variantName, setVariantName] = useState();
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedWeeks, setSelectedWeeks] = useState('');
	const [weekDays, setWeekDays] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [variantNameError, setVariantNameError] = useState(''); // State for variant name error message

	const day = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];

	const weeks = ['first', 'second', 'third', 'fourth'];

	function toastCall() {
		return toast({
			title: 'Week-Off Variant Created Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const variantAdd = async (e) => {
		e.preventDefault();
		if (!variantName) {
			// Display an error message for missing variant name
			toast({
				title: 'Variant Name is required',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		let formData = new FormData();
		formData.append('variant_name', variantName);
		formData.append('weekoff', `${JSON.stringify(selectedDay)}`);
		formData.append('alt', `${JSON.stringify(selectedWeeks)}`);
		formData.append('week', weekDays);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/weekoff-post`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${tokens}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setMsg(!msg);
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
		<>
			<Box mb='0px'>
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
						left='28%'>
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
							Leave Correction
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='63%'>
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
							5
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

			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>Week-Off Variant</Heading>
			</Box>

			<Box display='flex' justifyContent='space-between' mt='30px'>
				<Box
					width='40%'
					background='#EAEBEA'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					p='40px 30px'
					borderRadius='6px'
					height='calc(100vh - 365px)'>
					<form onSubmit={variantAdd}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Enter Variant Name</FormLabel>
								<Input
									bg='white'
									type='text'
									placeholder='Enter Variant Name'
									onChange={(e) =>
										setVariantName(e.target.value)
									}
								/>
							</FormControl>
							<Box
								w='100%'
								mb='10px'
								display='flex'
								justifyContent='space-between'
								alignItems='center'>
								<FormControl
									width='48%'
									sx={{
										'& .p-multiselect': {
											width: '100%',
											bg: 'white',
											fontSize: '1.4rem',
											border: '1px solid var(--chakra-colors-claimzBorderGrayColor)',
										},
									}}>
									<FormLabel>Regular Variant</FormLabel>
									<MultiSelect
										value={selectedDay}
										onChange={(e) =>
											setSelectedDay(e.value)
										}
										options={day}
										placeholder='Select Regular Variant'
										maxSelectedLabels={3}
										className='w-full md:w-20rem'
									/>
								</FormControl>
								<FormControl width='48%'>
									<FormLabel>Alternative Variant</FormLabel>
									<Select
										bg='white'
										color='#6c757d'
										placeholder='Select option'
										onChange={(event) =>
											setWeekDays(event.target.value)
										}>
										<option value='1'>Sunday</option>
										<option value='2'>Monday</option>
										<option value='3'>Tuesday</option>
										<option value='4'>Wednesday</option>
										<option value='5'>Thursday</option>
										<option value='6'>Friday</option>
										<option value='7'>Saturday</option>
									</Select>
								</FormControl>
							</Box>
							<FormControl
								mb='10px'
								width='100%'
								sx={{
									'& .p-multiselect': {
										width: '100%',
										bg: 'white',
										fontSize: '1.4rem',
										border: '1px solid var(--chakra-colors-claimzBorderGrayColor)',
									},
								}}>
								<FormLabel>Alternative Week Off</FormLabel>
								<MultiSelect
									value={selectedWeeks}
									onChange={(e) => setSelectedWeeks(e.value)}
									options={weeks}
									placeholder='Select Alternate Week Off'
									maxSelectedLabels={3}
									className='w-full md:w-20rem'
								/>
							</FormControl>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
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
								}}>
								Submit
							</Button>
						</Box>
					</form>
				</Box>
				<Box
					width='58%'
					height='calc(100vh - 365px)'
					overflowY='hidden'
					background='white'
					border='1px solid #CECECE'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='6px'>
					<Heading
						color='claimzTextBlueLightColor'
						p='15px 30px'
						fontSize='20px'>
						<i className='fa-solid fa-user'></i>
						<Box as='span' ml='15px'>
							Weekoff Variant List
						</Box>
					</Heading>
					<Box pr='5px' pb='5px'>
						<WeekOfTable Msg={msg} />
					</Box>
				</Box>
			</Box>

			<ButtonGroup w='100%'>
				<Flex w='100%' justifyContent='space-between'>
					<Button
						opacity='0'
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
							navigate(
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
							navigate(
								'/master-setting/attendance-settings/leave-policies'
							)
						}>
						Next
					</Button>
				</Flex>
			</ButtonGroup>
		</>
	);
};

export default WeekofVariant;
