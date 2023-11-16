import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Heading,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const AddNewRegion = () => {
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [region, setRegion] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Travel Region Added Sucessfully',
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

	const regionAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', region);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/region-post`,
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
				setRegion(' ');
				setIsLoading(false);
			} else {
				toastCallFaild();
			}
		} catch {
			setIsLoading(false);
			toastCallFaild();
		}
	};

	return (
		<Box>
			<Box
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Heading>Add New Region</Heading>
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
					<form onSubmit={regionAdd}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Add Travel Region</FormLabel>
								<Input
									bg='white'
									type='text'
									onChange={(e) => setRegion(e.target.value)}
									required
								/>
							</FormControl>

							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
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

export default AddNewRegion;
