import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Select,
	Text,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import StepProgressBar from './StepProgressBa.jsx';
import userLogo from '../../../assets/images/user.jpg';

const ApprovalVeriantform = ({ approval }) => {
	const token = localStorage.getItem('token');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	let counter = approval?.length - 1;
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [selectBoxes, setSelectBoxes] = useState([1]);
	const [empList, setEmpList] = useState();
	const [employeeId, setEmployeeId] = useState();
	const [userData, setUserData] = useState([]);
	const [variantName, setVariantName] = useState();
	const steps = ['Step 1', 'Step 2', 'Step 3'];
	const [variants, setVariants] = useState({
		variants: [],
	});

	const defaultImageUrl = userLogo;

	const handleImageError = (event) => {
		event.target.src = defaultImageUrl;
	};

	function toastCall() {
		return toast({
			title: 'All Approval Stage Added Already',
			status: 'warning',
			duration: 3000,
			isClosable: true,
		});
	}
	function toastCallSucess() {
		return toast({
			title: 'All Approval Stage Uploaded Already',
			status: 'warning',
			duration: 3000,
			isClosable: true,
		});
	}

	const addDynamicSelect = (e) => {
		if (selectBoxes.length < counter) {
			e.preventDefault();
			setSelectBoxes((prevSelectBoxes) => [
				...prevSelectBoxes,
				prevSelectBoxes.length + 1,
			]);
		} else {
			toastCall();
		}
	};

	useEffect(() => {
		const empList = async () => {
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setEmpList(data1.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		empList();
	}, []);

	const handelChangeVariants = async (e) => {
		if (e.target.value == employeeId) {
			console.log('Please select deffered employee!');
		} else {
			setEmployeeId(e.target.value);
		}
	};

	const userDetails = async (e, index) => {
		e.preventDefault();
		setCurrentStep((prevStep) => prevStep + 1);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/emp-details/${employeeId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				const updatedUserData = [...userData, data.data];
				setUserData(updatedUserData);
				addDynamicSelect(e);

				// approvalState;
				let tmpGetStatus = approval[index].given_status;
				let tempStatusMaker =
					approval[approval.length - 1].given_status;
				let tempTypeName = approval[index].type_name;
				let prevVariantData = JSON.parse(JSON.stringify(variants));

				if (prevVariantData.variants[index] == undefined) {
					let tempVariantUser = {
						vm_id: '',
						user_id: employeeId,
						type_name: tempTypeName,
						get_status: tmpGetStatus,
						status_maker: tempStatusMaker,
						name: data.data.emp_name,
						img: data.data.profile_photo,
					};
					if (index > 0) {
						prevVariantData['variants'][index - 1]['status_maker'] =
							tmpGetStatus;
					}
					prevVariantData.variants[index] = tempVariantUser;
				} else {
					prevVariantData.variants[index].user_id = employeeId;
					prevVariantData.variants[index].name = data.data.emp_name;
					prevVariantData.variants[index].img =
						data.data.profile_photo;
				}
				setVariants(prevVariantData);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const newArray = [variants?.variants[variants?.variants?.length - 1]];

	const approvalSubmit = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('variant_name', variantName);
		formData.append('variants', JSON.stringify(variants.variants));

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/claim-approval-save`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				toastCallSucess();
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
			<Tooltip hasArrow label='Add New Approval veriant' fontSize='1rem'>
				<Button
					border='2px solid var(--chakra-colors-claimzBorderColor)'
					borderRadius='15px'
					height='45px'
					padding='0px 20px'
					type='button'
					icon='pi pi-file-excel'
					severity='success'
					background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
					backgroundClip='text'
					onClick={onOpen}>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontSize='1.6rem'
						fontWeight='700'>
						Add New
					</Text>
				</Button>
			</Tooltip>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent minW='60%' height='auto' p='20px'>
					<ModalCloseButton mt='7px' />
					<ModalBody p='0px'>
						<form
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
							}}
							onSubmit={approvalSubmit}>
							<Box w='100%'>
								<StepProgressBar
									steps={steps}
									approval={approval}
									variants={variants}
									currentStep={currentStep}
								/>
								<Box>
									<FormControl>
										<FormLabel>Variant Name</FormLabel>
										<Input
											type='text'
											placeholder='Enter Name'
											required
											onChange={(e) =>
												setVariantName(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Box
									display='flex'
									justifyContent='space-between'
									mt='20px'>
									<Box
										width='42%'
										display='flex'
										alignItems='flex-start'
										flexDirection='column'>
										{selectBoxes.map((_, index) => (
											<Box
												key={index}
												display='flex'
												alignItems='flex-start'
												height='120px'
												width='90%'>
												<FormControl>
													<FormLabel>
														Select Approval
													</FormLabel>
													<Select
														width='95%'
														mr='10px'
														placeholder='Select Approval'
														onChange={
															handelChangeVariants
														}>
														{empList?.map(
															(data, index) => {
																return (
																	<option
																		value={
																			data.id
																		}
																		key={
																			index
																		}>
																		{
																			data.emp_name
																		}
																	</option>
																);
															}
														)}
													</Select>
												</FormControl>
												<Button
													bg={
														variants.variants
															?.length === index
															? 'var(--chakra-colors-claimzLightBlueColor)'
															: 'rgb(37 37 37 / 60%)'
													}
													boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
													color='white'
													mr='10px'
													mt='24px'
													p='17px 20px'
													_hover={{
														bgGradient: 'none',
													}}
													_active={{
														bgGradient: 'none',
													}}
													_focus={{
														bgGradient: 'none',
													}}
													onClick={(e) =>
														userDetails(e, index)
													}
													w='10%'>
													Apply
												</Button>
											</Box>
										))}
									</Box>
									<Box
										width='58%'
										display='flex'
										alignItems='flex-start'>
										<div className='timeline'>
											{Object.entries(
												variants?.variants
											)?.map(([key, value]) => (
												<Box mb='35px' key={key}>
													<Text
														fontWeight='600'
														marginBottom='5px'
														color='var(--chakra-colors-claimzTextBlueLightColor)'>
														{value.type_name}
													</Text>
													<Box
														className='timeline__event animated fadeInUp timeline__event--type2'
														key={key}>
														<Box className='timeline__event__icon'>
															<Image
																src={userLogo}
																onError={
																	handleImageError
																}
																h='50px'
																w='50px'
																mr='10px'
															/>
														</Box>
														<Box
															className='timeline__event__content'
															display='flex'
															alignItems='center'
															w='100%'>
															<Box className='timeline__event__description'>
																<Text
																	fontSize='1.4rem'
																	fontWeight='600'
																	color='var(--chakra-colors-claimzTextBlueLightColor)'>
																	{
																		value?.name
																	}
																</Text>
															</Box>
														</Box>
													</Box>
												</Box>
											))}
											{newArray?.map((index) => {
												return (
													<>
														<Box
															className='timeline__event animated fadeInUp timeline__event--type2 last_child'
															key={index}
															h='65px'
															mt='10px'
															mb='20px'>
															<Box
																className='timeline__event__content'
																display='flex'
																p='0px'
																alignItems='center'
																w='100%'>
																<Box className='timeline__event__description'>
																	<Text
																		fontSize='1.4rem'
																		fontWeight='600'
																		color='var(--chakra-colors-claimzTextBlueLightColor)'>
																		payment
																		process
																	</Text>
																</Box>
															</Box>
														</Box>
													</>
												);
											})}
										</div>
									</Box>
								</Box>
							</Box>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
								bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='10px'
								p='20px 30px'
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
								type='submit'>
								Submit
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ApprovalVeriantform;
