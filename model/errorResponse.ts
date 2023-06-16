export interface ErrorResponse {
  message: string;
  stack: string;
  statusCode: number;
  statusMessage: string;
  url: string;
}