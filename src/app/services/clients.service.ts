import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  getClients = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getClients {
          getClients {
            id
            name
            lastName
            areaCode
            phone
            email
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getClient = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getClient($id: ID!) {
          getClient(id: $id) {
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
        id: id,
      },
    });
    return this.serviceQuery;
  };

  createClient = (
    name: string,
    lastName: string,
    areaCode: string,
    phone: string,
    email: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createClient(
          $createClientName: String!
          $createClientLastName: String
          $createClientAreaCode: String!
          $createClientPhone: String!
          $createClientEmail: String
        ) {
          createClient(
            name: $createClientName
            lastName: $createClientLastName
            areaCode: $createClientAreaCode
            phone: $createClientPhone
            email: $createClientEmail
          ) {
            id
            name
            areaCode
            phone
          }
        }
      `,
      variables: {
        createClientName: name,
        createClientLastName: lastName,
        createClientAreaCode: areaCode,
        createClientPhone: phone,
        createClientEmail: email,
      },
    });
    return mutation;
  };

  deleteClient = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteClient($deleteClientId: ID!) {
          deleteClient(id: $deleteClientId) {
            id
            name
            lastName
          }
        }
      `,
      variables: {
        deleteClientId: id,
      },
    });
    return mutation;
  };

  updateClient = (
    id: string,
    name: string,
    lastName: string,
    areaCode: string,
    phone: string,
    email: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateClient(
          $updateClientId: ID!
          $updateClientName: String!
          $updateClientLastName: String
          $updateClientAreaCode: String!
          $updateClientPhone: String!
          $updateClientEmail: String
        ) {
          updateClient(
            id: $updateClientId
            name: $updateClientName
            lastName: $updateClientLastName
            areaCode: $updateClientAreaCode
            phone: $updateClientPhone
            email: $updateClientEmail
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
        updateClientId: id,
        updateClientName: name,
        updateClientLastName: lastName,
        updateClientAreaCode: areaCode,
        updateClientPhone: phone,
        updateClientEmail: email,
      },
    });
    return mutation;
  };
}
