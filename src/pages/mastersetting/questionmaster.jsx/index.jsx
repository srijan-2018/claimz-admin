import React, { useEffect, useState } from 'react';
import {
	Box,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Heading,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Image,
} from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
		padding-bottom: 10px;
		background-color: white;
		padding: 15px;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		padding-bottom: 20px;
		background-color: white;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.p-datatable-wrapper {
		margin-top: 5px;
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 253px);
		background: white;
	}
	.p-datatable .p-column-header-content {
		justify-content: flex-start;
	}
	.p-datatable .p-column-header-content {
		justify-content: center;
	}
`;

const QuestionMaster = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [inputs, setInputs] = useState(['']);
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [questionList, setQuestionlist] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const addDepartment = async () => {
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/seperation`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setQuestionlist(data.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		addDepartment();
	}, [msg]);

	const renderHeader = () => {
		function toastCall() {
			return toast({
				title: 'Question Added Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
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

		const questionAdd = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('datas', `["${inputs.join('","')}"]`);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/seperation-post`,
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
					setMsg(!msg);
					setInputs(['']);
					setIsLoading(false);
					onClose();
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		return (
			<>
				<Box display='flex' justifyContent='space-between'>
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
							Question Master List
						</Text>
					</Box>
					<Button
						onClick={onOpen}
						fontSize='1.4rem'
						minW='145px'
						padding='20px 10px'
						background='var(--chakra-colors-claimzMainGeadientColor)'
						color='white'
						display='flex'
						alignItems='center'
						justifyContent='center'
						borderRadius='50px'
						_hover={{
							background:
								'var(--chakra-colors-claimzMainGeadientColor)',
						}}
						_active={'none'}>
						<Box mr='10px'>
							<i className='fa-solid fa-plus'></i>
						</Box>{' '}
						<Text>Add Question</Text>
					</Button>
				</Box>

				<Modal
					isCentered
					onClose={onClose}
					isOpen={isOpen}
					motionPreset='slideInBottom'>
					<ModalOverlay />
					<ModalContent minW='60%'>
						<form
							onSubmit={questionAdd}
							style={{ borderRadius: '5px 5px 0px 0px' }}>
							<ModalHeader p='0px'>
								<Box
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'>
									<Heading>Add Your Question</Heading>
								</Box>
							</ModalHeader>
							<ModalCloseButton
								size='lg'
								mt='5px'
								color='white'
							/>
							<ModalBody mt='15px'>
								<Box
									display='flex'
									flexDirection='column'
									alignItems='end'>
									<FormControl w='100%' alignItems='center'>
										<FormLabel>
											Add Question{' '}
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
													required
													onChange={(event) =>
														handleChange(
															index,
															event
														)
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
								</Box>
							</ModalBody>
							<ModalFooter mb='15px'>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px 20px'
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
									type='submit'>
									Add
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const header = renderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const {
			isOpen: UpdateIsOpen,
			onOpen: UpdateOnOpen,
			onClose: UpdateOnClose,
		} = useDisclosure();
		const [updatedQuestion, setUpdatedQuestion] = useState(
			rowData.question
		);

		function toastCall() {
			return toast({
				title: 'Question List Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const updateQuestion = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('question_id', rowData.question_id);
			formData.append('question', updatedQuestion);

			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/seperation-update`,
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
					setMsg(!msg);
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
				<Button
					onClick={UpdateOnOpen}
					background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
					backgroundClip='text'
					_hover={{
						background:
							'linear-gradient(180deg, #2770AE 0%, #01325B 100%)',
						backgroundClip: 'text',
					}}>
					<i className='fa-solid fa-pen'></i>
				</Button>

				<Modal
					isCentered
					onClose={UpdateOnClose}
					isOpen={UpdateIsOpen}
					motionPreset='slideInBottom'>
					<ModalOverlay />
					<ModalContent minW='60%'>
						<form
							onSubmit={updateQuestion}
							style={{ borderRadius: '5px 5px 0px 0px' }}>
							<ModalHeader p='0px'>
								<Box
									bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									color='white'
									padding='10px 15px'>
									<Heading>Update Your Question</Heading>
								</Box>
							</ModalHeader>
							<ModalCloseButton
								size='lg'
								mt='5px'
								color='white'
							/>
							<ModalBody mt='15px'>
								<FormControl mb='10px'>
									<FormLabel>Update Question</FormLabel>
									<Input
										type='text'
										value={updatedQuestion}
										onChange={(e) =>
											setUpdatedQuestion(e.target.value)
										}
										required
									/>
								</FormControl>
							</ModalBody>
							<ModalFooter mb='15px'>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
									boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
									borderRadius='10px'
									p='20px'
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
									type='submit'>
									Update
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
	};

	return (
		<CssWrapper>
			<div className='card p-fluid'>
				{loader ? (
					<Box
						height='550px'
						width='100%'
						display='flex'
						justifyContent='center'
						alignItems='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<DataTable
						value={questionList}
						header={header}
						dataKey='question_id'
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							header='Question List'
							field='question'
							style={{ width: '85%' }}></Column>
						<Column
							header='Edit Question'
							body={ActionTemplate}
							bodyStyle={{ textAlign: 'center' }}
							headerStyle={{
								width: '10%',
								minWidth: '8rem',
							}}></Column>
					</DataTable>
				)}
			</div>
		</CssWrapper>
	);
};

export default QuestionMaster;
