export interface LoginDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface SetPasswordDto {
  token: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserTableDto {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UpdateAccountDto {
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: string;
}

export interface CreateEmployeeDto {
  email?: string;
  password?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  accountRole: 0;
}

export interface CompanyTableDto {
  id: number;
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
}

export interface UpdateAccountInfo {
  phoneNumber: string;
  cardNo: string;
}

export interface UpdateCompany {
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
}
