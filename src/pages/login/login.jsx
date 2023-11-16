import {
	Box,
	Heading,
	Text,
	Image,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Button,
	useToast,
	Spinner,
} from '@chakra-ui/react';
import Logo from '../../assets/images/login-logo.png';
import LoginGif from '../../assets/images/login-bg.jpg';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css';

const Login = () => {
	const toast = useToast();
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const userRef = useRef();
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);
	function toastCall() {
		return toast({
			title: 'Invalid Login Credential',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
					withCredentials: true,
				}
			);
			const data = await response.json();
			if (response.status === 200) {
				const accessToken = data?.access_token;
				const roles = data;
				setAuth({ email, password, roles, accessToken });
				setEmail('');
				setpassword('');
				navigate(from, { replace: true });
				localStorage.setItem('token', data.access_token);
				localStorage.setItem(
					'user',
					window.btoa(JSON.stringify(roles))
				);
				console.log('roles', roles);
				setLoading(false);
			} else if (response.status === 401) {
				toastCall();
				setLoading(false);
			}
		} catch (error) {
			toastCall();
			setLoading(false);
		}
	};

	return (
		<Box display='flex'>
			<Box
				className='sub-page'
				width='50%'
				display='flex'
				alignItems='center'
				overflowY='none'>
				<Image
					src={LoginGif}
					alt='image from unsplash'
					className='img'
					h='100vh'
					width='100%'
				/>
			</Box>
			<Box className='main-page' width='50%' overflowY='none'>
				<Box className='form_login'>
					<Box
						display='flex'
						alignItems='center'
						className='banner'
						w='70%'>
						<Box width='220px' mb='20px'>
							<Image src={Logo} />
						</Box>
					</Box>
					<form onSubmit={handleSubmit} style={{ width: '70%' }}>
						<Heading
							as='h1'
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='2.8rem'
							lineHeight='36px'>
							Welcome back
						</Heading>
						<Text mb='15px' fontSize='1.6rem' color='#8b8b8b'>
							Enter your email and password to sign in...
						</Text>
						<FormControl mb='20px'>
							<FormLabel fontSize='1.4rem' color='gray'>
								Email address
							</FormLabel>
							<Input
								type='email'
								id='username'
								ref={userRef}
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>
							<FormHelperText fontSize='1.2rem'>
								We'll never share your email.
							</FormHelperText>
						</FormControl>
						<FormControl mb='20px'>
							<FormLabel fontSize='1.4rem' color='gray'>
								Password
							</FormLabel>
							<Input
								type='password'
								id='password'
								onChange={(e) => setpassword(e.target.value)}
								value={password}
								required
							/>
							<FormHelperText fontSize='1.2rem'>
								We'll never share your password.
							</FormHelperText>
						</FormControl>
						<Button
							type='submit'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							fontSize='1.6rem'
							color='white'
							_hover={{
								bgGradient:
									'linear(180deg, #2267A2 0%, #0D4675 100%)',
							}}
							width='100%'
							padding='20px'
							height='50px'>
							{loading ? (
								<Spinner
									thickness='4px'
									speed='0.65s'
									emptyColor='gray.200'
									color='blue.500'
									size='xl'
								/>
							) : (
								<Text fontWeight='600'>Sign In</Text>
							)}
						</Button>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
