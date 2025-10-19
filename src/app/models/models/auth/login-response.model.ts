export interface LoginResponse {
  code: number;
  status: string;
  message: string;
  data?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
  };
}
