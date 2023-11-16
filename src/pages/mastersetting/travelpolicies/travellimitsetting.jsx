import React, { useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import TravelLimits from './travellimits';
import AccomodationLimits from './accomodationlimits';
import FoodLimits from './foodlimits';
import LocalLimits from './locallimits';
import IncidentalLimits from './incidentallimits';

const TravelLimitSetting = () => {
	const [page, setPage] = useState(0);
	const FormTitles = [
		'Travel Limits',
		'Accomodation Limits',
		'Food Limits',
		'Local Limits',
		'Incidental Limits',
	];

	const PageDisplay = () => {
		if (page === 0) {
			return <TravelLimits />;
		} else if (page === 1) {
			return <AccomodationLimits />;
		} else if (page === 2) {
			return <FoodLimits />;
		} else if (page === 3) {
			return <LocalLimits />;
		} else if (page === 4) {
			return <IncidentalLimits />;
		} else {
			return <TravelLimits />;
		}
	};

	return (
		<Box className='form_travel_master'>
			<Box className='form-container' h='100%' position='relative'>
				<Box className='body'>{PageDisplay()}</Box>
				<Box
					w='78%'
					display='flex'
					justifyContent='space-between'
					position='absolute'
					bottom='20px'>
					{page === 0 ? (
						''
					) : (
						<Button
							mr='20px'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px 30px'
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
							disabled={page == 0}
							onClick={() => {
								setPage((currPage) => currPage - 1);
							}}>
							Prev
						</Button>
					)}
					{page === 0 ? (
						<Button
							mr='20px'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px 30px'
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
							onClick={() => {
								if (page === FormTitles.length - 1) {
									console.log('srijan');
								} else {
									setPage((currPage) => currPage + 1);
								}
							}}>
							Next
						</Button>
					) : page === 1 ? (
						<Button
							mr='20px'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px 30px'
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
							onClick={() => {
								if (page === FormTitles.length - 1) {
									console.log('srijan');
								} else {
									setPage((currPage) => currPage + 1);
								}
							}}>
							Next
						</Button>
					) : page === 2 ? (
						<Button
							mr='20px'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px 30px'
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
							onClick={() => {
								if (page === FormTitles.length - 1) {
									console.log('srijan');
								} else {
									setPage((currPage) => currPage + 1);
								}
							}}>
							Next
						</Button>
					) : page === 3 ? (
						<Button
							mr='20px'
							bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							borderRadius='10px'
							p='20px 30px'
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
							onClick={() => {
								if (page === FormTitles.length - 1) {
									console.log('srijan');
								} else {
									setPage((currPage) => currPage + 1);
								}
							}}>
							Next
						</Button>
					) : (
						''
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default TravelLimitSetting;
