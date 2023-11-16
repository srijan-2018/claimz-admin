import React, { useState } from 'react';
import {
	Progress,
	Box,
	ButtonGroup,
	Button,
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const CompanyProfile = ({ companyData }) => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [msg, setMsg] = useState('');
	const [progress, setProgress] = useState(8.33);
	const [editable, setEditable] = useState(false);
	const [companyName, setCompanyName] = useState(companyData.company_name);
	const [companyAddress, setCompanyAddress] = useState(
		companyData.company_address
	);
	const [companyEmail, setCompanyEmail] = useState(companyData.company_email);
	const [companyPhone, setCompanyPhone] = useState(companyData.company_phone);
	const [companyBrand, setCompanyBrand] = useState(companyData.brand);
	const [companyWebsite, setCompanyWebsite] = useState(companyData.website);
	const [companyPan, setCompanyPan] = useState(companyData.company_pan);
	const [companyGstn, setCompanyGstn] = useState(companyData.company_gstn);
	const [companyId, setCompanyId] = useState(companyData.id);
	const [companyLogo, setCompanyLogo] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const EditCompanyProfile = () => {
		setEditable(true);
	};

	function toastCall() {
		return toast({
			title: 'Company Profile Updated Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const UpdateCompanyProfile = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('company_name', companyName);
		formData.append('company_address', companyAddress);
		formData.append('company_email', companyEmail);
		formData.append('company_phone', companyPhone);
		formData.append('company_brand', companyBrand);
		formData.append('company_website', companyWebsite);
		formData.append('company_pan', companyPan);
		formData.append('company_gstn', companyGstn);
		formData.append('company_id', companyId);
		formData.append('image', companyLogo);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/company-update`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg('Updated successfull');
				toastCall();
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
			<Box>
				<Box position='relative'>
					<Progress
						colorScheme='green'
						position='relative'
						hasStripe
						value={progress}
						mb='50px'
						mt='15px'
						mx='5%'
						isAnimated></Progress>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='8%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							1
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Company Profile
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='22%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							2
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Employee Code
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='36%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							3
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Department Settings
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='54%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							4
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Budget List
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='67%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							5
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Grade Settings
						</Box>
					</Box>

					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						position='absolute'
						top='-12px'
						left='80%'>
						<Box
							bg='claimzIconGreentColor'
							w='30px'
							h='30px'
							color='white'
							borderRadius='50px'
							display='flex'
							justifyContent='center'
							alignItems='center'>
							6
						</Box>
						<Box
							as='span'
							color='claimzTextBlackColor'
							fontWeight='600'
							fontSize='1.5rem'>
							Designation Settings
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				margin='65px auto 0'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>Company Profile</Heading>
			</Box>

			<form onSubmit={UpdateCompanyProfile}>
				<Box height='calc(100vh - 390px)'>
					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-between'
						mb='20px'
						mt='40px'>
						<FormControl w='31%'>
							<FormLabel>
								Company Name{' '}
								<Box as='span' color='orange'>
									*
								</Box>
							</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='text'
								placeholder='Company Name'
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
							/>
						</FormControl>

						<FormControl w='31%'>
							<FormLabel>
								Company Address{' '}
								<Box as='span' color='orange'>
									*
								</Box>
							</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='text'
								placeholder='Company Address '
								value={companyAddress}
								onChange={(e) =>
									setCompanyAddress(e.target.value)
								}
							/>
						</FormControl>

						<FormControl w='31%'>
							<FormLabel>Company Email</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='email'
								placeholder='Company Email'
								value={companyEmail}
								onChange={(e) =>
									setCompanyEmail(e.target.value)
								}
							/>
						</FormControl>
					</Box>

					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-between'
						mb='20px'>
						<FormControl w='31%'>
							<FormLabel>Company Phone</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='tel'
								placeholder='Company Phone'
								value={companyPhone}
								onChange={(e) =>
									setCompanyPhone(e.target.value)
								}
							/>
						</FormControl>

						<FormControl
							w='31%'
							sx={{
								'& [type="file"]::-webkit-file-upload-button': {
									bg: '#F3F6FC',
									color: 'inputplaceholderColor',
									border: 'none',
									borderRight: '1px solid',
									borderColor: 'inputStrokeColor',
									borderRadius: '2px 0px 0px 2px',
									fontWeight: '500',
									fontSize: '1.3rem',
									height: '35px',
									lineHeight: '2.2rem',
									padding: '0px 10px',
									marginRight: '15px',
								},
								'& [type="file"]::-webkit-file-upload-button:hover':
									{
										bg: 'dataTableRowBorder',
									},
							}}>
							<FormLabel>Logo</FormLabel>
							<Input
								type='file'
								onChange={(event) =>
									setCompanyLogo(event.target.files[0])
								}
								placeholder='Logo'
								p='0px'
								className={editable ? 'editable' : 'disabled'}
								sx={{
									'::file-selector-button': {
										borderTop: 'none',
										borderLeft: 'none',
										borderBottom: 'none',
										borderRight: '1px solid',
										borderRightColor:
											'var(--chakra-colors-inputStrokeColor);',
										outline: 'none',
										mr: 2,
										p: '12px 14px',
										color: 'var(--chakra-colors-inputplaceholderColor)',
										backgroundColor: '#f3f3f3',
									},
								}}
							/>
						</FormControl>

						<FormControl w='31%'>
							<FormLabel>Company Brand</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='text'
								placeholder='Company Brand'
								value={companyBrand}
								onChange={(e) =>
									setCompanyBrand(e.target.value)
								}
							/>
						</FormControl>
					</Box>

					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-between'
						mb='20px'>
						<FormControl w='31%'>
							<FormLabel>Company Website</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='url'
								placeholder='Company Website'
								value={companyWebsite}
								onChange={(e) =>
									setCompanyWebsite(e.target.value)
								}
							/>
						</FormControl>

						<FormControl w='31%'>
							<FormLabel>Company PAN Number</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='text'
								placeholder='Company PAN Number'
								value={companyPan}
								onChange={(e) => setCompanyPan(e.target.value)}
							/>
						</FormControl>

						<FormControl w='31%'>
							<FormLabel>Company GST</FormLabel>
							<Input
								className={editable ? 'editable' : 'disabled'}
								type='text'
								placeholder='Company GST'
								value={companyGstn}
								onChange={(e) => setCompanyGstn(e.target.value)}
							/>
						</FormControl>
					</Box>
				</Box>

				<ButtonGroup w='100%'>
					<Flex w='100%' justifyContent='space-between'>
						<Box>
							<Button
								mr='20px'
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
								onClick={EditCompanyProfile}>
								Edit
							</Button>
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
								Save Changes
							</Button>
						</Box>

						<Button
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
							onClick={() =>
								navigate(
									'/master-setting/manage-company/employee-code'
								)
							}>
							Next
						</Button>
					</Flex>
				</ButtonGroup>
			</form>
		</>
	);
};

export default CompanyProfile;
