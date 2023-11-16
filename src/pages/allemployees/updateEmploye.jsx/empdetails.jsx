import React, { useState, useEffect } from 'react';
import {
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EmpDetails = ({ formData, setFormData, fromValue, costCenter }) => {
	let navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [place, setPlace] = useState();
	const [empList, setEmpList] = useState();

	useEffect(() => {
		const formDataValue = async () => {
			try {
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/state-master-employee`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok && response2.ok) {
					const data1 = await response1.json();
					const data2 = await response2.json();
					setPlace(data1.data);
					setEmpList(data2.data);
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, []);

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
				Current Office Details
			</Heading>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Designation
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Designation'
						value={formData?.designation}
						onChange={(event) =>
							setFormData({
								...formData,
								designation: event.target.value,
							})
						}>
						{fromValue.designation?.map((data, index) => {
							return (
								<option value={data.designation_id} key={index}>
									{data.designation_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Employee Grade{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Employee Grade'
						value={formData?.grade}
						onChange={(event) =>
							setFormData({
								...formData,
								grade: event.target.value,
							})
						}>
						{fromValue.grade?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.grade_value}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Employee Code{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Box display='flex'>
						<Input
							type='text'
							value={formData?.employee_code}
							onChange={(event) =>
								setFormData({
									...formData,
									employee_code: event.target.value,
								})
							}
							readOnly
						/>
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
						Date Of Joining
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Input
						type='date'
						value={formData?.join_date}
						onChange={(event) =>
							setFormData({
								...formData,
								join_date: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Date of Leaving</FormLabel>
					<Input
						type='date'
						value={formData?.leave_date}
						onChange={(event) =>
							setFormData({
								...formData,
								leave_date: event.target.value,
							})
						}
					/>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Place of Posting</FormLabel>
					<Select
						placeholder='Select Place of Posting'
						value={formData?.place_of_posting}
						onChange={(event) =>
							setFormData({
								...formData,
								place_of_posting: event.target.value,
							})
						}>
						{place?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.name}
								</option>
							);
						})}
					</Select>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Department{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Department'
						value={formData?.department}
						onChange={(event) =>
							setFormData({
								...formData,
								department: event.target.value,
							})
						}>
						{fromValue.department?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.department_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Cost Center</FormLabel>
					<Select
						value={formData?.cost_center_id}
						onChange={(event) =>
							setFormData({
								...formData,
								cost_center_id: event.target.value,
							})
						}>
						{costCenter?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.cost_center_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Primary Reporting{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Primary Reporting'
						value={formData?.primary_reporting}
						onChange={(event) =>
							setFormData({
								...formData,
								primary_reporting: event.target.value,
							})
						}>
						{empList?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.emp_name}
								</option>
							);
						})}
					</Select>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>
						Secondary Reporting{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Secondary Reporting'
						value={formData?.secondary_reporting}
						onChange={(event) =>
							setFormData({
								...formData,
								secondary_reporting: event.target.value,
							})
						}>
						{empList?.map((data, index) => {
							return (
								<option value={data.id} key={index}>
									{data.emp_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Week Off Variant{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Week-off Variant'
						value={formData?.weekoff}
						onChange={(event) =>
							setFormData({
								...formData,
								weekoff: event.target.value,
							})
						}>
						{fromValue.weekoff_variant?.map((data, index) => {
							return (
								<option value={data.variant_id} key={index}>
									{data.variant_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Approval-Variant{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Approval-Variant'
						value={formData?.approver}
						onChange={(event) =>
							setFormData({
								...formData,
								approver: event.target.value,
							})
						}>
						{fromValue.approval_variant?.map((data, index) => {
							return (
								<option value={data.variant_id} key={index}>
									{data.variant_name}
								</option>
							);
						})}
					</Select>
				</FormControl>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				flexWrap='wrap'
				mb='20px'>
				<FormControl w='31%'>
					<FormLabel>P-tax Variant</FormLabel>
					<Select
						placeholder='Select P-tax Variant'
						value={formData.ptax_variant}
						onChange={(event) =>
							setFormData({
								...formData,
								ptax_variant: event.target.value,
							})
						}>
						{fromValue?.ptax_variant?.map((data, index) => {
							return (
								<option value={data.variant_id} key={index}>
									{data.variant_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>
						Shift Variant{' '}
						<Box as='span' color='orange'>
							*
						</Box>
					</FormLabel>
					<Select
						placeholder='Select Shift Variant'
						value={formData.shift_variant}
						onChange={(event) =>
							setFormData({
								...formData,
								shift_variant: event.target.value,
							})
						}>
						{fromValue?.shift_variant?.map((data, index) => {
							return (
								<option value={data.shift_id} key={index}>
									{data.shift_name}
								</option>
							);
						})}
					</Select>
				</FormControl>

				<FormControl w='31%'>
					<FormLabel>Mark as Head of Department</FormLabel>
					<Checkbox
						onChange={(event) =>
							setFormData({
								...formData,
								hod: event.target.checked ? 1 : 0,
							})
						}
						colorScheme='red'
						size='lg'
						value={formData.hod}>
						Checkbox
					</Checkbox>
				</FormControl>
			</Box>
		</>
	);
};

export default EmpDetails;
