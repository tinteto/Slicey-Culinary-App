export interface User {
    email: string,
    username: string,
    password: string,
    _id: string,
    accessToken: string, 
}


export interface AuthUser {
    accessToken: string; 
    email: string;
    password: string;
    username: string;
    _createdOn: number;
    _id: string;
}

export interface UserProfileDetails {
    username: string;
    email: string;
  }
  
