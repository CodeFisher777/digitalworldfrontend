import { RootState } from '../../store';

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectSortDirection = (state: RootState) => state.filter.sortDirection;
