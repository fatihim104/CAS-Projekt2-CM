export interface User {
  uid?: string;
  email?: string;
  firstName?:string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  role?:UserRole;
}

export enum UserRole{
  USER = 'USER',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER'
}