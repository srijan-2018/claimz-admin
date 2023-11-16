import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const CssWrapper = styled.div`
	.p-datatable-wrapper {
		overflow-y: scroll;
		height: calc(100vh - 380px);
	}
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
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
		justify-content: flex-start;
	}
	.p-datatable-wrapper {
		overflow-y: scroll;
		height: calc(100vh - 230px);
		margin-right: 5px;
		padding-right: 5px;
	}
`;

const StageList = ({ products, setProducts, sucess, setSucess }) => {
	const ActionTemplate = (rowData) => {
		const token = localStorage.getItem('token');
		const navigate = useNavigate();
		const toast = useToast();
		const [typeName, setTypeName] = useState(rowData.type_name);
		const [statusId, setStatusId] = useState(rowData.a_status_id);
		const [isLoading, setIsLoading] = useState(false);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Type name Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const addType = async (e) => {
			e.preventDefault();
			let formValues = new FormData();
			formValues.append('type_name', typeName);
			formValues.append('id', statusId);
			try {
				setIsLoading(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/claim-summary-save`,
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
			<Box>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-pen-to-square fa-2x'></i>
				</Button>
				<Modal
					isCentered
					onClose={onClose}
					isOpen={isOpen}
					motionPreset='slideInBottom'>
					<ModalOverlay />
					<ModalContent minW='400px'>
						<ModalHeader p='0px'>
							<Box
								bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
								boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
								color='white'
								padding='10px 15px'>
								<Heading>Add Type Name</Heading>
							</Box>
						</ModalHeader>
						<ModalCloseButton mt='10px' color='white' />
						<ModalBody pt='20px' pb='25px'>
							<form
								onSubmit={addType}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
								}}>
								<FormControl mb='15px'>
									<FormLabel>Type Name</FormLabel>
									<Input
										type='text'
										value={typeName}
										onChange={(e) =>
											setTypeName(e.target.value)
										}
										required
									/>
								</FormControl>
								<Button
									disabled={isLoading}
									isLoading={isLoading}
									spinner={
										<BeatLoader size={8} color='white' />
									}
									onClick={onClose}
									type='submit'
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
									}}>
									Submit
								</Button>
							</form>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Box>
		);
	};

	const columns = [
		{ field: 'type_name', header: 'Stage Name' },
		{ field: 'a_status_id', body: ActionTemplate, header: 'Edit' },
	];

	const dynamicColumns = columns.map((col, i) => {
		return (
			<Column
				key={col.field}
				columnKey={col.field}
				field={col.field}
				header={col.header}
				body={col.body}
			/>
		);
	});

	return (
		<CssWrapper>
			<Box className='card'>
				<DataTable
					dataKey='a_status_id'
					value={products}
					reorderableColumns
					reorderableRows
					onRowReorder={(e) => setProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}>
					<Column rowReorder style={{ width: '3rem' }} />
					{dynamicColumns}
				</DataTable>
			</Box>
		</CssWrapper>
	);
};

export default StageList;
