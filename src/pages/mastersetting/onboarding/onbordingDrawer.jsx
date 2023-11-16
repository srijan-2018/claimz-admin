import React, { useEffect, useState } from 'react';
import {
	Box,
	Text,
	Button,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Heading,
	useToast,
	FormControl,
	FormLabel,
	Input,
	Select,
	Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const OnbordingDrawer = ({ rowData, fromValue, empUser, setRequestStatus }) => {
	const navigate = useNavigate();
	const toast = useToast();
	let token = localStorage.getItem('token');
	const [place, setPlace] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [userData, setUserData] = useState();
	const [id, setId] = useState(rowData?.id);
	const [costCenter, setCostCenter] = useState();
	const [empCode, setEmpCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [modalImageSrc, setModalImageSrc] = useState('');
	const {
		isOpen: OnboardingIsOpen,
		onOpen: OnboardingOnOpen,
		onClose: OnboardingOnClose,
	} = useDisclosure();
	const {
		isOpen: EmployeeIsOpen,
		onOpen: EmployeOnOpen,
		onClose: EmployeOnClose,
	} = useDisclosure();

	const {
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisclosure();

	const [formData, setFormData] = useState({
		id: `${rowData.id}`,
		employee_code_prefix: '',
		grade: '',
		department: '',
		primary_reporting: '',
		secondary_reporting: '',
		designation: '',
		place_of_posting: '',
		weekoff: '',
		shift_variant: '',
		ptax_variant: '',
		cost_center_id: '',
		probation_period: '',
		approver: '',
	});

	const [offerLetterForm, setOfferLetterForm] = useState({
		id: `${rowData.id}`,
		designation: '',
		department: '',
		location: '',
		salary: '',
		deadline: '',
		paid_time: '',
	});

	const updateModalImageSrc = (imageSrc) => {
		setModalImageSrc(imageSrc);
		modalOnOpen(); // Open the modal
	};

	function toastCall() {
		return toast({
			title: 'Offer letter send sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallConvert() {
		return toast({
			title: 'Convert to employee sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function requestFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		if (formData.department.length) {
			const formDataValue = async () => {
				try {
					const response1 = await fetch(
						`${process.env.REACT_APP_API_URL}/emp-cost-center/${formData.department}`,
						{
							method: 'GET',
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (response1.ok) {
						const data1 = await response1.json();
						setCostCenter(data1.data.costcenters);
					}
				} catch (error) {
					navigate('/login');
				}
			};
			formDataValue();
		}
	}, [formData.department]);

	useEffect(() => {
		if (formData?.employee_code_prefix?.length) {
			const formDataValue = async () => {
				const code = formData?.employee_code_prefix;
				const fromValues = new FormData();
				fromValues.append('code', code);
				try {
					const response1 = await fetch(
						`${process.env.REACT_APP_API_URL}/emp-emp_code`,
						{
							method: 'POST',
							body: fromValues,
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					if (response1.ok) {
						const data1 = await response1.json();
						setEmpCode(data1.code);
					}
				} catch (error) {
					navigate('/login');
				}
			};
			formDataValue();
		}
	}, [formData?.employee_code_prefix]);

	const stateMaster = async () => {
		try {
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/state-master-employee`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data1 = await response1.json();
				setPlace(data1.data);
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const formDataValue = async (e) => {
		e.preventDefault();
		OnboardingOnOpen();
		stateMaster();
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/emp-details/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		setUserData(data);
	};

	const offerSend = async (e) => {
		e.preventDefault();
		const fromValues = new FormData();
		// Convert the object to FormData
		Object.keys(offerLetterForm).forEach((key) => {
			fromValues.append(key, offerLetterForm[key]);
		});

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/send-offerletter`,
				{
					method: 'POST',
					body: fromValues,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				toastCall();
				setIsLoading(false);
			} else {
				requestFaild();
				setIsLoading(false);
			}
		} catch (error) {
			requestFaild();
			setIsLoading(false);
		}
	};

	const convertEmployee = async (e) => {
		e.preventDefault();
		const fromValues = new FormData();
		// Convert the object to FormData
		Object.keys(formData).forEach((key) => {
			fromValues.append(key, formData[key]);
		});
		fromValues.append('employee_code', empCode);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/convert-to-employee`,
				{
					method: 'POST',
					body: fromValues,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				toastCallConvert();
				setIsLoading(false);
				setRequestStatus(true);
			} else {
				requestFaild();
				setIsLoading(false);
			}
		} catch {
			navigate('/login');
			setIsLoading(false);
		}
	};

	const document = userData?.documents;

	return (
		<>
			<Button
				onClick={formDataValue}
				width='35px'
				height='35px'
				margin='0 auto'
				background='var(--chakra-colors-claimzMainGeadientColor)'
				color='white'
				display='flex'
				alignItems='center'
				justifyContent='center'
				borderRadius='50px'
				_hover={{
					bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
				}}
				_active={{
					bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
				}}
				_focus={{
					bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
				}}>
				<i className='fa-solid fa-info'></i>
			</Button>

			<Drawer
				isOpen={OnboardingIsOpen}
				placement='right'
				onClose={OnboardingOnClose}
				size='xl'>
				<DrawerOverlay />
				<DrawerContent
					maxW='40% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<DrawerCloseButton size='lg' />
					<DrawerHeader pt='28px'>
						<Box
							display='-webkit-inline-box'
							borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
							pb='10px'
							mb='15px'>
							<Text
								background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
								backgroundClip='text'
								fontWeight='700'
								fontSize='28px'
								lineHeight='36px'>
								Onboarding Candidate Details
							</Text>
						</Box>
					</DrawerHeader>
					<DrawerBody>
						<Box display='flex' justifyContent='flex-end' mb='20px'>
							<Button
								mr='15px'
								onClick={onOpen}
								fontSize='1.4rem'
								padding='20px 10px'
								background='var(--chakra-colors-claimzMainGeadientColor)'
								color='white'
								display='flex'
								alignItems='center'
								justifyContent='center'
								borderRadius='50px'
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
								Send Offer Letter
							</Button>
							<Button
								onClick={EmployeOnOpen}
								fontSize='1.4rem'
								padding='20px 10px'
								background='var(--chakra-colors-claimzMainGeadientColor)'
								color='white'
								display='flex'
								alignItems='center'
								justifyContent='center'
								borderRadius='50px'
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
								Convert to Employee
							</Button>
						</Box>
						<Box
							background='var(--chakra-colors-claimzMainGeadientColor)'
							p='10px 10px 15px'
							color='white'>
							<Heading fontWeight='500' fontSize='20px'>
								Personal Information
							</Heading>
						</Box>
						<Box p='10px' mb='15px'>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Employee Name -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.emp_name}
								</Box>
							</Text>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Mobile No -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.mobile_no}
								</Box>
							</Text>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Emg Mobile No -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.contact_no}
								</Box>
							</Text>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Mail ID -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.email}
								</Box>
							</Text>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								PAN -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.pan_no}
								</Box>
							</Text>
							<Text
								mb='10px'
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Aadhar No -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.aadhar_no}
								</Box>
							</Text>
							<Text
								fontSize='1.6rem'
								fontWeight='600'
								color='claimzTextBlueColor'>
								Passport No -{' '}
								<Box as='span' color='claimzTextBlackColor'>
									{userData?.data?.passport_no}
								</Box>
							</Text>
						</Box>
						<Box
							background='var(--chakra-colors-claimzMainGeadientColor)'
							mb='15px'
							p='10px 10px 15px'
							color='white'>
							<Heading fontWeight='500' fontSize='20px'>
								Document Progress
							</Heading>
						</Box>
						<Box
							p='10px'
							mb='10px'
							height='calc(100vh - 540px)'
							overflowY='auto'>
							{document &&
								typeof document === 'object' &&
								Object.keys(document).map((key, index) => (
									<Text
										key={index}
										mb='10px'
										fontSize='1.6rem'
										fontWeight='600'
										color='claimzTextBlueColor'
										bg='gray.300'
										p='10px'
										borderRadius='5px'
										onClick={() =>
											updateModalImageSrc(document[key])
										} // Pass document[key] as image source
										cursor='pointer'>
										<i className='fa-solid fa-image'></i> -{' '}
										{key} - {document[key]}
									</Text>
								))}
						</Box>

						<Modal
							onClose={modalOnClose}
							isOpen={modalIsOpen}
							isCentered>
							<ModalOverlay />
							<ModalContent minW='70%' h='70vh' p='0px'>
								<ModalHeader p='0px'>
									<Box
										bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										padding='10px 15px'>
										<Heading>Document Preview</Heading>
									</Box>
								</ModalHeader>
								<ModalCloseButton color='white' mt='10px' />
								<ModalBody>
									<Box
										width='100%'
										height='60vh'
										overflowY='scroll'>
										<Image
											src={modalImageSrc} // Set the image source from modalImageSrc
											alt='Modal Image'
											width='100%'
											loading='lazy'
										/>
									</Box>
								</ModalBody>
							</ModalContent>
						</Modal>
					</DrawerBody>
				</DrawerContent>
			</Drawer>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<form onSubmit={offerSend}>
						<ModalHeader pt='28px'>
							<Box
								display='-webkit-inline-box'
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									Offer Letter Config Template
								</Text>
							</Box>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							{/* <div className="card">
                                <Editor value={offerLetter} onTextChange={(e) => setOfferLetter(e.htmlValue)} style={{ height: '320px' }} />
                            </div> */}
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								mb='15px'>
								<FormControl w='31%'>
									<FormLabel>
										Designation{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select Designation'
										value={offerLetterForm.designation}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												designation: event.target.value,
											})
										}>
										{fromValue.designation?.map(
											(data, index) => {
												return (
													<option
														value={
															data.designation_id
														}
														key={index}>
														{data.designation_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>
								<FormControl w='31%'>
									<FormLabel>
										Department{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={offerLetterForm.department}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												department: event.target.value,
											})
										}>
										{fromValue.department?.map(
											(data, index) => {
												return (
													<option
														value={data.id}
														key={index}>
														{data.department_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>
								<FormControl w='31%'>
									<FormLabel>
										Place of Posting{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={offerLetterForm.location}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												location: event.target.value,
											})
										}>
										{place?.map((data, index) => {
											return (
												<option
													value={data.id}
													key={index}>
													{data.name}
												</option>
											);
										})}
									</Select>
								</FormControl>
							</Box>

							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'>
								<FormControl w='31%'>
									<FormLabel>
										Add Salary{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='number'
										placeholder='Enter Salary'
										value={offerLetterForm.salary}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												salary: event.target.value,
											})
										}
									/>
								</FormControl>
								<FormControl w='31%'>
									<FormLabel>
										Add Paid Time{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={offerLetterForm.paid_time}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												paid_time: event.target.value,
											})
										}>
										<option value='Yearly'>Yearly</option>
										<option value='Monthly'>Monthly</option>
									</Select>
								</FormControl>
								<FormControl w='31%'>
									<FormLabel>
										Add Deadline{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='date'
										placeholder='Enter deadline'
										value={offerLetterForm.deadline}
										onChange={(event) =>
											setOfferLetterForm({
												...offerLetterForm,
												deadline: event.target.value,
											})
										}
									/>
								</FormControl>
							</Box>
						</ModalBody>
						<ModalFooter pb='28px'>
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
								onClick={onClose}>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>

			<Modal onClose={EmployeOnClose} isOpen={EmployeeIsOpen} isCentered>
				<ModalOverlay />
				<ModalContent
					maxW='50% !important'
					bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
					<ModalCloseButton />
					<form
						onSubmit={convertEmployee}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							padding: '0px 20px 20px',
						}}>
						<Box p='20px 0px' w='100%'>
							<Heading
								w='100%'
								fontWeight='600'
								mb='2%'
								color='claimzTextBlueColor'>
								<Box as='span' pr='15px'>
									<i className='fa-regular fa-pen-to-square'></i>
								</Box>{' '}
								Current Office Details
							</Heading>

							<Box
								display='flex'
								flexWrap='wrap'
								justifyContent='space-between'
								mb='20px'>
								<FormControl w='31%'>
									<FormLabel>
										Designation{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select Designation'
										value={formData.designation}
										onChange={(event) =>
											setFormData({
												...formData,
												designation: event.target.value,
											})
										}
										required>
										{fromValue.designation?.map(
											(data, index) => {
												return (
													<option
														value={
															data.designation_id
														}
														key={index}>
														{data.designation_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Employee Grade{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select Employee Grade'
										value={formData.grade}
										onChange={(event) =>
											setFormData({
												...formData,
												grade: event.target.value,
											})
										}
										required>
										{fromValue.grade?.map((data, index) => {
											return (
												<option
													value={data.id}
													key={index}>
													{data.grade_value}
												</option>
											);
										})}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Employee Code{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Box
										display='flex'
										sx={{
											'& > .chakra-select__wrapper .chakra-select':
												{
													borderRadius:
														'5px 0px 0px 5px',
												},
											'& > .chakra-input': {
												borderRadius: '0px 5px 5px 0px',
											},
										}}>
										<Select
											placeholder='Select option'
											value={
												formData.employee_code_prefix
											}
											onChange={(event) =>
												setFormData({
													...formData,
													employee_code_prefix:
														event.target.value,
												})
											}
											required>
											{fromValue.emp_codes?.map(
												(data, index) => {
													return (
														<option
															value={data.id}
															key={index}>
															{data.code}
														</option>
													);
												}
											)}
										</Select>
										<Input
											type='text'
											value={empCode}
											onChange={(event) =>
												setFormData({
													...formData,
													employee_code:
														event.target.value,
												})
											}
										/>
									</Box>
								</FormControl>
							</Box>

							<Box
								display='flex'
								flexWrap='wrap'
								justifyContent='space-between'
								mb='20px'>
								<FormControl w='31%'>
									<FormLabel>
										Department
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.department}
										onChange={(event) =>
											setFormData({
												...formData,
												department: event.target.value,
											})
										}
										required>
										{fromValue.department?.map(
											(data, index) => {
												return (
													<option
														value={data.id}
														key={index}>
														{data.department_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>Cost Center</FormLabel>
									<Select
										placeholder='Select cost center'
										value={formData?.cost_center_id}
										onChange={(event) =>
											setFormData({
												...formData,
												cost_center_id:
													event.target.value,
											})
										}>
										{costCenter?.map((data, index) => {
											return (
												<option
													value={data?.id}
													key={index}>
													{data?.cost_center_name}
												</option>
											);
										})}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Primary Reporting{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.primary_reporting}
										onChange={(event) =>
											setFormData({
												...formData,
												primary_reporting:
													event.target.value,
											})
										}
										required>
										{empUser?.map((data, index) => {
											return (
												<option
													value={data.id}
													key={index}>
													{data.emp_name}
												</option>
											);
										})}
									</Select>
								</FormControl>
							</Box>

							<Box
								display='flex'
								flexWrap='wrap'
								justifyContent='space-between'
								mb='20px'>
								<FormControl w='31%'>
									<FormLabel>
										Secondary Reporting{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.secondary_reporting}
										onChange={(event) =>
											setFormData({
												...formData,
												secondary_reporting:
													event.target.value,
											})
										}
										required>
										{empUser?.map((data, index) => {
											return (
												<option
													value={data.id}
													key={index}>
													{data.emp_name}
												</option>
											);
										})}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>Place of Posting</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.place_of_posting}
										onChange={(event) =>
											setFormData({
												...formData,
												place_of_posting:
													event.target.value,
											})
										}
										required>
										{place?.map((data, index) => {
											return (
												<option
													value={data.id}
													key={index}>
													{data.name}
												</option>
											);
										})}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Week Off Variant{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.weekoff}
										onChange={(event) =>
											setFormData({
												...formData,
												weekoff: event.target.value,
											})
										}
										required>
										{fromValue.weekoff_variant?.map(
											(data, index) => {
												return (
													<option
														value={data.variant_id}
														key={index}>
														{data.variant_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>
							</Box>

							<Box
								display='flex'
								justifyContent='space-between'
								flexWrap='wrap'
								mb='20px'>
								<FormControl w='31%'>
									<FormLabel>P-tax Variant</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.ptax_variant}
										onChange={(event) =>
											setFormData({
												...formData,
												ptax_variant:
													event.target.value,
											})
										}>
										{fromValue?.ptax_variant?.map(
											(data, index) => {
												return (
													<option
														value={data.variant_id}
														key={index}>
														{data.variant_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Shift Variant{' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.shift_variant}
										onChange={(event) =>
											setFormData({
												...formData,
												shift_variant:
													event.target.value,
											})
										}
										required>
										{fromValue?.shift_variant?.map(
											(data, index) => {
												return (
													<option
														value={data.shift_id}
														key={index}>
														{data.shift_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>

								<FormControl w='31%'>
									<FormLabel>
										Probation Period(In Days){' '}
										<Box as='span' color='orange'>
											*
										</Box>
									</FormLabel>
									<Input
										type='text'
										placeholder=' Probation Period'
										value={formData.probation_period}
										onChange={(event) =>
											setFormData({
												...formData,
												probation_period:
													event.target.value,
											})
										}
										required
									/>
								</FormControl>
							</Box>

							<Box
								display='flex'
								justifyContent='space-between'
								flexWrap='wrap'
								mb='20px'>
								<FormControl w='31%'>
									<FormLabel>
										Claim Approver Variant
									</FormLabel>
									<Select
										placeholder='Select option'
										value={formData.approver}
										onChange={(event) =>
											setFormData({
												...formData,
												approver: event.target.value,
											})
										}>
										{fromValue?.approval_variant?.map(
											(data, index) => {
												return (
													<option
														value={data.variant_id}
														key={index}>
														{data.variant_name}
													</option>
												);
											}
										)}
									</Select>
								</FormControl>
							</Box>
						</Box>

						<Button
							disabled={isLoading}
							isLoading={isLoading}
							spinner={<BeatLoader size={8} color='white' />}
							type='submit'
							fontSize='1.4rem'
							padding='20px 10px'
							background='var(--chakra-colors-claimzMainGeadientColor)'
							color='white'
							display='flex'
							alignItems='center'
							justifyContent='center'
							borderRadius='50px'
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
							Convert to Employee
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default OnbordingDrawer;
