export interface paginationData {
  limit: number;
  offset: number;
  sortBy: string;
  sortType: string;
  search: string;
}

export interface userVerify {
  otp: number;
  token: string;
}

export interface userSignupDetails {
  id?: number;
  firstname?: string;
  lastname?: string;
  email: string;
  phonenumber?: number;
  password?: string;
  role?: Array<string>;
}

export interface mailInterafce {
  toMail: string;
  subject: string;
  text: string;
  message: string;
}

export interface FindAndCountAllType {
  rows: Array<any>;
  count: number;
}

interface userObj {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: number;
  password: string;
  role: string;
}
