export const selectBook = (state) => state.reading.book;
export const selectIsLoading = (state) => state.reading.isLoading;
export const selectError = (state) => state.reading.error;
export const selectActiveReading = (state) => state.reading.activeReading;
export const selectReadingProgress = (state) =>
	state.reading.book?.progress || [];
export const selectTimeLeftToRead = (state) =>
	state.reading.book?.timeLeftToRead;
export const selectBookId = (state) => state.reading.bookId;
export const selectHasActiveSession = (state) => state.reading.hasActiveSession;
