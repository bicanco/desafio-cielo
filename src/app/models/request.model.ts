export interface PaginatedResponse<T> {
  summary: {
    totalQuantity: number;
    totalAmount: number;
    totalNetAmount: number;
    totalAverageAmount: number;
    initialDate: string;
    finalDate: string;
  };
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    numPages: number;
    lastPage: boolean;
    firstPage: boolean;
  };
  item: T[];
}
