import React, { useEffect, useState } from 'react';
import {
	Box,
	Image,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Table,
	Thead,
	Tbody,
	Th,
	Tr,
	Td,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	TabIndicator,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const TDSListStatus = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/pending-declaration-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();

					setProducts(data1.data);

					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, [isLoading]);

	const ActionTemplate = ({ list }) => {
		const toast = useToast();
		const { isOpen, onOpen, onClose } = useDisclosure();
		const [docNo, setDocNo] = useState(list[0].doc_no);
		const [userId, setUserId] = useState(list[0].id);
		const [approved, setApproved] = useState(2);
		const [reject, setReject] = useState(3);
		const groupOne = list?.filter(
			(item) => item.group_name === 'Investment'
		);
		const groupTwo = list?.filter(
			(item) => item.group_name === 'Political'
		);
		const grouptTree = list?.filter(
			(item) => item.group_name === 'Medical'
		);
		const groupFour = list?.filter((item) => item.group_name === 'Loan');
		const groupFive = list?.filter((item) => item.group_name == 'Donation');
		const groupSix = list?.filter(
			(item) => item.group_name === 'Others Royalty'
		);
		const groupSeven = list?.filter(
			(item) => item.group_name == 'Disabled Individuals'
		);
		const groupNamesArray = list.map((item) => item.group_name);
		const uniqueData = [...new Set(groupNamesArray)];

		function toastCall() {
			return toast({
				title: 'Business Location Added Sucessfully',
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

		// Grouping declarations by type_id
		const groupedDeclarationsOne = groupOne?.reduce((acc, declaration) => {
			const typeId = declaration.type_id;
			if (acc[typeId]) {
				acc[typeId].push(declaration);
			} else {
				acc[typeId] = [declaration];
			}
			return acc;
		}, {});

		const groupedDeclarationsTwo = groupTwo?.reduce((acc, declaration) => {
			const typeId = declaration.type_id;
			if (acc[typeId]) {
				acc[typeId].push(declaration);
			} else {
				acc[typeId] = [declaration];
			}
			return acc;
		}, {});

		const groupedDeclarationsThree = grouptTree?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const groupedDeclarationsFour = groupFour?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const groupedDeclarationsFive = groupFive?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const groupedDeclarationsSix = groupFive?.reduce((acc, declaration) => {
			const typeId = declaration.type_id;
			if (acc[typeId]) {
				acc[typeId].push(declaration);
			} else {
				acc[typeId] = [declaration];
			}
			return acc;
		}, {});

		const groupedDeclarationsSeven = groupSeven?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const nestedArrayOne = Object.values(groupedDeclarationsOne);
		const nestedArrayTwo = Object.values(groupedDeclarationsTwo);
		const nestedArrayThree = Object.values(groupedDeclarationsThree);
		const nestedArrayFour = Object.values(groupedDeclarationsFour);
		const nestedArrayFive = Object.values(groupedDeclarationsFive);
		const nestedArraySix = Object.values(groupedDeclarationsFour);
		const nestedArraySeven = Object.values(groupedDeclarationsFive);

		const approver = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('doc_no', docNo);
			formData.append('user_id', userId);
			formData.append('status', approved);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/approve-declaration-list`,
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
				} else if (response.status === 400) {
					toastCallFaild();
				} else {
					toastCallFaild();
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const decline = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('doc_no', docNo);
			formData.append('user_id', userId);
			formData.append('status', reject);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/approve-declaration-list`,
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
				} else if (response.status === 400) {
					toastCallFaild();
				} else {
					toastCallFaild();
				}
			} catch (error) {
				navigate('/login');
			}
		};

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-eye fa-2x'></i>
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='50% !important'
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
									TDS Declaration Approver
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Tabs position='relative' variant='unstyled'>
								<TabList
									sx={{
										'& .chakra-tabs__tab': {
											width: '100%',
											borderRadius: '15px 15px 0px 0px',
											color: 'claimzTextBlueLightColor',
											fontSize: '1.6rem',
											fontWeight: '700',
											pb: '10px',
											pt: '10px',
										},
										'& .chakra-tabs__tab[aria-selected=true]':
											{
												borderRadius:
													'15px 15px 0px 0px',
												color: 'white',
												bg: 'claimzMainGeadientColor',
											},
									}}>
									{uniqueData.map((groupName, index) => (
										<Tab key={index}>{groupName}</Tab>
									))}
								</TabList>
								<TabIndicator
									mt='-2.5px'
									height='3px'
									bg='claimzTextBlueLightColor'
									borderRadius='1px'
								/>
								<TabPanels>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArrayOne?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArrayTwo?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArrayThree?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArrayFour?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArrayFive?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>

									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArraySix?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>

									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											{nestedArraySeven?.map(
												(category, index) => (
													<Tabs
														key={index}
														position='relative'
														variant='unstyled'>
														<TabList
															sx={{
																'& .chakra-tabs__tab':
																	{
																		color: 'claimzTextBlueLightColor',
																		fontSize:
																			'1.6rem',
																		fontWeight:
																			'700',
																		pb: '10px',
																		pt: '10px',
																		width: '100%',
																	},
																'& .chakra-tabs__tab[aria-selected=true]':
																	{
																		color: 'white',
																		bg: 'claimzMainGeadientColor',
																	},
															}}>
															<Tab>
																{
																	category[0]
																		.type_name
																}
															</Tab>
														</TabList>
														<TabIndicator
															mt='-2.5px'
															height='3px'
															bg='claimzTextBlueLightColor'
															borderRadius='1px'
														/>

														<TabPanels>
															<TabPanel p='0px 15px'>
																{category.map(
																	(
																		declaration
																	) => (
																		<Box
																			display='flex'
																			justifyContent='space-between'
																			alignItems='center'>
																			<Box
																				background='white'
																				padding='0px'
																				m='15px 0px'
																				key={
																					declaration.declaration_id
																				}>
																				{
																					declaration.declaration_name
																				}
																			</Box>
																			<Box fontWeight='600'>
																				{
																					declaration.amount
																				}
																			</Box>
																		</Box>
																	)
																)}
															</TabPanel>
														</TabPanels>
													</Tabs>
												)
											)}
										</Box>
									</TabPanel>
								</TabPanels>
							</Tabs>
							<Box
								display='flex'
								width='100%'
								justifyContent='flex-end'
								mt='20px'>
								<Button
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									p='20px 20px'
									color='white'
									mt='15px'
									mr='15px'
									fontSize='1.6rem'
									borderRadius='15px'
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
									onClick={decline}>
									<Text fontSize='1.6rem' fontWeight='700'>
										Decline
									</Text>
								</Button>
								<Button
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									p='20px 20px'
									color='white'
									mt='15px'
									fontSize='1.6rem'
									borderRadius='15px'
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
									onClick={approver}>
									<Text fontSize='1.6rem' fontWeight='700'>
										Approve
									</Text>
								</Button>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	return (
		<>
			{loader ? (
				<Box
					height='calc(100vh - 160px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box
					height='calc(100vh - 160px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='flex-start'>
					<Table>
						<Thead>
							<Tr
								bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='white'
								padding='10px 15px'>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'>
									EMP CODE
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									EMP Name
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									CTC
								</Th>
								<Th
									p='15px'
									fontSize='1.5rem'
									fontWeight='600'
									color='white'
									textAlign='center'>
									Declaration
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{products?.map((section, index) => (
								<React.Fragment key={index}>
									<Tr key={section?.list[0].id}>
										<Td p='15px'>
											{section?.list[0].emp_code}
										</Td>
										<Td p='15px' textAlign='center'>
											{section?.list[0].emp_name}
										</Td>
										<Td p='15px' textAlign='center'>
											{section?.ctc}
										</Td>
										<Td p='15px' textAlign='center'>
											<ActionTemplate
												ctc={section?.ctc}
												list={section.list}
											/>
										</Td>
									</Tr>
								</React.Fragment>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};

export default TDSListStatus;
