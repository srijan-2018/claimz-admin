import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Document = ({ formData, setFormData }) => {
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
				Documents
			</Heading>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl
					w='24%'
					sx={{
						'& > [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& > [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Aadhar Card Front
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								aadhar_front: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Aadhar Card Back
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								aadhar_back: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Voter Id Card Front
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								voter_front: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Voter Id Card Back
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								voter_back: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Pan Card Front
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								pan_front: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Pan Card Back
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								pan_back: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Passport Front
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								passport_front: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel textTransform='capitalize'>
						Passport Back
					</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								passport_back: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel>X th Marksheet</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								ten: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel>XII th Marksheet</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						onChange={(event) =>
							setFormData({
								...formData,
								twelve: event.target.files[0],
							})
						}
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel>Graduation (Last SEM Marksheet)</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>

				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel>Post Graduation (if any)</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>
			</Box>

			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mb='20px'>
				<FormControl
					w='24%'
					sx={{
						'& [type="file"]::-webkit-file-upload-button': {
							bg: '#F3F6FC',
							color: 'inputplaceholderColor',
							border: 'none',
							borderRight: '1px solid',
							borderColor: 'inputStrokeColor',
							borderRadius: '2px 0px 0px 2px',
							fontWeight: '500',
							fontSize: '1.3rem',
							height: '35px',
							lineHeight: '2.2rem',
							padding: '0px 10px',
							marginRight: '15px',
						},
						'& [type="file"]::-webkit-file-upload-button:hover': {
							bg: 'dataTableRowBorder',
						},
					}}>
					<FormLabel>Passbook Front Page</FormLabel>
					<Input
						type='file'
						placeholder='Logo'
						p='0px'
						sx={{
							'::file-selector-button': {
								borderTop: 'none',
								borderLeft: 'none',
								borderBottom: 'none',
								borderRight: '1px solid',
								borderRightColor:
									'var(--chakra-colors-inputStrokeColor);',
								outline: 'none',
								mr: 2,
								p: '12px 14px',
								color: 'var(--chakra-colors-inputplaceholderColor)',
								backgroundColor: '#f3f3f3',
							},
						}}
					/>
				</FormControl>
			</Box>
		</>
	);
};

export default Document;
