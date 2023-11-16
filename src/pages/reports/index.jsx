import { Box } from '@chakra-ui/react';
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import ReportList from './reportList';

const Reports = () => {
	let location = useLocation();
	return (
		<Box height='calc(100vh - 115px)' bg='rgba(230, 237, 239, 1)'>
			{location.pathname === '/reports' ? <ReportList /> : <Outlet />}
		</Box>
	);
};

export default Reports;
