import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  suppliers: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;
  constructor(private apollo: Apollo) {}
  getSuppliers = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getSuppliers {
          getSuppliers {
            id
            name
            areaCode
            phone
            email
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getSupplier = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getSupplier($id: ID!) {
          getSupplier(id: $id) {
            id
            name
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

  createSupplier = (
    name: string,
    areaCode: string,
    phone: string,
    email: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createSupplier(
          $createSupplierName: String!
          $createSupplierAreaCode: String!
          $createSupplierPhone: String!
          $createSupplierEmail: String
        ) {
          createSupplier(
            name: $createSupplierName
            areaCode: $createSupplierAreaCode
            phone: $createSupplierPhone
            email: $createSupplierEmail
          ) {
            id
            name
            areaCode
            phone
          }
        }
      `,
      variables: {
        createSupplierName: name,
        createSupplierAreaCode: areaCode,
        createSupplierPhone: phone,
        createSupplierEmail: email,
      },
    });
    return mutation;
  };

  deleteSupplier = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteSupplier($deleteSupplierId: ID!) {
          deleteSupplier(id: $deleteSupplierId) {
            id
            name
          }
        }
      `,
      variables: {
        deleteSupplierId: id,
      },
    });
    return mutation;
  };

  updateSupplier = (
    id: string,
    name: string,
    areaCode: string,
    phone: string,
    email: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateSupplier(
          $updateSupplierId: ID!
          $updateSupplierName: String!
          $updateSupplierAreaCode: String!
          $updateSupplierPhone: String!
          $updateSupplierEmail: String
        ) {
          updateSupplier(
            id: $updateSupplierId
            name: $updateSupplierName
            areaCode: $updateSupplierAreaCode
            phone: $updateSupplierPhone
            email: $updateSupplierEmail
          ) {
            id
            name
            areaCode
            phone
            email
          }
        }
      `,
      variables: {
        updateSupplierId: id,
        updateSupplierName: name,
        updateSupplierAreaCode: areaCode,
        updateSupplierPhone: phone,
        updateSupplierEmail: email,
      },
    });
    return mutation;
  };
}
