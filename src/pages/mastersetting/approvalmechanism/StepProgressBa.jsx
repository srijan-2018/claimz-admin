// src/components/StepProgressBar.js

import React from 'react';
import './StepProgressBar.css';
import { Box } from '@chakra-ui/react';

const StepProgressBar = ({ approval, variants }) => {
	return (
		<Box className='step-progress-bar'>
			<Box className='steps'>
				{approval?.map((step, index) => {
					return (
						<Box
							key={index}
							className={`step ${
								variants.variants[index]?.type_name ===
								step?.type_name
									? 'active'
									: ''
							}`}
							fontWeight='600'
							borderRadius='10px'>
							{step?.type_name}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default StepProgressBar;
