import {
	Box,
	Text,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Input,
	useToast,
	Image,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.costCenterTable::-webkit-scrollbar {
		width: 6px;
	}
	.costCenterTable::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	.costCenterTable::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}
`;

const FoodLimit = () => {
	const navigate = useNavigate();
	const toast = useToast();
	let token = localStorage.getItem('token');
	const [foodLimit, setFoodLimit] = useState();
	const [loader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function toastCall() {
		return toast({
			title: 'Food Limit Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	useEffect(() => {
		const convayenceTravelLimit = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/convayence-food`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					setFoodLimit(data1.data.food_limit);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		convayenceTravelLimit();
	}, []);

	const changeInputHandle = (index, value) => {
		let temp = [...foodLimit];
		temp[index].limit = value;
		setFoodLimit(temp);
	};

	const foodLimitAdd = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('array', JSON.stringify(foodLimit));
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/convayence-food-post`,
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
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<CssWrapper>
			<Box
				display='-webkit-inline-box'
				borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
				pb='10px'
				mb='15px'
				width='600px'
				pb='5px'
				mt='15px'
				mb='15px'>
				<Text
					background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
					backgroundClip='text'
					fontWeight='700'
					fontSize='28px'
					lineHeight='36px'>
					List of all Conveyance Food Limits
				</Text>
			</Box>
			{loader ? (
				<Box
					height='calc(100vh - 220px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<form onSubmit={foodLimitAdd}>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='flex-end'>
						<Box
							className='costCenterTable'
							w='100%'
							pr='10px'
							overflowY='auto'
							height='calc(100vh - 320px)'>
							<Table className='reportsTable' variant='striped'>
								<Thead
									margin='75px auto 0'
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'>
									<Tr>
										<Th
											textTransform='capitalize'
											color='white'
											p='15px 0px'
											textAlign='center'
											fontSize='1.6rem'>
											Grades
										</Th>
										<Th
											textTransform='capitalize'
											color='white'
											p='15px 0px'
											textAlign='center'
											fontSize='1.6rem'>
											Limits
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{foodLimit?.map((data, index) => {
										return (
											<Tr key={index}>
												<Td
													p='15px 0px'
													textAlign='center'
													px='15px'
													fontSize='1.4rem'
													fontWeight='500'>
													{data.grade_value}
												</Td>
												<Td
													p='15px 0px'
													textAlign='center'
													px='15px'
													fontSize='1.4rem'
													color='claimzTextBlueColor'>
													<Input
														type='number'
														textAlign='center'
														value={data.limit}
														onChange={(e) =>
															changeInputHandle(
																index,
																e.target.value
															)
														}
														required
													/>
												</Td>
											</Tr>
										);
									})}
								</Tbody>
							</Table>
						</Box>
						<Button
							disabled={isLoading}
							isLoading={isLoading}
							spinner={<BeatLoader size={8} color='white' />}
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='5px'
							p='20px 20px'
							fontSize='1.6rem'
							color='white'
							mt='28px'
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
				</form>
			)}
		</CssWrapper>
	);
};

export default FoodLimit;
