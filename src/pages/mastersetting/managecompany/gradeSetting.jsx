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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import GradeSettingDataTable from './gradeSettingDataTable';
import { BeatLoader } from 'react-spinners';

const GradeSetting = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [progress, setProgress] = useState(73);
	const [msg, setMsg] = useState();
	const [code, setCode] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Employee Grade Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const empListAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('grade_value', code);
		const token = localStorage.getItem('token');

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/grade-post`,
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
				setCode('');
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
					left='8%'>
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
						Company Profile
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='22%'>
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
						Employee Code
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='36%'>
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
						Department Settings
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='54%'>
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
						Budget List
					</Box>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					position='absolute'
					top='-12px'
					left='67%'>
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
						Grade Settings
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
						6
					</Box>
					<Box
						as='span'
						color='claimzTextBlackColor'
						fontWeight='600'
						fontSize='1.5rem'>
						Designation Settings
					</Box>
				</Box>
			</Box>

			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>Input Values for Grade</Heading>
			</Box>

			<Box display='flex' justifyContent='space-between' mt='30px'>
				<Box
					width='40%'
					background='#EAEBEA'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					p='40px 30px'
					borderRadius='6px'
					h='calc(100vh - 364px)'>
					<form onSubmit={empListAdd}>
						<h1>{msg}</h1>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Add Grade Value</FormLabel>
								<Input
									type='text'
									placeholder='Add Grade Value'
									value={code}
									onChange={(e) => setCode(e.target.value)}
									required
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
								mt='30px'
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
					h='calc(100vh - 364px)'
					pr='10px'
					background='white'
					border='1px solid #CECECE'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='6px'>
					<Heading
						color='claimzTextBlueLightColor'
						p='10px 30px'
						fontSize='20px'>
						<i className='fa-solid fa-user'></i>
						<Box as='span' ml='15px'>
							Employee Grade
						</Box>
					</Heading>
					<Box>
						<GradeSettingDataTable Msg={msg} />
					</Box>
				</Box>
			</Box>

			<ButtonGroup w='100%'>
				<Flex w='100%' justifyContent='space-between'>
					<Button
						mr='20px'
						mt='20px'
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
						onClick={() =>
							navigate(
								'/master-setting/manage-company/budget-list'
							)
						}>
						Previous
					</Button>

					<Button
						mt='20px'
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
						onClick={() =>
							navigate(
								'/master-setting/manage-company/designation-setting'
							)
						}>
						Next
					</Button>
				</Flex>
			</ButtonGroup>
		</Box>
	);
};

export default GradeSetting;
