import {
	Box,
	Image,
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	Button,
	Switch,
	FormControl,
	FormLabel,
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
import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import { useNavigate } from 'react-router-dom';
import Template from '../../../assets/images/template.avif';

const PersonalTemplate = ({ OwnTemplate, sucess, setSucess }) => {
	const btnRef = React.useRef();
	const navigate = useNavigate();
	const toast = useToast();
	let token = localStorage.getItem('token');
	const [selectedTextBox, setSelectedTextBox] = useState(null);
	const [modalData, setModalData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [text, setText] = useState('');
	const [globalTemplateId, setGlobalTemplateId] = useState();
	const [templateId, setTemplateId] = useState();
	const [templateName, setTemplateName] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Template Removed Sucessfully to MY-Template',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	// Handle click event on text box
	const handleTextBoxClick = (data) => {
		setSelectedTextBox(data);
		setModalData(data); // Set the data for the modal
		setGlobalTemplateId(data.global_template_id);
	};

	const handleModalClick = (modalData) => {
		onOpen();
		setText(modalData?.template_html);
		setTemplateId(modalData?.template_id);
		setTemplateName(modalData?.template_name); // Set the data for the modal
	};

	const unpinTemplate = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('global_template_id', globalTemplateId);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/unpin-template`,
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
	const updateTemplate = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('template_id', templateId);
		formData.append('template_name', templateName);
		formData.append('template_html', text);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/update-template`,
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
				{OwnTemplate?.map((data, index) => {
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
								lineHeight='20px'
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
							padding='10px 15px'
							display='flex'
							justifyContent='space-between'
							alignItems='center'>
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
									isChecked
									onChange={unpinTemplate}
								/>
							</FormControl>
							<Button
								onClick={() => handleModalClick(modalData)}
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='5px'
								p='20px 20px'
								fontSize='1.6rem'
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
								}}>
								Edit
							</Button>
						</Box>

						{modalData && (
							<Box
								p='20px 10px'
								borderRadius='0px 0px 5px 5px'
								shadow='1px 1px 3px rgba(0,0,0,0.3)'
								bg='white'>
								<Box
									dangerouslySetInnerHTML={{
										__html: modalData?.template_html,
									}}
								/>
							</Box>
						)}

						<Modal onClose={onClose} isOpen={isOpen} isCentered>
							<ModalOverlay />
							<ModalContent minW='50%'>
								<ModalHeader>Update Template</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Editor
										value={text}
										onTextChange={(e) =>
											setText(e.htmlValue)
										}
										style={{ height: '320px' }}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										onClick={updateTemplate}
										bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										borderRadius='5px'
										p='20px 20px'
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
										Update
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default PersonalTemplate;
