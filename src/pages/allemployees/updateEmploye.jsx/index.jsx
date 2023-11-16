import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmpDetails from './empdetails';
import Document from './document';
import Personal from './personal';
import KycDetails from './kycdetails';
import BankDetails from './bankdetails';
import LastCompany from './lastcompany';
import { Button, Box, useToast } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const EmployeeUpdate = ({ details, fromValue, userData, msg, setMsg }) => {
	let explodedEmpCode = userData?.data?.emp_code
		? userData?.data?.emp_code.match(/([A-Za-z]+)(\d+)/) ?? []
		: [];
	let navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const FormTitles = [
		'EmpDetails',
		'Personal',
		'BankDetails',
		'KycDetails',
		'Document',
		'LastCompany',
	];
	const [page, setPage] = useState(0);
	const [costCenter, setCostCenter] = useState();
	const [empCode, setEmpCode] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		id: details,
		employee_code: userData?.data?.emp_code,
		grade: userData?.data?.grade_id,
		name: userData?.data?.emp_name,
		department: userData?.data?.department_id,
		birth_date: userData?.data?.birth_date,
		father_name: userData?.data?.father_name,
		permanent_address: userData?.data?.p_address,
		present_address: userData?.data?.present_address,
		mobile_no: userData?.data?.mobile_no,
		mail_id: userData?.data?.email,
		passport_no: userData?.data?.passport_no,
		blood_group: userData?.data?.blood_group,
		place_of_posting: userData?.data?.place_of_posting,
		bank_account_no: userData?.bank_details?.account_no,
		bank_name: userData?.bank_details?.bank_name,
		branch: userData?.bank_details?.branch,
		ifsc_code: userData?.bank_details?.ifsc_code,
		primary_reporting: userData?.reporting_data?.primary_reporting,
		secondary_reporting: userData?.reporting_data?.secondary_reporting,
		designation: userData?.data?.designation,
		shift_variant: userData?.data?.shift_variant,
		ptax_variant: userData?.data?.ptax_variant,
		gender: userData?.data?.gender,
		aadhar_no: userData?.data?.aadhar_no,
		pan_no: userData?.data?.pan_no,
		emergency_cont_no: userData?.data?.contact_no,
		join_date: userData?.data?.join_date,
		leave_date: userData?.data?.leave_date,
		birth_date: userData?.data?.birth_date,
		place_of_posting: userData?.data?.place_of_posting,
		cost_center_id: '',
		weekoff: userData?.data?.weekoff,
		approver: userData?.data?.approver,
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
		hod: '',
	});

	function toastCall() {
		return toast({
			title: 'Employee Details Updated Sucessfully',
			status: 'success',
			duration: 3000,
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

	function toastCallFaild() {
		return toast({
			title: 'Employee Updated Failed',
			status: 'error',
			duration: 5000,
			isClosable: true,
		});
	}

	useEffect(() => {
		if (formData?.department > 0) {
			const formDataValue = async () => {
				try {
					const response1 = await fetch(
						`${process.env.REACT_APP_API_URL}/emp-cost-center/${formData?.department}`,
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
			console.log('error');
		}
	}, [formData?.department]);

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
			console.log('empcode');
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
		Object.keys(formData).forEach((key) => {
			fromValues.append(key, formData[key]);
		});
		fromValues.append('employee_code', empCode);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/employee-update`,
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
		<Box className='form_update'>
			<Box className='progressbar' mb='0px'>
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
			<Box
				className='form-container'
				p='15px 0px'
				bg='none'
				boxShadow='none'>
				<Box className='body'>{PageDisplay()}</Box>
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
						mr='20px'
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
						onClick={() => {
							if (page === FormTitles.length - 1) {
								fromDataAdd();
							} else {
								setPage((currPage) => currPage + 1);
							}
						}}>
						{page === FormTitles.length - 1 ? 'Update' : 'Next'}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default EmployeeUpdate;
