export const selectBooks = (state) => state.library.books;
export const selectIsLoading = (state) => state.library.isLoading;
export const selectError = (state) => state.library.error;
export const selectCurrentStatus = (state) => state.library.currentStatus;

export const selectFilteredBooks = (state) => {
	const books = state.library.books;
	const status = state.library.currentStatus;

	if (!status || status === "all") {
		return books;
	}

	return books.filter((book) => book.status === status);
};
