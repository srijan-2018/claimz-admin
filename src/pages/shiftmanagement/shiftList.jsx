import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ShiftDataTable from './shiftdatatable';

const ShiftList = () => {
	return (
		<Box
			background='white'
			border='1px solid #CECECE'
			boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
			borderRadius='6px'
			padding='15px'>
			<ShiftDataTable />
		</Box>
	);
};
export default ShiftList;
