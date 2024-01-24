// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const allEmployeeList = createApi({
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: `${process.env.REACT_APP_API_URL}`,
// 		// Include the token in the headers
// 		prepareHeaders: (headers) => {
// 			const token = localStorage.getItem('token'); // Change 'yourTokenKey' to your actual token key
// 			if (token) {
// 				headers.set('Authorization', `Bearer ${token}`);
// 			}
// 			return headers;
// 		},
// 	}),

// 	endpoints: (builder) => ({
// 		getEmployeeList: builder.query({
// 			query: (rows, first) => `/emp-list/${rows}?page=${first}`,
// 			providesTags: ['EmployeeList'],
// 			refetchOnMountOrArgChange: true,
// 		}),
// 	}),
// });

// export const { useGetEmployeeListQuery } = allEmployeeList;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const allEmployeeList = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),

	endpoints: (builder) => ({
		getEmployeeList: builder.query({
			query: (rows, first) => `/emp-list/${rows}?page=${first}`,
			providesTags: ['EmployeeList'],
			refetchOnMountOrArgChange: true,
		}),
	}),
});

export const { useGetEmployeeListQuery } = allEmployeeList;
