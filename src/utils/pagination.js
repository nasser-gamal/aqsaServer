exports.pagination = (pageNumber, itemPerPage, totalCount) => {
  const hasNextPage = itemPerPage * pageNumber < totalCount;
  const hasPreviousPage = pageNumber > 1;
  const hasNextTwoPage = itemPerPage * (pageNumber + 2) < totalCount;
  const hasNextThreePage = itemPerPage * (pageNumber + 3) < totalCount;

  return {
    page: pageNumber,
    itemPerPage,
    totalItems: totalCount,
    nextPage: pageNumber + 1,
    nextTwoPage: pageNumber + 2,
    nextThreePage: pageNumber + 3,
    previousPage: pageNumber - 1,
    currentPage: pageNumber,
    hasNextPage,
    hasNextTwoPage,
    hasNextThreePage,
    hasPreviousPage,
    hasPagination: totalCount > itemPerPage,
  };
};
