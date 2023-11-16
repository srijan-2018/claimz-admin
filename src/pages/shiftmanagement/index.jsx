import { Box, Text, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ShiftManagement = () => {
	let location = useLocation();
	return (
		<Box position='relative' width='100%' bg='rgba(230, 237, 239, 1)'>
			{location.pathname === '/shift-management' && (
				<Box>
					<Box
						display='-webkit-inline-box'
						borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
						mb='15px'
						width='300px'
						pb='5px'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='28px'
							lineHeight='36px'>
							Shift Management
						</Text>
					</Box>
					<Box
						display='flex'
						flexWrap='wrap'
						justifyContent='space-between'
						alignItems='center'
						pt='28px'
						mb='34px'
						sx={{
							'& .manage_items': {
								width: '48%',
							},
						}}>
						<Link
							to='add-shift-management'
							className='manage_items'>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								border='2px solid var(--chakra-colors-claimzBorderColor)'
								p='20px 15px'
								borderRadius='15px'
								mb='15px'
								color='claimzTextBlueColor'
								cursor='pointer'
								transition='0.3s ease all'
								_hover={{
									bgGradient:
										'linear(180deg, #256DAA, #01325B)',
									color: 'white',
								}}>
								<i className='fa-solid fa-business-time fa-2x'></i>
								<Text
									fontSize='2.2rem'
									fontWeight='700'
									pl='10px'>
									Add Shift
								</Text>
							</Box>
						</Link>
						<Link to='shift-list' className='manage_items'>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								border='2px solid var(--chakra-colors-claimzBorderColor)'
								p='20px 15px'
								borderRadius='15px'
								mb='15px'
								color='claimzTextBlueColor'
								cursor='pointer'
								transition='0.3s ease all'
								_hover={{
									bgGradient:
										'linear(180deg, #256DAA, #01325B)',
									color: 'white',
								}}>
								<i className='fa-solid fa-list fa-2x'></i>
								<Text
									fontSize='2.2rem'
									fontWeight='700'
									pl='10px'>
									Shift Management List
								</Text>
							</Box>
						</Link>
					</Box>

					<Box
						display='-webkit-inline-box'
						borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
						mb='15px'
						width='300px'
						pb='5px'>
						<Text
							background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
							backgroundClip='text'
							fontWeight='700'
							fontSize='28px'
							lineHeight='36px'>
							Important Steps
						</Text>
					</Box>

					<Box display='flex' mt='15px'>
						<Box pr='10px' color='claimzOrangeColor'>
							<i className='fa-solid fa-star-of-life'></i>
						</Box>
						<Text>
							Step 1: Access the Menu Bar at the top of your
							screen. Look for the fifth option called{' '}
							<Box as='span' fontWeight='600'>
								"Shift Management,"
							</Box>{' '}
							and click on it.
						</Text>
					</Box>
					<Box display='flex' mt='15px'>
						<Box pr='10px' color='claimzOrangeColor'>
							<i className='fa-solid fa-star-of-life'></i>
						</Box>
						<Text>
							Step 2: Now, it's time to add a new shift! Fill in
							the{' '}
							<Box as='span' fontWeight='600'>
								"Shift Name"
							</Box>{' '}
							to give it a unique identifier that makes sense for
							your team.
						</Text>
					</Box>
					<Box display='flex' mt='15px'>
						<Box pr='10px' color='claimzOrangeColor'>
							<i className='fa-solid fa-star-of-life'></i>
						</Box>
						<Text>
							Step 3: Set the Shift Schedule Time by providing the
							following details:
							<UnorderedList>
								<ListItem>
									Select the specific{' '}
									<Box as='span' fontWeight='600'>
										"Day"
									</Box>{' '}
									for the shift.
								</ListItem>
								<ListItem>
									Enter the{' '}
									<Box as='span' fontWeight='600'>
										"IN Time"
									</Box>{' '}
									when your employees should start their
									shifts.
								</ListItem>
								<ListItem>
									Specify the{' '}
									<Box as='span' fontWeight='600'>
										"OUT Time"
									</Box>{' '}
									for when the shift should end.
								</ListItem>
								<ListItem>
									Add a{' '}
									<Box as='span' fontWeight='600'>
										"Grace Time"
									</Box>{' '}
									if you'd like to allow a buffer period
									before considering someone late.
								</ListItem>
							</UnorderedList>
						</Text>
					</Box>
					<Box display='flex' mt='15px'>
						<Box pr='10px' color='claimzOrangeColor'>
							<i className='fa-solid fa-star-of-life'></i>
						</Box>
						<Text>
							Step 4: Once you've entered all the necessary
							details, click on the{' '}
							<Box as='span' fontWeight='600'>
								"Submit" button
							</Box>{' '}
							. Congrats! You've completed the entire onboarding
							process.
							<br />{' '}
							<Box as='span' fontWeight='600'>
								Pro tip:
							</Box>{' '}
							If you want to customise the Shift Schedule Time for
							additional days, simply click on{' '}
							<Box as='span' fontWeight='600'>
								"Add Others Day"
							</Box>{' '}
							and follow the same steps as before.
						</Text>
					</Box>
				</Box>
			)}

			<Outlet />
		</Box>
	);
};

export default ShiftManagement;
