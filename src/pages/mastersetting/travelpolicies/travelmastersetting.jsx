import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import TierMaster from './tiermaster';
import TravelMaster from './travelmaster';
import RegionMaster from './regionmaster';
import TierMapping from './tiermapping';

const TravelMasterSetting = () => {
	const [page, setPage] = useState(0);
	const FormTitles = [
		'Tier Master',
		'Mode of Travel Master',
		'Region Master',
		'State And Tier Mapping',
	];

	const PageDisplay = () => {
		if (page === 0) {
			return <TierMaster />;
		} else if (page === 1) {
			return <TravelMaster />;
		} else if (page === 2) {
			return <RegionMaster />;
		} else if (page === 3) {
			return <TierMapping />;
		} else {
			return <TierMaster />;
		}
	};

	return (
		<div className='form_travel_master'>
			{/* <div className="progressbar">
        <div
          style={{ width: page === 0 ? "16%" : page == 1 ? "24%" : page == 2 ? "32%" : page == 3 ? "50%" : page == 4 ? "66.6%" : "100%" }}
        ></div>
      </div> */}
			<Box className='form-container' h='100%'>
				<Box className='body'>{PageDisplay()}</Box>
				<Box w='100%' display='flex' justifyContent='flex-end'>
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
									console.log('Sucess');
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
									console.log('Sucess');
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
					) : (
						''
					)}
				</Box>
			</Box>
		</div>
	);
};

export default TravelMasterSetting;
