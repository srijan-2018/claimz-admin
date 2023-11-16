import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Heading,
	Select,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const AddNewTravelMaster = () => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [name, setName] = useState();
	const [type, setType] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Travel Master List Created Sucessfully',
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

	const departmentAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', name);
		formData.append('type', type);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/mode-of-travel-post`,
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
				setMsg(!msg);
				setIsLoading(false);
			} else {
				navigate('/login');
				setIsLoading(false);
			}
		} catch {
			toastCallFaild();
			setIsLoading(false);
		}
	};

	return (
		<Box>
			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				padding='10px 15px'>
				<Heading>Add New Travel Master</Heading>
				<Link to='/master-setting/travel-policies'>
					<Button
						bg='white'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
						fontSize='1.6rem'
						color='var(--chakra-colors-claimzTextBlueColor)'
						type='submit'
						_hover={{
							bg: 'white',
						}}
						_active={{
							bg: 'white',
						}}
						_focus={{
							bg: 'white',
						}}>
						<i className='fa-solid fa-backward'></i>{' '}
						<Box ml='5px'>Travel Master Setting</Box>
					</Button>
				</Link>
			</Box>

			<Box display='flex' justifyContent='space-between' mt='30px'>
				<Box
					width='100%'
					background='#EAEBEA'
					boxShadow='1px 1px 3px rgba(0,0,0,0.3)'
					p='40px 30px'
					borderRadius='6px'>
					<form onSubmit={departmentAdd}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Add Travel Mode Name</FormLabel>
								<Input
									bg='white'
									type='text'
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl mb='10px'>
								<FormLabel>Add Travel Type Name</FormLabel>
								<Select
									bg='white'
									placeholder='Select option'
									onChange={(e) => setType(e.target.value)}
									required>
									<option value='train'>Train</option>
									<option value='flight'>Flight</option>
									<option value='others'>Others</option>
								</Select>
							</FormControl>
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
								type='submit'>
								Submit
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default AddNewTravelMaster;
