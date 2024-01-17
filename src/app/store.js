import { configureStore } from '@reduxjs/toolkit';
import { dashboardGraph } from '../pages/dashboard/features/dashboardGraphApi';

export const store = configureStore({
	reducer: {
		[dashboardGraph.reducerPath]: dashboardGraph.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(dashboardGraph.middleware),
});
