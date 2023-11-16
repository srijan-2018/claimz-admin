import {
	Box,
	Image,
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Switch,
	FormControl,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Template from '../../../assets/images/template.avif';

const Alltemplate = ({ template, sucess, setSucess }) => {
	const btnRef = React.useRef();
	const navigate = useNavigate();
	const toast = useToast();
	let token = localStorage.getItem('token');
	const [selectedTextBox, setSelectedTextBox] = useState(null);
	const [modalData, setModalData] = useState(null);
	const [globalTemplateId, setGlobalTemplateId] = useState();
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Template Added Sucessfully to MY-Template',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	// Handle click event on text box
	const handleTextBoxClick = (data) => {
		setSelectedTextBox(data);
		setModalData(data);
		setGlobalTemplateId(data.global_template_id); // Set the data for the modal
	};

	const pinTemplate = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('global_template_id', globalTemplateId);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/pin-template`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				toastCall();
				setIsLoading(false);
				setSucess(!sucess);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<Box>
			<Box display='flex' flexWrap='wrap' gap='2%'>
				{template?.map((data, index) => {
					return (
						<Box
							key={index}
							width='31%'
							textAlign='center'
							borderWidth='1px'
							borderRadius='5px'
							shadow='1px 1px 3px rgba(0,0,0,0.3)'
							bg='white'
							padding='15px'
							mb='30px'>
							<Image
								src={Template}
								alt='Dan Abramov'
								margin='0 auto'
								height='250px'
								width='100%'
							/>
							<Button
								m='15px 0px'
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								padding='26px 10px'
								fontSize='1.4rem'
								color='white'
								whiteSpace='wrap'
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
								onClick={() => handleTextBoxClick(data)}
								ref={btnRef}>
								{data.template_name}
							</Button>
						</Box>
					);
				})}
			</Box>

			<Drawer
				placement='right'
				finalFocusRef={btnRef}
				isOpen={selectedTextBox !== null}
				onClose={() => setSelectedTextBox(null)}>
				<DrawerOverlay />
				<DrawerContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<DrawerBody p='0px'>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'>
							<FormControl display='flex' alignItems='center'>
								<FormLabel
									htmlFor='email-alerts'
									mb='0'
									color='white !important'
									fontSize='1.6rem !important'>
									Make Your Own Template
								</FormLabel>
								<Switch
									id='email-alerts'
									size='lg'
									onChange={pinTemplate}
								/>
								<DrawerCloseButton
									mt='-7px'
									mr='-15px'
									size='lg'
								/>
							</FormControl>
						</Box>

						{modalData && (
							<Box
								p='20px 10px'
								borderRadius='0px 0px 5px 5px'
								shadow='1px 1px 3px rgba(0,0,0,0.3)'
								bg='white'>
								<Box
									dangerouslySetInnerHTML={{
										__html: modalData?.global_template,
									}}
								/>
							</Box>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default Alltemplate;
