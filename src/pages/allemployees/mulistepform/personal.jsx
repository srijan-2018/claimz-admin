import React from 'react';
import {
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Select,
} from '@chakra-ui/react';

const Personal = ({ formData, setFormData, fromValue }) => {
	const handlePresentAddressCheckboxChange = (event) => {
		if (event.target.checked) {
			// Copy the value from Permanent Address to Present Address
			setFormData({
				...formData,
				present_address: formData.permanent_address,
			});
		} else {
			// Clear the Present Address if the checkbox is unchecked
			setFormData({
				...formData,
				present_address: '',
			});
		}
	};
	return (
		<>
			<Heading
				w='100%'
				fontWeight='600'
				mb='2%'
				color='claimzTextBlueColor'>
				<Box as='span' pr='15px'>
					<i className='fa-regular fa-pen-to-square'></i>
				</Box>{' '}
				Personal Details
			</Heading>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Name{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='text'
						placeholder='Employee Name'
						value={formData.name}
						onChange={(event) =>
							setFormData({
								...formData,
								name: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Date of Birth{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='date'
						value={formData.birth_date}
						onChange={(event) =>
							setFormData({
								...formData,
								birth_date: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='33%'>
					<FormLabel>Gender</FormLabel>
					<Select
						placeholder='Select Gender'
						value={formData.gender}
						onChange={(event) =>
							setFormData({
								...formData,
								gender: event.target.value,
							})
						}>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='others'>Others</option>
					</Select>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>Father's Name</FormLabel>
					<Input
						type='text'
						placeholder="Enter Your Father's Name"
						value={formData.father_name}
						onChange={(event) =>
							setFormData({
								...formData,
								father_name: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Permanent Address</FormLabel>
					<Input
						type='Text'
						placeholder='Permanent Address'
						value={formData.permanent_address}
						onChange={(event) =>
							setFormData({
								...formData,
								permanent_address: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='33%'>
					<FormLabel display='flex' gap='5px'>
						<Checkbox
							colorScheme='red'
							size='lg'
							onChange={handlePresentAddressCheckboxChange}
						/>
						Present Address{' '}
						<Box as='span' fontSize='10px'>
							(same as permanent address)
						</Box>
					</FormLabel>
					<Box>
						<FormControl>
							<Input
								type='text'
								placeholder='Present Address'
								value={formData.present_address}
								onChange={(event) =>
									setFormData({
										...formData,
										present_address: event.target.value,
									})
								}
							/>
						</FormControl>
					</Box>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Blood Group
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Group'
						value={formData.blood_group}
						onChange={(event) =>
							setFormData({
								...formData,
								blood_group: event.target.value,
							})
						}>
						{fromValue.bloodGroup?.map((data, index) => {
							return (
								<option value={data} key={index}>
									{data}
								</option>
							);
						})}
					</Select>
				</FormControl>
			</Box>
		</>
	);
};

export default Personal;
