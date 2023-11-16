import {
	Box,
	Heading,
	Image,
	FormControl,
	FormLabel,
	Input,
	Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Profile = () => {
	const userDetails = localStorage.getItem('user');
	const [user] = useState(JSON.parse(atob(userDetails)));

	return (
		<Box width='100%' bg='rgba(230, 237, 239, 1)'>
			<Box
				width='100%'
				borderWidth='1px'
				borderRadius='var(--chakra-radii-lg)'
				boxShadow='1px 1px 3px rgba(0,0,0,0.3)'
				maxWidth='100%'
				minHeight='100%'
				padding='20px 15px'
				margin='0px auto'
				background='var(--chakra-colors-white)'>
				<Box display='flex' justifyContent='space-between'>
					<Box
						w='30%'
						boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
						borderRadius='5px'
						display='flex'
						justifyContent='center'
						alignItems='center'
						flexDirection='column'>
						<Box
							m='20px auto 0px'
							height='184px'
							w='182px'
							borderRadius='50%'
							border='7px solid #256da9'>
							<Image
								src='https://bit.ly/dan-abramov'
								alt='Dan Abramov'
								height='171px'
								w='175px'
								borderRadius='50%'
								m='0 auto'
							/>
						</Box>
						<Box m='20px auto' display='flex' gap='10px'>
							<Box
								boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
								backgroundColor='gray.300'
								borderRadius='50px'
								w='35px'
								h='35px'
								display='flex'
								justifyContent='center'
								alignItems='center'>
								<i className='fa-solid fa-camera'></i>
							</Box>
							<Box
								boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
								backgroundColor='gray.300'
								borderRadius='50px'
								w='35px'
								h='35px'
								display='flex'
								justifyContent='center'
								alignItems='center'>
								<i className='fa-solid fa-pen'></i>
							</Box>
							<Box
								boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
								backgroundColor='gray.300'
								borderRadius='50px'
								w='35px'
								h='35px'
								display='flex'
								justifyContent='center'
								alignItems='center'>
								<i className='fa-solid fa-trash'></i>
							</Box>
						</Box>
					</Box>
					<Box
						w='68%'
						boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
						borderRadius='5px'
						p='15px'>
						<Box mb='15px'>
							<Heading
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='20px'
								lineHeight='36px'>
								Employee Details
							</Heading>
						</Box>
						<form
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
								justifyContent: 'center',
							}}>
							<Box w='100%' display='flex' gap='15px'>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										type='text'
										value={user.emp_name}
										readOnly
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Employee Code</FormLabel>
									<Input
										type='text'
										value={user.emp_code}
										readOnly
									/>
								</FormControl>
								<FormControl>
									<FormLabel>Email</FormLabel>
									<Input
										type='email'
										value={user.email}
										readOnly
									/>
								</FormControl>
							</Box>
							<Button
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
				<Box
					display='flex'
					justifyContent='space-between'
					boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
					mt='20px'
					borderRadius='5px'
					height='265px'>
					<Box p='15px'>
						<Heading
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='20px'
							lineHeight='36px'>
							Others Details
						</Heading>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
