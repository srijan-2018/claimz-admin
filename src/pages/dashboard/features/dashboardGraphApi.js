import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardGraph = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_API_URL}`,
		// Include the token in the headers
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token'); // Change 'yourTokenKey' to your actual token key
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),

	endpoints: (builder) => ({
		getEventList: builder.query({
			query: () => '/event-list-dashboard',
			providesTags: ['EventList'],
			refetchOnMountOrArgChange: true,
		}),
		getAttendanceList: builder.query({
			query: () => '/attendance-list-dashboard',
			providesTags: ['AttendanceList'],
		}),
		getDesignationWiseEmployee: builder.query({
			query: () => '/designation-wise-employee',
			providesTags: ['DesignationWiseEmployee'],
		}),
		getAgeWiseEmployee: builder.query({
			query: () => '/age-wise-employee',
			providesTags: ['AgeWiseEmployee'],
		}),
		getGradeWiseEmployee: builder.query({
			query: () => '/grade-wise-employee',
			providesTags: ['GradeWiseEmploye'],
		}),
		merge: builder.query({
			query: () => '/merge-endpoint',
			providesTags: ['Merge'],
		}),
	}),
});

export const {
	useGetEventListQuery,
	useGetAttendanceListQuery,
	useGetDesignationWiseEmployeeQuery,
	useGetAgeWiseEmployeeQuery,
	useGetGradeWiseEmployeeQuery,
	useMergeQuery,
} = dashboardGraph;
