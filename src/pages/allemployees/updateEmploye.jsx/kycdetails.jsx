import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';

const KycDetails = ({ formData, setFormData }) => {
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
				KYC Details
			</Heading>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						PAN{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='text'
						placeholder='PAN'
						value={formData.pan_no}
						onChange={(event) =>
							setFormData({
								...formData,
								pan_no: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Mobile No{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='number'
						placeholder='Mobile No'
						value={formData.mobile_no}
						onChange={(event) =>
							setFormData({
								...formData,
								mobile_no: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Aadhar No</FormLabel>
					<Input
						type='text'
						placeholder='Aadhar No'
						value={formData.aadhar_no}
						onChange={(event) =>
							setFormData({
								...formData,
								aadhar_no: event.target.value,
							})
						}
					/>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Mail Id{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='email'
						placeholder='Mail Id'
						value={formData.mail_id}
						onChange={(event) =>
							setFormData({
								...formData,
								mail_id: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Emergency Cont No{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='Text'
						placeholder='Emergency Cont No'
						value={formData.emergency_cont_no}
						onChange={(event) =>
							setFormData({
								...formData,
								emergency_cont_no: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Passport No</FormLabel>
					<Input
						type='Text'
						placeholder='Passport No'
						value={formData.passport_no}
						onChange={(event) =>
							setFormData({
								...formData,
								passport_no: event.target.value,
							})
						}
					/>
				</FormControl>
			</Box>
		</>
	);
};

export default KycDetails;
