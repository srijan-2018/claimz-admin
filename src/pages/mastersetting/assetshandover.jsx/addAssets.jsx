import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Text,
	Select,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast,
	Textarea,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const AssetsAdd = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const token = localStorage.getItem('token');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingModal, setIsLoadingModal] = useState(false);
	const [sucess, setSucess] = useState();
	const [assetGroupData, setAssetGroupData] = useState([]);
	const [lastAssetId, setLastAssetId] = useState('');
	const [firstChildId, setFirstChildId] = useState('');
	const [secondChildId, setSecondChildId] = useState('');
	const [thirdChildId, setThirdChildId] = useState('');
	const [fouthChildId, setFouthChildId] = useState('');
	const [fifthChildId, setfifthChildId] = useState('');
	const [isFormValid, setIsFormValid] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [uom, setUom] = useState();
	const [assetName, setAssetName] = useState();
	const [description, setDescription] = useState();
	const [uomId, setUomId] = useState();
	const [inputList, setInputList] = useState([
		{ specification: '', specification_details: '' },
	]);
	const {
		isOpen: firstModalIsOpen,
		onOpen: firstModalOnOpen,
		onClose: firstModalOnClose,
	} = useDisclosure();
	const {
		isOpen: secondModalIsOpen,
		onOpen: secondModalOnOpen,
		onClose: secondModalOnClose,
	} = useDisclosure();
	const {
		isOpen: thirdModalIsOpen,
		onOpen: thirdModalOnOpen,
		onClose: thirdModalOnClose,
	} = useDisclosure();
	const {
		isOpen: fourthModalIsOpen,
		onOpen: fourthModalOnOpen,
		onClose: fourthModalOnClose,
	} = useDisclosure();
	const {
		isOpen: fifthModalIsOpen,
		onOpen: fifthModalOnOpen,
		onClose: fifthModalOnClose,
	} = useDisclosure();

	const [formData, setFormData] = useState({
		name: '',
		group_description: '',
		parent_id: '',
	});

	function toastCall() {
		return toast({
			title: 'Assets Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const handleInputChange = (index, field, value) => {
		const updatedList = [...inputList];
		updatedList[index][field] = value;
		setInputList(updatedList);
	};

	const handleAddClick = () => {
		setInputList([...inputList, { field1: '', field2: '' }]);
	};

	const handleRemoveClick = (index) => {
		const updatedList = [...inputList];
		updatedList.splice(index, 1);
		setInputList(updatedList);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		const assectsGroup = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/asset-group`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/uom-master`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					const data1 = await response1.json();
					setAssetGroupData(data?.data);
					setUom(data1?.data);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		assectsGroup();
	}, [sucess]);

	const addAssects = async (e) => {
		e.preventDefault();
		let formValues = new FormData();
		formValues.append('datas', `[${JSON.stringify(formData)}]`);
		// Check if any of the fields are empty
		if (formData.name === '' || formData.group_description === '') {
			setIsFormValid(false);
			setErrorMessage('Please fill in all required fields.');
		} else {
			// Handle form submission logic here
			// If the form is valid, reset any previous error message
			setIsFormValid(true);
			setErrorMessage('');

			try {
				setIsLoadingModal(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/asset-group-post`,
					{
						method: 'POST',
						body: formValues,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.ok) {
					setSucess(!sucess);
					setIsLoadingModal(false);
					toastCall();
					// Reset the form fields
					setFormData({
						name: '',
						group_description: '',
						parent_id: '',
					});
				} else {
					setIsLoadingModal(false);
				}
			} catch (error) {
				navigate('/login');
			}
		}
	};

	const firstParent = assetGroupData?.filter(
		(item) => item.parent_id === '0'
	);
	const firstChild = assetGroupData?.filter(
		(item) => item.parent_id === lastAssetId
	);
	const secondChild = assetGroupData?.filter(
		(item) => item.parent_id === firstChildId
	);
	const thirdChild = assetGroupData?.filter(
		(item) => item.parent_id === secondChildId
	);
	const fourthChild = assetGroupData?.filter(
		(item) => item.parent_id === thirdChildId
	);
	const fifthChild = assetGroupData?.filter(
		(item) => item.parent_id === fouthChildId
	);

	const id = [
		lastAssetId,
		firstChildId,
		secondChildId,
		thirdChildId,
		fouthChildId,
	];
	const lastId = id.filter((element) => element !== '');
	const lastItem = lastId[lastId.length - 1];

	const assectCreate = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('group_id', lastItem);
		formData.append('name', assetName);
		formData.append('description', description);
		formData.append('uom', uomId);
		formData.append('specification', `${JSON.stringify(inputList)}`);
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/asset-post`,
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
				setIsLoading(false);
				toastCall();
			} else {
				navigate('/login');
			}
		} catch (error) {
			navigate('/login');
		}
	};

	return (
		<Box
			width='100%'
			height='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'
			background='white'
			border='1px solid #CECECE'
			boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
			borderRadius='6px'
			padding='20px'>
			<Box width='100%' maxWidth='100%' minH='100%' m='0px auto'>
				<Box
					display='-webkit-inline-box'
					borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
					pb='10px'>
					<Text
						background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
						backgroundClip='text'
						fontWeight='700'
						fontSize='28px'
						lineHeight='36px'>
						Asset Creation
					</Text>
				</Box>

				<Box display='flex' gap='15px' mt='20px'>
					<form
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}>
						<Box
							display='flex'
							justifyContent='space-between'
							w='100%'>
							<Box width='49%'>
								<Box
									shadow='1px 1px 3px rgba(0,0,0,0.3)'
									mb='30px'
									bg='white'
									borderWidth='1px'
									rounded='lg'
									paddingBottom='20px'>
									<Box
										bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
										boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
										color='white'
										padding='10px 15px'
										borderWidth='1px'
										rounded='lg'>
										<Heading>Assets type</Heading>
									</Box>
									<Box p='20px 15px'>
										<Box pb='15px'>
											<FormLabel>
												{' '}
												Choose what types of assets you
												want ?{' '}
												<Button onClick={onOpen}>
													+
												</Button>
											</FormLabel>
											<Select
												placeholder='Select option'
												onChange={(e) =>
													setLastAssetId(
														e.target.value
													)
												}>
												{firstParent?.map(
													(data, index) => {
														return (
															<option
																value={
																	data.asset_group_id
																}
																key={index}>
																{
																	data.group_name
																}
															</option>
														);
													}
												)}
											</Select>
										</Box>
										{lastAssetId > 0 && (
											<Box pb='15px'>
												<FormLabel>
													{' '}
													Choose what types of assets
													you want ?{' '}
													<Button
														onClick={
															firstModalOnOpen
														}>
														+
													</Button>
												</FormLabel>
												<Select
													placeholder='Select option'
													onChange={(e) =>
														setFirstChildId(
															e.target.value
														)
													}>
													{firstChild?.map(
														(data, index) => {
															return (
																<option
																	value={
																		data.asset_group_id
																	}
																	key={index}>
																	{
																		data.group_name
																	}
																</option>
															);
														}
													)}
												</Select>
											</Box>
										)}
										{firstChildId > 0 && (
											<Box pb='15px'>
												<FormLabel>
													{' '}
													Choose what types of asset
													you want ?{' '}
													<Button
														onClick={
															secondModalOnOpen
														}>
														+
													</Button>
												</FormLabel>
												<Select
													placeholder='Select option'
													onChange={(e) =>
														setSecondChildId(
															e.target.value
														)
													}>
													{secondChild?.map(
														(data, index) => {
															return (
																<option
																	value={
																		data.asset_group_id
																	}
																	key={index}>
																	{
																		data.group_name
																	}
																</option>
															);
														}
													)}
												</Select>
											</Box>
										)}
										{secondChildId > 0 && (
											<Box pb='15px'>
												<FormLabel>
													{' '}
													Choose what types of asset
													you want ?{' '}
													<Button
														onClick={
															thirdModalOnOpen
														}>
														+
													</Button>
												</FormLabel>
												<Select
													placeholder='Select option'
													onChange={(e) =>
														setThirdChildId(
															e.target.value
														)
													}>
													{thirdChild?.map(
														(data, index) => {
															return (
																<option
																	value={
																		data.asset_group_id
																	}
																	key={index}>
																	{
																		data.group_name
																	}
																</option>
															);
														}
													)}
												</Select>
											</Box>
										)}
										{thirdChildId > 0 && (
											<Box pb='15px'>
												<FormLabel>
													{' '}
													Choose what types of asset
													you want ?{' '}
													<Button
														onClick={
															fourthModalOnOpen
														}>
														+
													</Button>
												</FormLabel>
												<Select
													placeholder='Select option'
													onChange={(e) =>
														setFouthChildId(
															e.target.value
														)
													}>
													{fourthChild?.map(
														(data, index) => {
															return (
																<option
																	value={
																		data.asset_group_id
																	}
																	key={index}>
																	{
																		data.group_name
																	}
																</option>
															);
														}
													)}
												</Select>
											</Box>
										)}
										{fouthChildId > 0 && (
											<Box pb='15px'>
												<FormLabel>
													{' '}
													Choose what types of asset
													you want ?{' '}
													<Button
														onClick={
															fifthModalOnOpen
														}>
														+
													</Button>
												</FormLabel>
												<Select
													placeholder='Select option'
													onChange={(e) =>
														setfifthChildId(
															e.target.value
														)
													}>
													{fifthChild?.map(
														(data, index) => {
															return (
																<option
																	value={
																		data.asset_group_id
																	}
																	key={index}>
																	{
																		data.group_name
																	}
																</option>
															);
														}
													)}
												</Select>
											</Box>
										)}
									</Box>
								</Box>
							</Box>
							<Box
								width='49%'
								shadow='1px 1px 3px rgba(0,0,0,0.3)'
								bg='white'
								borderWidth='1px'
								rounded='lg'
								paddingBottom='20px'
								overflowY='scroll'
								overflowX='hidden'
								height='500px'>
								<Box
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'
									borderWidth='1px'
									rounded='lg'>
									<Heading>Basic Details</Heading>
								</Box>
								<Box p='20px 15px 0px'>
									<FormControl>
										<FormLabel>Assets Name</FormLabel>
										<Input
											type='text'
											onChange={(e) =>
												setAssetName(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Box p='15px 15px'>
									<FormControl>
										<FormLabel>
											Assets Description
										</FormLabel>
										<Textarea
											type='text'
											onChange={(e) =>
												setDescription(e.target.value)
											}
											h='100px'
											fontSize='1.4rem'
										/>
									</FormControl>
								</Box>

								<Box p='0px 15px 15px'>
									<FormLabel>Base UOM</FormLabel>
									<Select
										placeholder='Select option'
										onChange={(e) =>
											setUomId(e.target.value)
										}>
										{uom?.map((data, index) => {
											return (
												<option
													value={data.uom_id}
													key={index}>
													{data.uom_name}
												</option>
											);
										})}
									</Select>
								</Box>

								<Box p='0px 15px 0px'>
									{inputList.map((input, index) => (
										<Box
											key={index}
											display='flex'
											alignItems='center'
											gap='15px'
											pb='15px'>
											<FormControl>
												<FormLabel>
													Specification
												</FormLabel>
												<Input
													value={input.specification}
													onChange={(event) =>
														handleInputChange(
															index,
															'specification',
															event.target.value
														)
													}
												/>
											</FormControl>
											<FormControl>
												<FormLabel>
													Specification Details
												</FormLabel>
												<Input
													value={
														input.specification_details
													}
													onChange={(event) =>
														handleInputChange(
															index,
															'specification_details',
															event.target.value
														)
													}
												/>
											</FormControl>
											{index < inputList.length - 1 && ( // Hide the "trash" icon for the last input box
												<Button
													color='var(--chakra-colors-claimzTextBlueLightColor)'
													mt='30px'
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}
													_focus={{ bg: 'none' }}
													onClick={() =>
														handleRemoveClick(index)
													}>
													<i className='fa-solid fa-trash'></i>
												</Button>
											)}
											{index === inputList.length - 1 && ( // Display the "plus" icon only for the last input box
												<Button
													mt='30px'
													color='var(--chakra-colors-claimzTextBlueLightColor)'
													w='20%'
													p='0px'
													width='10px'
													bg='none'
													_hover={{ bg: 'none' }}
													_active={{ bg: 'none' }}
													_focus={{ bg: 'none' }}
													onClick={handleAddClick}>
													<i className='fa-sharp fa-solid fa-plus'></i>
												</Button>
											)}
										</Box>
									))}
								</Box>
							</Box>
						</Box>
						<Button
							disabled={isLoading}
							isLoading={isLoading}
							spinner={<BeatLoader size={8} color='white' />}
							onClick={assectCreate}
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px'
							fontSize='1.6rem'
							color='white'
							mt='30px'
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
							}}>
							Submit
						</Button>
					</form>
				</Box>
			</Box>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Create Asset</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Asset Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				onClose={firstModalOnClose}
				isOpen={firstModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Assets Create</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Assects Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				onClose={secondModalOnClose}
				isOpen={secondModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Assets Create</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Assects Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				onClose={thirdModalOnClose}
				isOpen={thirdModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Assets Create</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Assects Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				onClose={fourthModalOnClose}
				isOpen={fourthModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Assets Create</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Assects Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal
				onClose={fifthModalOnClose}
				isOpen={fifthModalIsOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent minW='40%'>
					<Box
						bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						color='white'
						padding='10px 15px'
						borderWidth='1px'
						rounded='lg'>
						<Heading>Assets Create</Heading>
					</Box>
					<ModalCloseButton mt='10px' color='white' />
					<ModalBody p='20px 15px'>
						<form>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='end'>
								<FormControl mb='10px'>
									<FormLabel>Assects Name</FormLabel>
									<Input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Group Description</FormLabel>
									<Textarea
										height='100px'
										fontSize='1.4rem'
										border='1px solid var(--chakra-colors-claimzBorderGrayColor)'
										name='group_description'
										value={formData.group_description}
										onChange={handleChange}
										required
									/>
								</FormControl>
								<FormControl mb='10px'>
									<FormLabel>Parent Group</FormLabel>
									<Select
										placeholder='Select option'
										name='parent_id'
										value={formData.parent_id}
										onChange={handleChange}
										required>
										<option value='0'>
											Don't Have Parent
										</option>
									</Select>
								</FormControl>

								{errorMessage && (
									<p style={{ color: 'red' }}>
										{errorMessage}
									</p>
								)}

								<Button
									disabled={!isFormValid || isLoadingModal}
									// Rest of your button properties
									onClick={addAssects}
									isLoading={isLoadingModal}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='5px'
									p='20px 20px'
									fontSize='1.6rem'
									color='white'
									mt='30px'
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
									}}>
									Submit
								</Button>
							</Box>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default AssetsAdd;
