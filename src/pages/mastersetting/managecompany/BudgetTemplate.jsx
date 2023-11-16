import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Select, useToast, Image } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';
import Loader from '../../../assets/images/loader.gif';

const BudgetTemplate = ({ rowData, modifiedData, loader }) => {
	const toast = useToast();
	const token = localStorage.getItem('token');
	const [isLoading, setIsLoading] = useState(false);
	const [inputList, setInputList] = useState([
		{
			budget_amount: '',
			financial_year: '',
		},
	]);

	useEffect(() => {
		setInputList([
			...modifiedData,
			{
				budget_amount: '',
				financial_year: '',
			},
		]);
	}, [loader, isLoading]);

	function toastCallBugetAdd() {
		return toast({
			title: 'Budget Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	function toastCallFaild() {
		return toast({
			title: 'Request Failed',
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}

	const availableYears = [
		{
			value: '2017-04-01 00:00:00',
			lebel: 'April, 2017 TO March, 2018',
		},
		{
			value: '2018-04-01 00:00:00',
			lebel: 'April, 2018 TO March, 2019',
		},
		{
			value: '2019-04-01 00:00:00',
			lebel: 'April, 2019 TO March, 2020',
		},
		{
			value: '2020-04-01 00:00:00',
			lebel: 'April, 2020 TO March, 2021',
		},
		{
			value: '2021-04-01 00:00:00',
			lebel: 'April, 2021 TO March, 2022',
		},
		{
			value: '2022-04-01 00:00:00',
			lebel: 'April, 2022 TO March, 2023',
		},
		{
			value: '2023-04-01 00:00:00',
			lebel: 'April, 2023 TO March, 2024',
		},
		{
			value: '2024-04-01 00:00:00',
			lebel: 'April, 2024 TO March, 2025',
		},
		{
			value: '2025-04-01 00:00:00',
			lebel: 'April, 2025 TO March, 2026',
		},
		{
			value: '2026-04-01 00:00:00',
			lebel: 'April, 2026 TO March, 2027',
		},
		{
			value: '2027-04-01 00:00:00',
			lebel: 'April, 2027 TO March, 2028',
		},
		{
			value: '2028-04-01 00:00:00',
			lebel: 'April, 2028 TO March, 2029',
		},
		{
			value: '2029-04-01 00:00:00',
			lebel: 'April, 2029 TO March, 2030',
		},
		{
			value: '2030-04-01 00:00:00',
			lebel: 'April, 2030 TO March, 2031',
		},
		{
			value: '2031-04-01 00:00:00',
			lebel: 'April, 2031 TO March, 2032',
		},
		{
			value: '2032-04-01 00:00:00',
			lebel: 'April, 2032 TO March, 2033',
		},
		{
			value: '2033-04-01 00:00:00',
			lebel: 'April, 2033 TO March, 2034',
		},
		{
			value: '2034-04-01 00:00:00',
			lebel: 'April, 2034 TO March, 2035',
		},
		{
			value: '2035-04-01 00:00:00',
			lebel: 'April, 2035 TO March, 2036',
		},
	];

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([
			...inputList,
			{
				budget_amount: '',
				financial_year: '',
			},
		]);
	};
	// Function to handle item deletion
	const handleDeleteClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const addBudget = async (e) => {
		e.preventDefault();
		const formattedBudgetData = inputList.map((item) => {
			// Assuming item.financial_year is in the format "yyyy-MM-dd"
			const year = item.financial_year.substring(0, 4); // Extract year
			const nextYear = String(parseInt(year) + 1); // Calculate next year

			// Format the dates as needed
			const financial_year_start = `${year}-04-01 00:00:00`;
			const financial_year_end = `${nextYear}-04-01 00:00:00`;

			return {
				budget_amount: item.budget_amount,
				financial_year_start,
				financial_year_end,
			};
		});

		const formData = new FormData();
		formData.append('budget', JSON.stringify(formattedBudgetData));

		if (modifiedData) {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/budget-update`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCallBugetAdd();
					setIsLoading(false);
				} else {
					toastCallFaild();
					setIsLoading(false);
				}
			} catch (error) {
				toastCallFaild();
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/budget-post/${rowData.id}`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					toastCallBugetAdd();
					setIsLoading(false);
				} else {
					toastCallFaild();
					setIsLoading(false);
				}
			} catch (error) {
				toastCallFaild();
				setIsLoading(false);
			}
		}
	};

	return (
		<Box>
			{loader ? (
				<Box
					height='calc(100vh - 139px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<form
					style={{
						display: 'flex',
						width: '100%',
						flexDirection: 'column',
						alignItems: 'flex-end',
					}}>
					{inputList.map((x, i) => {
						const selectedYear = availableYears.find(
							(year) => year.value === x.financial_year_start
						);
						return (
							<Box
								display='flex'
								w='100%'
								justifyContent='space-between'
								alignItems='center'
								gap='15px'
								marginBottom='15px'
								key={i}>
								<Box
									display='flex'
									w='100%'
									justifyContent='space-between'
									alignItems='center'
									gap='15px'>
									<Select
										bg='white'
										name='financial_year'
										placeholder='Select Financial Year'
										defaultValue={
											selectedYear
												? selectedYear.value
												: ''
										} // Set the default value
										onChange={(e) =>
											handleInputChange(e, i)
										}>
										{availableYears.map((year) => (
											<option
												key={year.lebel}
												value={year.value}>
												{year.lebel}
											</option>
										))}
									</Select>

									<Input
										type='number'
										bg='white'
										className='ml10'
										name='budget_amount'
										placeholder='Assigned Budget'
										value={x.budget_amount}
										onChange={(e) =>
											handleInputChange(e, i)
										}
									/>
								</Box>

								<Box
									display='flex'
									justifyContent='space-between'
									gap='10px'
									minW='53px'>
									{i > 0 && (
										<Button
											p='0px'
											width='10px'
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
											bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
											onClick={() => handleDeleteClick(i)} // Call the delete function with the index
										>
											<i className='fa-sharp fa-solid fa-minus'></i>
										</Button>
									)}
									{inputList.length - 1 === i && (
										<Button
											p='0px'
											width='10px'
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
											bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
											onClick={handleAddClick}>
											<i className='fa-sharp fa-solid fa-plus'></i>
										</Button>
									)}
								</Box>
							</Box>
						);
					})}

					<Button
						disabled={isLoading}
						isLoading={isLoading}
						spinner={<BeatLoader size={8} color='white' />}
						mt='10px'
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
						fontSize='1.6rem'
						color='white'
						type='submit'
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
						onClick={addBudget}>
						Submit
					</Button>
				</form>
			)}
		</Box>
	);
};

export default BudgetTemplate;
