import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Heading,
	Select,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const AddDepartment = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [inputs, setInputs] = useState(['']);
	const [department, setDepartment] = useState('');
	const [hod, setHod] = useState();
	const [departmentList, setDepartmentList] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Department Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const addDepartment = async () => {
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
					setDepartmentList(data1.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		addDepartment();
	}, []);

	function handleChange(index, event) {
		const values = [...inputs];
		values[index] = event.target.value;
		setInputs(values);
	}

	function handleAddInput() {
		const values = [...inputs];
		values.push('');
		setInputs(values);
	}

	function handleRemoveInput(index) {
		const values = [...inputs];
		values.splice(index, 1);
		setInputs(values);
	}

	const departmentAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('department_name', department);
		formData.append('hod', hod);
		formData.append('cost_center', `["${inputs.join('","')}"]`);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/department-post`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				setMsg(!msg);
				setDepartment(' ');
				setHod(' ');
				toastCall();
				setIsLoading(false);
			} else {
				navigate('/login');
				setIsLoading(false);
			}
		} catch (error) {
			navigate('/login');
			setIsLoading(false);
		}
	};

	return (
		<Box>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				margin='0 auto'
				bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
				boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
				color='white'
				padding='10px 15px'>
				<Heading>Add Department</Heading>
				<Link to='/master-setting/manage-company/department-settings'>
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
						<Box ml='5px'>Department Setting</Box>
					</Button>
				</Link>
			</Box>

			<Box display='flex' justifyContent='space-between' mt='30px'>
				<Box
					width='100%'
					background='white'
					boxShadow='1px 1px 3px rgba(0,0,0,0.3)'
					p='40px 30px'
					borderRadius='6px'>
					<form onSubmit={departmentAdd}>
						<Box
							display='flex'
							flexDirection='column'
							alignItems='end'>
							<FormControl mb='10px'>
								<FormLabel>Add Department</FormLabel>
								<Input
									type='text'
									onChange={(e) =>
										setDepartment(e.target.value)
									}
									required
								/>
							</FormControl>
							<FormControl mb='10px'>
								<FormLabel>Select Head of Department</FormLabel>
								<Select
									placeholder='Select option'
									onChange={(e) => setHod(e.target.value)}>
									{departmentList?.map((data, index) => {
										return (
											<option value={data.id} key={index}>
												{data.emp_name}
											</option>
										);
									})}
								</Select>
							</FormControl>

							<FormControl w='100%' alignItems='center'>
								<FormLabel>
									Add Cost Center{' '}
									<Button
										w='20%'
										p='0px'
										width='10px'
										bg='none'
										_hover={{ bg: 'none' }}
										_active={{ bg: 'none' }}
										_focus={{ bg: 'none' }}
										onClick={handleAddInput}>
										<i className='fa-sharp fa-solid fa-plus'></i>
									</Button>
								</FormLabel>
								{inputs.map((input, index) => (
									<Box
										w='100%'
										display='flex'
										alignItems='center'
										key={index}>
										<Input
											type='text'
											mb='10px'
											value={input}
											onChange={(event) =>
												handleChange(index, event)
											}
										/>
										<Button
											mt='-10px'
											color='var(--chakra-colors-claimzTextBlueLightColor)'
											bg='none'
											_hover={{ bg: 'none' }}
											_active={{ bg: 'none' }}
											_focus={{ bg: 'none' }}
											onClick={() =>
												handleRemoveInput(index)
											}>
											<i className='fa-solid fa-trash'></i>
										</Button>
									</Box>
								))}
							</FormControl>

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
								Submit
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default AddDepartment;
