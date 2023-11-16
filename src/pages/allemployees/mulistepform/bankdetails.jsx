import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';

const BankDetails = ({ formData, setFormData }) => {
	return (
		<>
			<Heading
				w='100%'
				fontWeight='600'
				mb='2%'
				color='claimzTextBlueColor'>
				<Box as='span' pr='15px'>
					<i className='fa-solid fa-building'></i>
				</Box>{' '}
				Bank Details
			</Heading>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='24%'>
					<FormLabel>
						Bank Name{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='text'
						placeholder='Bank Name '
						value={formData.bank_name}
						onChange={(event) =>
							setFormData({
								...formData,
								bank_name: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='24%'>
					<FormLabel>
						Bank Account No
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='text'
						placeholder='Bank Account No'
						value={formData.bank_account_no}
						onChange={(event) =>
							setFormData({
								...formData,
								bank_account_no: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='24%'>
					<FormLabel>Branch Name</FormLabel>
					<Input
						type='text'
						placeholder='Branch Name'
						value={formData.branch}
						onChange={(event) =>
							setFormData({
								...formData,
								branch: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='24%'>
					<FormLabel>IFSC Code</FormLabel>
					<Input
						type='text'
						placeholder='IFSC Code'
						value={formData.ifsc_code}
						onChange={(event) =>
							setFormData({
								...formData,
								ifsc_code: event.target.value,
							})
						}
					/>
				</FormControl>
			</Box>
		</>
	);
};

export default BankDetails;
