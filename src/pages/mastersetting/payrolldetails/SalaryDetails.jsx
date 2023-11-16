import {
	Box,
	Button,
	Card,
	CardBody,
	Divider,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Heading,
	Checkbox,
	Text,
	Tooltip,
	useToast,
	Radio,
	Stack,
	RadioGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const SalaryDetails = () => {
	const { empid } = useParams();
	const toast = useToast();
	const navigate = useNavigate();
	const [empDetails, setEmpDetails] = useState('');
	const token = localStorage.getItem('token');
	const userDetails = localStorage.getItem('user');
	const [user] = useState(JSON.parse(window.atob(userDetails)));
	const [sucess, setSucess] = useState(false);
	const [employeeName, setEmployeeName] = useState('');
	const [employeeCode, setEmployeeCode] = useState('');
	const [dateOfJoining, setDateOfJoining] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [PFNumber, setPFNumber] = useState('');
	const [UANNumber, setUANNumber] = useState('');
	const [ESINumber, setESINumber] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [companyAddress, setCompanyAddress] = useState('');
	const [companyLogo, setCompanyLogo] = useState('');
	const [CTC, setCTC] = useState();
	const basic = CTC / 2;
	const [deductionformData, setDeductionformData] = useState('');
	const [perquisitsComponents, setPerquisitsComponents] = useState([]);
	const [profitComponents, setProfitComponents] = useState([]);
	const [earningComponents, setEarnignComponents] = useState([]);
	const [deductionComponents, setDeductionComponents] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [pTaxValue, setPTaxValue] = useState('');
	const [esicValue, setEsicValue] = useState('');
	const [capping, setCapping] = useState('2');
	const [empPfValue, setEmpPfValue] = useState({});
	const [empTdsValue, setEmpTdsValue] = useState({});
	const [empEsiValue, setEmpEsiValue] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [updatedCtc, setUpdatedCtc] = useState();

	function toastCall() {
		return toast({
			title: 'Salary details submited sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	// fetch salary details from api
	useEffect(() => {
		let token = localStorage.getItem('token');

		fetch(`${process.env.REACT_APP_API_URL}/salary-details/${empid}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setEmpDetails(data);
				setEmployeeName(data?.employee?.emp_name);
				setEmployeeCode(data?.employee?.emp_code);
				setDateOfJoining(data?.employee?.join_date);
				setAccountNumber(data?.account_no);
				setPFNumber(data?.salary_details?.pf_number);
				setUANNumber(data?.salary_details?.uan_number);
				setESINumber(data?.salary_details?.esi_number);
				separateTheComponents(data);
				separateThedeductionComponents(data);
				separateThePerquisitsComponents(data);
				separateTheProfitComponents(data);
				setCTC(data?.salary_details?.monthly_ctc);
				setCompanyName(data?.salary_details?.tmp_comp_name);
				setCompanyAddress(data?.salary_details?.tmp_comp_address);
			})
			.catch((error) => console.error(error));

		// stop | scroll to change the value
		const handleScroll = (e) => {
			e.preventDefault();
		};

		const inputNumbers = document.querySelectorAll('.handleScroll');
		inputNumbers.forEach((input) => {
			input?.addEventListener('wheel', handleScroll);
		});

		return () => {
			inputNumbers.forEach((input) => {
				input?.removeEventListener('wheel', handleScroll);
			});
		};
	}, []);

	useEffect(() => {
		const cappingRules = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/rules`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		cappingRules();
	}, []);

	const separateTheComponents = (data) => {
		let tempEarning = {};

		data.earning_components.map((row) => {
			tempEarning[row.salary_component_id] = row;
			tempEarning[row.salary_component_id]['input'] = 0;
			tempEarning[row.salary_component_id]['inputPercentage'] =
				row.percentage;
		});
		setEarnignComponents(tempEarning);
	};

	const separateThedeductionComponents = (data) => {
		let tempDeduction = {};
		data.deduction_components.map((row) => {
			tempDeduction[row.salary_component_id] = row;
			tempDeduction[row.salary_component_id]['input'] = 0;
			tempDeduction[row.salary_component_id]['inputPercentage'] =
				row.percentage;
		});
		setDeductionComponents(tempDeduction);
	};

	const separateThePerquisitsComponents = (data) => {
		let tempDeduction = {};
		data.perquisits_components.map((row) => {
			tempDeduction[row.salary_component_id] = row;
			tempDeduction[row.salary_component_id]['input'] = 0;
			tempDeduction[row.salary_component_id]['inputPercentage'] =
				row.percentage;
		});
		setPerquisitsComponents(tempDeduction);
	};

	const separateTheProfitComponents = (data) => {
		let tempDeduction = {};
		data.profit_components.map((row) => {
			tempDeduction[row.salary_component_id] = row;
			tempDeduction[row.salary_component_id]['input'] = 0;
			tempDeduction[row.salary_component_id]['inputPercentage'] =
				row.percentage;
		});
		setProfitComponents(tempDeduction);
	};

	const handleEarningInputChange = (key, e) => {
		console.log(e.target.value, 'e');
		const inputVal = parseFloat(e.target.value);
		const earningComponentsObj = JSON.parse(
			JSON.stringify(earningComponents)
		);
		earningComponentsObj[key].input = inputVal;

		const parentKey = earningComponentsObj[key].percentage_of;
		const parentValue =
			parentKey > 0 ? earningComponentsObj[parentKey].input : CTC;
		earningComponentsObj[key].inputPercentage = (
			(inputVal / parentValue) *
			100
		).toFixed(2);

		let newCTC = 0;
		Object.values(earningComponentsObj).forEach((component) => {
			newCTC += parseFloat(component.input);
		});
		setUpdatedCtc(newCTC);

		const findMyChildrenList = (mykey) => {
			let childrenList = [];
			Object.entries(earningComponentsObj).map(([index, row]) => {
				if (row.percentage_of == mykey) {
					childrenList.push(index);
				}
			});
			return childrenList;
		};
		const updateMyChildrensInput = (key, childrenList) => {
			childrenList.map((childrenKey) => {
				const parentValue = earningComponentsObj[key].input;
				earningComponentsObj[childrenKey].input = (
					(parentValue *
						earningComponentsObj[childrenKey].percentage) /
					100
				).toFixed(2);
				earningComponentsObj[childrenKey].inputPercentage =
					earningComponentsObj[childrenKey].percentage;
				updateMyChildrensInput(
					childrenKey,
					findMyChildrenList(childrenKey)
				);
			});
		};
		updateMyChildrensInput(key, findMyChildrenList(key));
		setEarnignComponents(earningComponentsObj);
	};

	const calculateTheStateEarningValues = (ctc) => {
		const earningComponentsObj = JSON.parse(
			JSON.stringify(earningComponents)
		);
		Object.entries(earningComponentsObj).map(([key, data]) => {
			let principalAmount = ctc;
			if (data.percentage_of > 0) {
				let parentKey = data.percentage_of;
				principalAmount = earningComponentsObj[parentKey]?.input || 0;
			}
			earningComponentsObj[key].input = (
				(principalAmount * data.percentage) /
				100
			).toFixed(2);
			earningComponentsObj[key].inputPercentage = data.percentage;
		});
		setEarnignComponents(earningComponentsObj);
	};

	//handle deduction
	const handleInputChangeDeduction = (key, e) => {
		const inputVal = e.target.value;
		const deductionComponentsObj = JSON.parse(
			JSON.stringify(deductionComponents)
		);
		deductionComponentsObj[key].input = inputVal;
		setDeductionComponents(deductionComponentsObj);
	};

	//handle Perquisits
	const handleInputChangePerquisits = (key, e) => {
		const inputVal = e.target.value;
		const perquisitsComponentsObj = JSON.parse(
			JSON.stringify(perquisitsComponents)
		);
		perquisitsComponentsObj[key].input = inputVal;
		setPerquisitsComponents(perquisitsComponentsObj);
	};

	//handle Profit
	const handleInputChangeProfit = (key, e) => {
		const inputVal = e.target.value;
		const profitComponentsObj = JSON.parse(
			JSON.stringify(profitComponents)
		);
		profitComponentsObj[key].input = inputVal;
		setPerquisitsComponents(profitComponentsObj);
	};

	// CTC calculation
	const handleCTC = (e) => {
		let ctc = e.target.value;
		setCTC(e.target.value);
		calculateTheStateEarningValues(ctc);
	};

	const handleDeleteEarning = (key) => {
		const updatedComponents = { ...earningComponents };
		delete updatedComponents[key];
		setEarnignComponents(updatedComponents);
	};

	const handleDeleteDeduction = (key) => {
		const updatedComponents = { ...deductionComponents };
		delete updatedComponents[key];
		setDeductionComponents(updatedComponents);
	};

	// dynamic calculation earning components
	const EarningDetails = Object.entries(earningComponents).map(
		([key, data]) => {
			let dependOnTxt = 'CTC';
			if (data.percentage_of > 0) {
				let tempDependOn = { ...earningComponents[data.percentage_of] };
				dependOnTxt = tempDependOn.salary_component;
			}

			console.log(earningComponents, 'earningComponents');
			return (
				<FormControl>
					{data.fixed_component_marking === 1 ||
					data.fixed_component_marking === 2 ? (
						<FormLabel>
							{data.salary_component}{' '}
							{data.fixed_component_marking === 1 ? (
								<Tooltip
									hasArrow
									label='This component is mark as besic'
									placement='right-end'>
									<i className='fa-solid fa-circle-info'></i>
								</Tooltip>
							) : (
								<Tooltip
									hasArrow
									label='This component is mark as HRA'
									placement='right-end'>
									<i className='fa-solid fa-circle-info'></i>
								</Tooltip>
							)}
						</FormLabel>
					) : (
						<FormLabel>
							{data.salary_component}{' '}
							<Button
								onClick={() => handleDeleteEarning(key)}
								bg='none'
								_hover={{ bg: 'none' }}
								_active={{ bg: 'none' }}>
								<i className='fa-solid fa-trash'></i>
							</Button>
						</FormLabel>
					)}
					<Input
						type='number'
						placeholder={data.salary_component}
						name={data.salary_component}
						value={data.input}
						className='handleScroll'
						onChange={(e) => handleEarningInputChange(key, e)}
					/>
					<small>{`${dependOnTxt}*${data.percentage}% > ${data.inputPercentage}%`}</small>
				</FormControl>
			);
		}
	);

	const handleCheckboxClickPtax = async () => {
		setIsChecked(!isChecked);
		try {
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/rule-two/${CTC}/${user.id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data = await response1.json();
				setPTaxValue(data.data);
			} else {
				navigate('/login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCheckboxClickPF = async () => {
		setIsChecked(!isChecked);
		try {
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/rule-three/${basic}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data = await response1.json();
				let tempData = {
					'Administrator charges': data['admin'],
					"Employer's contribution for Provident Fund":
						data['employer_contri'],
					"Employee's contribution for Provident Fund":
						data['empolyee_contri'],
				};

				setEmpPfValue(tempData);
			} else {
				navigate('/login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCheckboxClickTDS = async () => {
		setIsChecked(!isChecked);
		if (isChecked) {
			setEmpTdsValue({
				value: '',
			});
		} else {
			setEmpTdsValue({
				value: 0,
			});
		}
	};

	const handleCheckboxClickESIC = async () => {
		setIsChecked(!isChecked);
		try {
			const response1 = await fetch(
				`${process.env.REACT_APP_API_URL}/rule-one/${CTC}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response1.ok) {
				const data = await response1.json();
				setEsicValue(data);
				let tempData = {
					"Employer's contribution for Employees' State Insurance Corporation":
						data['employer_contri'],
					"Employee's contribution for Employees' State Insurance Corporation":
						data['empolyee_contri'],
				};
				setEmpEsiValue(tempData);
			} else {
				navigate('/login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const salaryDetailsSubmit = async (e) => {
		e.preventDefault();
		let componentData = [];
		Object.entries(earningComponents).map(([key, value]) => {
			componentData.push({
				component_id: value.salary_component_id,
				percentage: value.percentage,
				percentage_of: parseFloat(value.percentage_of),
				value_type: 0,
				amount: parseFloat(value.input),
			});
		});
		Object.entries(deductionComponents).map(([key, value]) => {
			componentData.push({
				component_id: value.salary_component_id,
				percentage: value.percentage,
				percentage_of: parseFloat(value.percentage_of),
				value_type: 0,
				amount: parseFloat(value.input),
			});
		});
		Object.entries(perquisitsComponents).map(([key, value]) => {
			componentData.push({
				component_id: value.salary_component_id,
				percentage: value.percentage,
				percentage_of: parseFloat(value.percentage_of),
				value_type: 0,
				amount: parseFloat(value.input),
			});
		});
		Object.entries(profitComponents).map(([key, value]) => {
			componentData.push({
				component_id: value.salary_component_id,
				percentage: value.percentage,
				percentage_of: parseFloat(value.percentage_of),
				value_type: 0,
				amount: parseFloat(value.input),
			});
		});

		let formData = new FormData();
		formData.append('id', empid);
		formData.append('components', JSON.stringify(componentData));
		formData.append('name', employeeName);
		formData.append('pf_number', PFNumber);
		formData.append('uan_number', UANNumber);
		formData.append('esi_number', ESINumber);
		formData.append('tmp_comp_name', companyName);
		formData.append('tmp_comp_address', companyAddress);
		formData.append('tmp_comp_logo', companyLogo);
		formData.append('monthly_ctc', CTC);
		formData.append('pf_capping', capping);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/salary-details-submit`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setSucess(!sucess);
				toastCall();
				setIsLoading(false);
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	const filteredEmployeeOther = Object.fromEntries(
		Object.entries(deductionComponents).filter(
			([key, value]) => value.rule_id === 0
		)
	);
	const filteredEmployeeEsi = Object.fromEntries(
		Object.entries(deductionComponents).filter(
			([key, value]) => value.rule_id === 1
		)
	);
	const filteredEmployeePtax = Object.fromEntries(
		Object.entries(deductionComponents).filter(
			([key, value]) => value.rule_id === 2
		)
	);
	const filteredEmployeePf = Object.fromEntries(
		Object.entries(deductionComponents).filter(
			([key, value]) => value.rule_id === 3
		)
	);
	const filteredTds = Object.fromEntries(
		Object.entries(deductionComponents).filter(
			([key, value]) => value.rule_id === 4
		)
	);
	const filterMarkcomponent = Object.fromEntries(
		Object.entries(earningComponents).filter(
			([key, value]) => value.input > 15000
		)
	);
	const filterBasicComponent = Object.fromEntries(
		Object.entries(earningComponents).filter(
			([key, value]) => value.fixed_component_marking === 1
		)
	);
	const handleDeleteObjects = (ruleId) => {
		const newData = { ...deductionComponents };
		Object.keys(newData).forEach((key) => {
			if (newData[key].rule_id === ruleId) {
				delete newData[key];
			}
		});
		setDeductionComponents(newData);
	};

	return (
		<Card>
			<CardBody width='100%'>
				<Box>
					<Box>
						<Box
							width='100%'
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							mb='20px'>
							<Heading>Add Salary Details :</Heading>
							<Link to='/master-setting/payroll-details'>
								<Button
									bg='white'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px'
									fontSize='1.6rem'
									color='var(--chakra-colors-claimzTextBlueColor)'
									type='submit'
									_hover={{
										bg: 'white',
									}}
									_active={{
										bg: 'white',
									}}
									_focus={{
										bg: 'white',
									}}>
									<i className='fa-solid fa-backward'></i>{' '}
									<Box ml='5px'>Payroll Details</Box>
								</Button>
							</Link>
						</Box>
						<Grid templateColumns='repeat(3, 1fr)' gap={6}>
							<FormControl>
								<FormLabel>Employee Name</FormLabel>
								<Input
									type='text'
									placeholder='Employee Name'
									value={employeeName}
									onChange={(e) =>
										setEmployeeName(e.target.value)
									}
									readOnly
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Employee Code</FormLabel>
								<Input
									type='text'
									placeholder='Employee Code'
									value={employeeCode}
									onChange={(e) =>
										setEmployeeCode(e.target.value)
									}
									readOnly
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Date of Joining</FormLabel>
								<Input
									type='date'
									placeholder='Date of Joining'
									value={dateOfJoining}
									onChange={(e) =>
										setDateOfJoining(e.target.value)
									}
									readOnly
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Account Number</FormLabel>
								<Input
									type='text'
									placeholder='Account Number'
									value={accountNumber}
									onChange={(e) =>
										setAccountNumber(e.target.value)
									}
									readOnly
								/>
							</FormControl>
							<FormControl>
								<FormLabel>PF A/C Number</FormLabel>
								<Input
									type='text'
									placeholder='PF A/C Number'
									value={PFNumber}
									onChange={(e) =>
										setPFNumber(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>UAN Number</FormLabel>
								<Input
									type='text'
									placeholder='UAN Number'
									value={UANNumber}
									onChange={(e) =>
										setUANNumber(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>ESI Number</FormLabel>
								<Input
									type='text'
									placeholder='ESI Number'
									value={ESINumber}
									onChange={(e) =>
										setESINumber(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Company Name</FormLabel>
								<Input
									type='text'
									placeholder='Company Name'
									value={companyName}
									onChange={(e) =>
										setCompanyName(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Company Address</FormLabel>
								<Input
									type='text'
									placeholder='Company Address'
									value={companyAddress}
									onChange={(e) =>
										setCompanyAddress(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Company Logo</FormLabel>
								<Input
									type='file'
									placeholder='Logo'
									p='0px'
									onChange={(e) =>
										setCompanyLogo(e.target.files[0])
									}
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
											lineHeight: '12px',
										},
									}}
								/>
							</FormControl>
							<Divider orientation='vertical' />
							<Divider orientation='vertical' />
							<FormControl>
								<FormLabel
									fontSize='1.8rem !important'
									fontWeight='600'
									color='var(--chakra-colors-claimzTextBlueColor)'>
									Monthly CTC :
								</FormLabel>
								<Input
									type='number'
									placeholder='Enter Monthly CTC'
									className='handleScroll'
									value={CTC}
									onChange={handleCTC}
								/>
							</FormControl>
							{updatedCtc > 1 && (
								<FormControl>
									<FormLabel
										fontSize='1.8rem !important'
										fontWeight='600'
										color='var(--chakra-colors-claimzTextBlueColor)'>
										Updated Monthly CTC :
									</FormLabel>
									<Input
										type='number'
										className='handleScroll'
										value={updatedCtc}
										readOnly
									/>
								</FormControl>
							)}
							{/* <p>Total: <span>{CTC - totalEarningSum.toFixed(2)}</span></p> */}
							{Object.keys(filterMarkcomponent).length >= 1 && (
								<Box
									p='5px 15px'
									borderRadius='15px'
									boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
									<FormControl>
										<FormLabel>
											Provident Fund Capping :
										</FormLabel>
										<RadioGroup
											onChange={setCapping}
											value={capping}>
											<Stack direction='row' gap='20px'>
												<Radio value='1' size='lg'>
													<Text
														fontWeight='600'
														color='claimzTextBlueLightColor'>
														15000
													</Text>
												</Radio>
												<Radio value='2' size='lg'>
													<Text
														fontWeight='600'
														color='claimzTextBlueLightColor'>
														{
															filterBasicComponent[
																Object.keys(
																	filterBasicComponent
																)
															].input
														}
													</Text>
												</Radio>
												<Radio value='0' size='lg'>
													<Text
														fontWeight='600'
														color='claimzTextBlueLightColor'>
														0
													</Text>
												</Radio>
											</Stack>
										</RadioGroup>
									</FormControl>
								</Box>
							)}
						</Grid>
					</Box>

					<Box>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							my='30px'>
							<Heading>Earning :</Heading>
						</Box>
						<Grid templateColumns='repeat(4, 1fr)' gap={6}>
							{EarningDetails}
						</Grid>
					</Box>

					<Box>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							my='30px'>
							<Heading>Deductions :</Heading>
						</Box>

						<Box display='flex' gap='1%'>
							{Object.keys(filteredEmployeeEsi).length > 0 ? (
								<Box
									boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
									w='32%'
									p='15px'
									borderRadius='5px'>
									<Box
										display='flex'
										gap='10px'
										alignItems='center'
										mb='15px'
										color='#083d6acc !important'>
										<i className='fa-solid fa-circle-info'></i>
										<Checkbox
											size='lg'
											type='checkbox'
											checked={isChecked}
											onChange={handleCheckboxClickESIC}>
											<Text fontWeight='600'>
												ESIC
												<Button
													onClick={() =>
														handleDeleteObjects(1)
													}
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											</Text>
										</Checkbox>
										<Box
											fontSize='1.4rem'
											color='red'
											fontWeight='600'>
											{esicValue?.data}
										</Box>
									</Box>

									{Object.entries(filteredEmployeeEsi).map(
										([key, value]) => (
											<Box key={key}>
												<FormControl mb='15px'>
													<FormLabel>
														{
															value?.salary_component
														}{' '}
													</FormLabel>
													<Input
														type='number'
														placeholder={
															value?.salary_component
														}
														name={
															value?.salary_component
														}
														value={
															empEsiValue[
																value
																	?.salary_component
															]
														}
														onChange={
															handleInputChangeDeduction
														}
														readOnly
													/>
												</FormControl>
											</Box>
										)
									)}
								</Box>
							) : (
								''
							)}
							{Object.keys(filteredEmployeePtax).length > 0 ? (
								<Box
									boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
									w='32%'
									p='15px'
									borderRadius='5px'>
									<Box
										display='flex'
										gap='10px'
										alignItems='center'
										mb='15px'
										color='#083d6acc !important'>
										<i className='fa-solid fa-circle-info'></i>
										<Checkbox
											size='lg'
											type='checkbox'
											checked={isChecked}
											onChange={handleCheckboxClickPtax}>
											<Text fontWeight='600'>
												PTAX{' '}
												<Button
													onClick={() =>
														handleDeleteObjects(2)
													}
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											</Text>
										</Checkbox>
									</Box>
									{Object.entries(filteredEmployeePtax).map(
										([key, value]) => (
											<Box key={key}>
												<FormControl mb='15px'>
													<FormLabel>
														{
															value?.salary_component
														}{' '}
													</FormLabel>
													<Input
														type='number'
														placeholder={
															value?.salary_component
														}
														name={
															value?.salary_component
														}
														value={pTaxValue}
														onChange={
															handleInputChangeDeduction
														}
														readOnly
													/>
												</FormControl>
											</Box>
										)
									)}
								</Box>
							) : (
								''
							)}
							{Object.keys(filteredEmployeePf).length > 0 ? (
								<Box
									boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
									w='32%'
									p='15px'
									borderRadius='5px'>
									<Box
										display='flex'
										gap='10px'
										alignItems='center'
										mb='15px'
										color='#083d6acc !important'>
										<i className='fa-solid fa-circle-info'></i>
										<Checkbox
											size='lg'
											type='checkbox'
											checked={isChecked}
											onChange={handleCheckboxClickPF}>
											<Text fontWeight='600'>
												PF{' '}
												<Button
													onClick={() =>
														handleDeleteObjects(3)
													}
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											</Text>
										</Checkbox>
									</Box>

									{Object.entries(filteredEmployeePf).map(
										([key, value]) => (
											<Box key={key}>
												<FormControl mb='15px'>
													<FormLabel>
														{
															value?.salary_component
														}{' '}
													</FormLabel>
													<Input
														type='number'
														placeholder={
															value?.salary_component
														}
														name={
															value?.salary_component
														}
														value={
															empPfValue[
																value
																	?.salary_component
															]
														}
														onChange={
															handleInputChangeDeduction
														}
														readOnly
													/>
												</FormControl>
											</Box>
										)
									)}
								</Box>
							) : (
								''
							)}
							{Object.keys(filteredTds).length > 0 ? (
								<Box
									boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
									w='32%'
									p='15px'
									borderRadius='5px'>
									<Box
										display='flex'
										gap='10px'
										alignItems='center'
										mb='15px'
										color='#083d6acc !important'>
										<i className='fa-solid fa-circle-info'></i>
										<Checkbox
											size='lg'
											type='checkbox'
											checked={isChecked}
											onChange={handleCheckboxClickTDS}>
											<Text fontWeight='600'>
												TDS
												<Button
													onClick={() =>
														handleDeleteObjects(4)
													}
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											</Text>
										</Checkbox>
									</Box>

									{Object.entries(filteredTds).map(
										([key, value]) => (
											<Box key={key}>
												<FormControl mb='15px'>
													<FormLabel>
														{
															value?.salary_component
														}{' '}
													</FormLabel>
													<Input
														type='number'
														placeholder={
															value?.salary_component
														}
														name={
															value?.salary_component
														}
														value={
															empTdsValue.value
														}
														onChange={
															handleInputChangeDeduction
														}
														readOnly
													/>
												</FormControl>
											</Box>
										)
									)}
								</Box>
							) : (
								''
							)}
						</Box>
						<Grid
							templateColumns='repeat(3, 1fr)'
							gap={6}
							boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
							p='15px'
							mt='24px'
							borderRadius='5px'>
							{Object.entries(filteredEmployeeOther).map(
								([key, value]) => (
									<Box key={key}>
										<FormControl>
											<FormLabel>
												{value?.salary_component}{' '}
												<Button
													onClick={() =>
														handleDeleteDeduction(
															key
														)
													}
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											</FormLabel>
											<Input
												type='number'
												placeholder={
													value?.salary_component
												}
												name={value?.salary_component}
												value={
													deductionformData.data
														?.salary_component
												}
												onChange={(e) =>
													handleInputChangeDeduction(
														value?.salary_component_id,
														e
													)
												}
											/>
										</FormControl>
									</Box>
								)
							)}
						</Grid>
					</Box>

					<Box>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							my='30px'>
							<Heading> Perquisite :</Heading>
						</Box>
						<Grid templateColumns='repeat(3, 1fr)' gap={6}>
							{empDetails?.perquisits_components?.map(
								(data, index) => (
									<Box key={index}>
										<FormControl>
											<FormLabel>
												{data?.salary_component}
											</FormLabel>
											<Input
												type='number'
												placeholder={
													data?.salary_component
												}
												name={data?.salary_component}
												value={
													deductionformData.data
														?.salary_component
												}
												onChange={(e) =>
													handleInputChangePerquisits(
														data.salary_component_id,
														e
													)
												}
											/>
										</FormControl>
									</Box>
								)
							)}
						</Grid>
					</Box>

					<Box>
						<Box
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'
							my='30px'>
							<Heading> Profit :</Heading>
						</Box>
						<Grid templateColumns='repeat(3, 1fr)' gap={6}>
							{empDetails?.profit_components?.map(
								(data, index) => (
									<FormControl key={index}>
										<FormLabel>
											{data?.salary_component}
										</FormLabel>
										<Input
											type='number'
											placeholder={data?.salary_component}
											name={data?.salary_component}
											value={
												deductionformData.data
													?.salary_component
											}
											onChange={(e) =>
												handleInputChangeProfit(
													data.salary_component_id,
													e
												)
											}
										/>
									</FormControl>
								)
							)}
						</Grid>
					</Box>
				</Box>
				<Box width='100%' display='flex' justifyContent='flex-end'>
					<Button
						disabled={isLoading}
						isLoading={isLoading}
						spinner={<BeatLoader size={8} color='white' />}
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px 15px'
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
						ml='15px'
						my='15px'
						onClick={salaryDetailsSubmit}>
						Submit
					</Button>
				</Box>
			</CardBody>
		</Card>
	);
};

export default SalaryDetails;
