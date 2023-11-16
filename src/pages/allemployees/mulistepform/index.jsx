import React, { useState, useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import EmpDetails from './empdetails';
import Document from './document';
import Personal from './personal';
import KycDetails from './kycdetails';
import BankDetails from './bankdetails';
import LastCompany from './lastcompany';
import { Button, Box, Image, useToast } from '@chakra-ui/react';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const MultiStepForm = () => {
	let navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [fromValue, setFromValue] = useState([]);
	const FormTitles = [
		'EmpDetails',
		'Personal',
		'BankDetails',
		'KycDetails',
		'Document',
		'LastCompany',
	];
	const [page, setPage] = useState(0);
	const [msg, setMsg] = useState();
	const [loader, setLoader] = useState(false);
	const [costCenter, setCostCenter] = useState();
	const [empCode, setEmpCode] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		employee_code_prefix: '',
		grade: '',
		name: '',
		department: '',
		birth_date: '',
		father_name: '',
		permanent_address: '',
		present_address: '',
		mobile_no: '',
		mail_id: '',
		passport_no: '',
		blood_group: '',
		place_of_posting: '',
		bank_account_no: '',
		bank_name: '',
		branch: '',
		ifsc_code: '',
		primary_reporting: '',
		secondary_reporting: '',
		designation: '',
		unique_id: '9999',
		gender: '',
		aadhar_no: '',
		pan_no: '',
		emergency_cont_no: '',
		join_date: '',
		leave_date: '',
		birth_date: '',
		place_of_posting: '',
		cost_center_id: '',
		primary_reporting: '',
		weekoff: '',
		approver: '',
		shift_variant: '',
		ptax_variant: '',
		aadhar_front: '',
		aadhar_back: '',
		voter_front: '',
		voter_back: '',
		pan_front: '',
		pan_back: '',
		passport_front: '',
		passport_back: '',
		ten: '',
		twelve: '',
		graduate: '',
		post_graduate: '',
		passbook: '',
		offer_letter: '',
		resignation: '',
		appointment: '',
		release: '',
		payslip: '',
		hod: '0',
	});

	function toastCall() {
		return toast({
			title: 'Employee Creation Sucessfully',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	}
	function toastCallFaild() {
		return toast({
			title: 'Employee Creation Failed',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}
	function toastCallError(error) {
		return toast({
			title: error,
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-form-view`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setFromValue(data1);
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
		} else {
			console.log('department id');
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
		} else {
			console.log('error');
		}
	}, [formData?.employee_code_prefix]);

	const PageDisplay = () => {
		if (page === 0) {
			return (
				<EmpDetails
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
					costCenter={costCenter}
					empCode={empCode}
				/>
			);
		} else if (page === 1) {
			return (
				<Personal
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
				/>
			);
		} else if (page === 2) {
			return (
				<BankDetails
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
				/>
			);
		} else if (page === 3) {
			return (
				<KycDetails
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
				/>
			);
		} else if (page === 4) {
			return (
				<Document
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
				/>
			);
		} else {
			return (
				<LastCompany
					formData={formData}
					setFormData={setFormData}
					fromValue={fromValue}
				/>
			);
		}
	};

	const fromDataAdd = async () => {
		const fromValues = new FormData();
		// Convert the object to FormData
		Object.keys(formData).forEach((key) => {
			fromValues.append(key, formData[key]);
		});
		fromValues.append('employee_code', empCode);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/employee-post`,
				{
					method: 'POST',
					body: fromValues,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				toastCall();
				setIsLoading(false);
				navigate('/manage-employee/all-employee');
			} else {
				const errorResponse = await response.json();
				const errorMessages = Object.values(errorResponse).flat();
				errorMessages.forEach((errorMessage) => {
					toastCallError(errorMessage);
				});
				setIsLoading(false);
			}
		} catch (error) {
			toastCallFaild();
			setIsLoading(false);
		}
	};

	return (
		<Box
			width='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			{loader ? (
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					height='calc(100vh - 216px)'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box className='form_create_new_employee'>
					<Box className='progressbar'>
						<Box
							style={{
								width:
									page === 0
										? '16%'
										: page == 1
										? '24%'
										: page == 2
										? '32%'
										: page == 3
										? '50%'
										: page == 4
										? '66.6%'
										: '100%',
							}}></Box>
					</Box>
					<Box className='form-container'>
						<Box className='body' minH='470px'>
							{PageDisplay()}
						</Box>
						<Box className='footer'>
							<Button
								isDisabled={page === 0 ? true : false}
								mr='20px'
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
								disabled={page == 0}
								onClick={() => {
									setPage((currPage) => currPage - 1);
								}}>
								Prev
							</Button>
							<Button
								disabled={isLoading}
								isLoading={isLoading}
								spinner={<BeatLoader size={8} color='white' />}
								mr='20px'
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
								onClick={() => {
									if (page === FormTitles.length - 1) {
										fromDataAdd();
									} else {
										setPage((currPage) => currPage + 1);
									}
								}}>
								{page === FormTitles.length - 1
									? 'Submit'
									: 'Next'}
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default MultiStepForm;
