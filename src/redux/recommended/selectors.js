export const selectRecommendedBooks = (state) => state.recommended.items;
export const selectIsLoading = (state) => state.recommended.isLoading;
export const selectError = (state) => state.recommended.error;
export const selectTotalPages = (state) => state.recommended.totalPages;
export const selectCurrentPage = (state) => state.recommended.currentPage;
export const selectPerPage = (state) => state.recommended.perPage;
export const selectFilters = (state) => state.recommended.filters;
