import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import Globalllayout from './pages/global/css/globalllayout';

const RequireAuth = () => {
	const location = useLocation();
	const user = localStorage.getItem('user');
	let token = localStorage.getItem('token');

	return token && user ? (
		<Globalllayout />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuth;
