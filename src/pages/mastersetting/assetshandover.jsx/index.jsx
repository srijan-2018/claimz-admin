import { Box } from '@chakra-ui/react';
import React from 'react';
import AssetsList from './assetsList';

const AssetsHandover = () => {
	return (
		<Box
			background='white'
			border='1px solid #CECECE'
			boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
			borderRadius='6px'
			padding='0px 10px'>
			<AssetsList />
		</Box>
	);
};

export default AssetsHandover;
