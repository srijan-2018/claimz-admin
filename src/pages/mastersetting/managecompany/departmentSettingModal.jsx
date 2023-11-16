import React, { useState } from 'react';
import {
	Box,
	Button,
	Text,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast,
	FormLabel,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import CostCenterTable from './costcentertable';
import { useNavigate } from 'react-router-dom';
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
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
		padding-bottom: 10px;
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
		height: calc(100vh - 450px);
	}
`;
const DepartmentSettingModal = ({ rowData }) => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const toast = useToast();
	const [msg, setMsg] = useState();
	const [inputs, setInputs] = useState([]);
	const [departmentId, setDepartmentId] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [flag, setFlag] = useState(false);

	function toastCall() {
		return toast({
			title: 'Cost Center Added Sucessfully',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	}

	const {
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisclosure();

	function handleChange(index, event) {
		const values = [...inputs];
		values[index] = event.target.value;
		setInputs(values);
	}

	function handleAddInput() {
		const values = [...inputs];
		values.push('');
		setInputs(values);
		setFlag(true);
		setDepartmentId(rowData.department.id);
	}

	function handleRemoveInput(index) {
		const values = [...inputs];
		values.splice(index, 1);
		setInputs(values);
		if (values.length === 0) {
			setFlag(false);
		}
	}

	const addCostCenter = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('department_id', departmentId);
		formData.append('cost_center_name', inputs);

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/cost-center-post/${departmentId}`,
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
		<CssWrapper>
			<Button
				onClick={modalOnOpen}
				bg='none'
				_hover={{ bg: 'none' }}
				_active={{ bg: 'none' }}
				_focus={{ bg: 'none' }}>
				<i className='fa-solid fa-eye fa-2x'></i>
			</Button>
			<Modal isOpen={modalIsOpen} onClose={modalOnClose} isCentered>
				<ModalOverlay bg='rgba(0,0,0,0.2)' />
				<ModalContent minW='70%' h='70vh'>
					<ModalHeader
						pt='50px'
						pb='15px'
						display='flex'
						justifyContent='space-between'
						alignItems='center'>
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
								Cost Center List
							</Text>
						</Box>
						<Button
							display='flex'
							alignItems='center'
							justifyContent='space-between'
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
							onClick={handleAddInput}>
							<Box as='span' mr='10px'>
								Add More Cost Center
							</Box>
							<i className='fa-sharp fa-solid fa-plus'></i>
						</Button>
					</ModalHeader>
					<ModalCloseButton size='lg' />
					<ModalBody>
						<form onSubmit={addCostCenter}>
							<Box
								display='flex'
								flexWrap='wrap'
								justifyContent='end'
								marginBottom='20px'>
								{inputs.map((input, index) => (
									<Box
										w='100%'
										display='flex'
										placeholder='Add Cost Center'
										alignItems='center'
										key={index}>
										<Box w='100%'>
											<FormLabel>
												Add Cost Center Name
											</FormLabel>
											<Input
												type='text'
												required
												mb='15px'
												value={input.value}
												onChange={(event) =>
													handleChange(index, event)
												}
											/>
										</Box>
										<Button
											mt='15px'
											color='var(--chakra-colors-claimzTextBlueLightColor)'
											bg='none'
											_hover={{ bg: 'none' }}
											_active={{ bg: 'none' }}
											_focus={{ bg: 'none' }}
											onClick={() =>
												handleRemoveInput(index)
											}>
											<i className='fa-solid fa-trash fa-2x'></i>
										</Button>
									</Box>
								))}
								{flag && (
									<Button
										disabled={isLoading}
										isLoading={isLoading}
										spinner={
											<BeatLoader
												size={8}
												color='white'
											/>
										}
										textAlign='right'
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
										Submit
									</Button>
								)}
							</Box>
						</form>

						<Box className='costCenterTable'>
							<CostCenterTable data={rowData} />
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</CssWrapper>
	);
};

export default DepartmentSettingModal;
