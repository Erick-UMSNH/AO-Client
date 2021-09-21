import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;

  constructor(private apollo: Apollo, private httpClient: HttpClient) {}

  getUsers = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getUsers {
          getUsers {
            id
            name
            lastName
            areaCode
            email
            phone
            role
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getUser = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getUser($id: ID!) {
          getUser(id: $id) {
            id
            name
            lastName
            areaCode
            phone
            email
            role
            password
            rpassword
            photo
          }
        }
      `,
      variables: {
        id: id,
      },
    });
    return this.serviceQuery;
  };

  authenticateUser = (email: string, password: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query authenticateUser($authEmail: String!, $authPassword: String!) {
          authenticateUser(email: $authEmail, password: $authPassword) {
            user {
              id
              name
              lastName
              role
              photo
            }
            token
          }
        }
      `,
      variables: {
        authEmail: email,
        authPassword: password,
      },
    });
    return this.serviceQuery;
  };

  createUser = (
    name: string,
    lastName: string,
    areaCode: string,
    phone: string,
    email: string,
    role: string,
    password: string,
    rpassword: string,
    photo: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createUser(
          $createUserName: String!
          $createUserLastName: String
          $createUserAreaCode: String!
          $createUserPhone: String!
          $createUserEmail: String
          $createUserRole: String!
          $createUserPassword: String!
          $createUserRpassword: String!
          $createUserPhoto: String
        ) {
          createUser(
            name: $createUserName
            lastName: $createUserLastName
            areaCode: $createUserAreaCode
            phone: $createUserPhone
            email: $createUserEmail
            role: $createUserRole
            password: $createUserPassword
            rpassword: $createUserRpassword
            photo: $createUserPhoto
          ) {
            user {
              id
              name
              areaCode
              phone
              email
              role
              photo
            }
            token
          }
        }
      `,
      variables: {
        createUserName: name,
        createUserLastName: lastName,
        createUserAreaCode: areaCode,
        createUserPhone: phone,
        createUserEmail: email,
        createUserRole: role,
        createUserPassword: password,
        createUserRpassword: rpassword,
        createUserPhoto: photo,
      },
    });
    return mutation;
  };

  deleteUser = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteUser($deleteUserId: ID!) {
          deleteUser(id: $deleteUserId) {
            id
            name
            lastName
          }
        }
      `,
      variables: {
        deleteUserId: id,
      },
    });
    return mutation;
  };

  updateUser = (
    id: string,
    name: string,
    lastName: string,
    areaCode: string,
    phone: string,
    email: string,
    role: string,
    password: string,
    rpassword: string,
    photo: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateUser(
          $updateUserId: ID!
          $updateUserName: String!
          $updateUserLastName: String
          $updateUserAreaCode: String!
          $updateUserPhone: String!
          $updateUserEmail: String
          $updateUserRole: String!
          $updateUserPassword: String!
          $updateUserRpassword: String!
          $updateUserPhoto: String
        ) {
          updateUser(
            id: $updateUserId
            name: $updateUserName
            lastName: $updateUserLastName
            areaCode: $updateUserAreaCode
            phone: $updateUserPhone
            email: $updateUserEmail
            role: $updateUserRole
            password: $updateUserPassword
            rpassword: $updateUserRpassword
            photo: $updateUserPhoto
          ) {
            id
            name
            lastName
            areaCode
            phone
            email
          }
        }
      `,
      variables: {
        updateUserId: id,
        updateUserName: name,
        updateUserLastName: lastName,
        updateUserAreaCode: areaCode,
        updateUserPhone: phone,
        updateUserEmail: email,
        updateUserRole: role,
        updateUserPassword: password,
        updateUserRpassword: rpassword,
        updateUserPhoto: photo,
      },
    });
    return mutation;
  };

  uploadPhoto = async (photo: any) => {
    //Create a form data
    const formData = new FormData();
    //Append the photo
    formData.append('file', photo);
    //Go to the server
    return await this.httpClient
      .post<any>('http://localhost:5656/users/upload-photo', formData)
      .toPromise();
    // console.log('Result upload: ', resultUpload);
  };

  loginUser = async (email: string, password: string) => {
    //Go to the server
    const result = await this.httpClient
      .post<any>(
        'http://localhost:5656/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .toPromise();

    console.log('Result: ', result);
    return result;
  };
}
