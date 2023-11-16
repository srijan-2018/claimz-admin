import React, { useEffect, useState } from 'react';
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
	Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import DesignationDataTable from './designationDataTable';
import { BeatLoader } from 'react-spinners';

const Designation = () => {
	const toast = useToast();
	let token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [msg, setMsg] = useState();
	const [progress, setProgress] = useState(100);
	const [gradeId, setGradeId] = useState();
	const [designationName, setDesignationName] = useState();
	const [gradeItems, setGradeItems] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Employee Designation List Updated Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const designationList = async () => {
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-grade`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setGradeItems(data1.data.grade_values);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		designationList();
	}, []);

	const designationValueAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('grade', gradeId);
		formData.append('designation', designationName);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/designtion-post`,
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
				setDesignationName('');
				setGradeId('');
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
			<Box mb='50px'>
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
			</Box>

			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>Designation Settings</Heading>
			</Box>

			<Box display='flex' justifyContent='space-between' mt='30px'>
				<Box
					width='40%'
					background='#EAEBEA'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					p='40px 30px'
					borderRadius='6px'
					height='calc(100vh - 364px)'>
					<form onSubmit={designationValueAdd}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Add Designation</FormLabel>
								<Input
									type='text'
									value={designationName}
									placeholder='Enter Designation Name'
									onChange={(e) =>
										setDesignationName(e.target.value)
									}
									required
								/>
							</FormControl>
							<FormControl mb='10px'>
								<FormLabel>Add Grade</FormLabel>
								<Select
									value={gradeId}
									placeholder='Select Grade'
									required
									onChange={(e) =>
										setGradeId(e.target.value)
									}>
									{gradeItems?.map((list) => {
										return (
											<option
												key={list.id}
												value={list.id}>
												{list.grade_value}
											</option>
										);
									})}
								</Select>
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
								mt='15px'
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
					height='calc(100vh - 364px)'
					overflowY='hidden'
					background='white'
					border='1px solid #CECECE'
					boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='6px'
					pb='30px'>
					<Heading
						margin='0 auto'
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						p='10px 30px'
						fontSize='20px'>
						Input Values for Designation
					</Heading>
					<Box>
						<DesignationDataTable
							Msg={msg}
							GradeItems={gradeItems}
						/>
					</Box>
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
							navigate(
								'/master-setting/manage-company/grade-setting'
							)
						}>
						Previous
					</Button>
				</Flex>
			</ButtonGroup>
		</>
	);
};

export default Designation;
