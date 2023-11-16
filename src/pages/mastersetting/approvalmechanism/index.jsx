import { useState, useEffect } from 'react';
import {
	ChakraProvider,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	useToast,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	Heading,
} from '@chakra-ui/react';
import StageList from './stageList';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import ApprovalVariantList from './approvalVariantList';

const ApprovalMechanism = () => {
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const [sucess, setSucess] = useState();
	const [products, setProducts] = useState([]);
	const [typeName, setTypeName] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function toastCall(data) {
		return toast({
			title: data.data,
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const weekOffTable = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/all-claim-summary`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setProducts(data1.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		weekOffTable();
	}, [sucess]);

	const addType = async (e) => {
		e.preventDefault();
		let formValues = new FormData();
		formValues.append('type_name', typeName);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/claim-summary-save`,
				{
					method: 'POST',
					body: formValues,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setSucess(!sucess);
				setIsLoading(false);
				setTypeName('');
				toastCall(data);
				onClose();
			} else {
				const data = await response.json();
				toastCall(data);
				onClose();
			}
		} catch (response) {
			const data = await response.json();
			toastCall(data);
			onClose();
		}
	};

	return (
		<ChakraProvider>
			<Tabs size='md' isFitted>
				<TabList
					sx={{
						'& .chakra-tabs__tab': {
							borderRadius: '15px 15px 0px 0px',
							border: 'none',
							color: 'var(--chakra-colors-claimzTextBlueLightColor)',
							fontSize: '1.6rem',
							fontWeight: '700',
							pb: '10px',
							pt: '10px',
						},
						'& .chakra-tabs__tab[aria-selected=true]': {
							borderRadius: '15px 15px 0px 0px',
							color: 'white',
							bg: 'var(--chakra-colors-claimzMainGeadientColor)',
						},
					}}>
					<Tab fontSize='15px'>Stage</Tab>
					<Tab fontSize='15px'> Approval Variant</Tab>
				</TabList>
				<TabPanels>
					<TabPanel
						p='0'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px;'>
						<Box p='15px' textAlign='end'>
							<Button
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								p='20px'
								fontSize='1.6rem'
								color='white'
								onClick={onOpen}
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
								Add New
							</Button>
						</Box>
						<StageList
							products={products}
							setProducts={setProducts}
							sucess={sucess}
							setSucess={setSucess}
						/>

						<Modal
							isCentered
							onClose={onClose}
							isOpen={isOpen}
							motionPreset='slideInBottom'>
							<ModalOverlay />
							<ModalContent minW='400px'>
								<ModalHeader p='0px'>
									<Box
										bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										padding='10px 15px'>
										<Heading>Add Type Name</Heading>
									</Box>
								</ModalHeader>
								<ModalCloseButton mt='10px' color='white' />
								<ModalBody pt='20px' pb='25px'>
									<form
										onSubmit={addType}
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
										}}>
										<FormControl mb='15px'>
											<FormLabel>Type Name</FormLabel>
											<Input
												type='text'
												onChange={(e) =>
													setTypeName(e.target.value)
												}
												required
											/>
										</FormControl>
										<Button
											disabled={isLoading}
											isLoading={isLoading}
											spinner={
												<BeatLoader
													size={8}
													color='white'
												/>
											}
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
									</form>
								</ModalBody>
							</ModalContent>
						</Modal>
					</TabPanel>
					<TabPanel
						p='10px'
						background='white'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px;'>
						<ApprovalVariantList approval={products} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</ChakraProvider>
	);
};

export default ApprovalMechanism;
