import React, { useState, useEffect } from 'react';
import {
	Box,
	Heading,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Editor } from 'primereact/editor';
import { useNavigate } from 'react-router-dom';

const CodeOfConduct = () => {
	let token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const [conductLetter, setConductLetter] = useState();
	const [sucess, setSucess] = useState();
	const toast = useToast();
	const {
		isOpen: secondModalIsOpen,
		onOpen: secondModalOnOpen,
		onClose: secondModalOnClose,
	} = useDisclosure();

	function toastCall() {
		return toast({
			title: 'Send Invite',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}
	function toastCallFaild() {
		return toast({
			title: 'The email has already been taken',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}
	function toastCallError() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/company-profile`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setConductLetter(data.data.code_of_conduct);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, []);

	const addCandidate = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('privacy_policy', JSON.stringify(conductLetter));

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/code-of-conduct`,
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
			setSucess(!sucess);
		} else if (response.status === 400) {
			toastCallFaild();
		} else {
			toastCallError();
		}
	};

	return (
		<div>
			<Box
				width='100%'
				borderWidth='1px'
				rounded='lg'
				shadow='1px 1px 3px rgba(0,0,0,0.3)'
				maxWidth='100%'
				minH='100%'
				p='20px 15px'
				m='0px auto'
				bg='white'>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					color='white'
					padding='10px 15px'>
					<Heading>Privacy Policy</Heading>
					<Box>
						<Button
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							p='20px 20px'
							color='white'
							fontSize='1.6rem'
							borderRadius='15px'
							mr='15px'
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
							onClick={secondModalOnOpen}>
							<Text fontSize='1.6rem' fontWeight='700'>
								<i className='fa-solid fa-plus'></i> Add New
							</Text>
						</Button>
						<Button
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							p='20px 20px'
							color='white'
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
							}}
							onClick={secondModalOnOpen}>
							<Text fontSize='1.6rem' fontWeight='700'>
								<i className='fa-solid fa-pen'></i> Edit
							</Text>
						</Button>
					</Box>
				</Box>
				<Box>{conductLetter}</Box>
			</Box>

			<Modal
				onClose={secondModalOnClose}
				isOpen={secondModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='50%'>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box className='card'>
							<Editor
								value={conductLetter}
								onTextChange={(e) =>
									setConductLetter(e.htmlValue)
								}
								style={{ height: '320px' }}
							/>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={addCandidate}>Submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default CodeOfConduct;
