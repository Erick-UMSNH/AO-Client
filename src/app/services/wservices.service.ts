import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class WservicesService {
  wservices: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;

  constructor(private apollo: Apollo) {}
  getWservices = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getWservices {
          getWservices {
            id
            name
            cost
            category
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getWservice = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getWservice($id: ID!) {
          getWservice(id: $id) {
            id
            name
            cost
            category
          }
        }
      `,
      variables: {
        id: id,
      },
    });
    return this.serviceQuery;
  };

  createWservice = (name: string, cost: number, category: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createWservice(
          $createWserviceName: String!
          $createWserviceCost: Float!
          $createWserviceCategory: String!
        ) {
          createWservice(
            name: $createWserviceName
            cost: $createWserviceCost
            category: $createWserviceCategory
          ) {
            id
            name
            cost
            category
          }
        }
      `,
      variables: {
        createWserviceName: name,
        createWserviceCost: cost,
        createWserviceCategory: category,
      },
    });
    return mutation;
  };

  deleteWservice = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteWservice($deleteWserviceId: ID!) {
          deleteWservice(id: $deleteWserviceId) {
            id
            name
            cost
            category
          }
        }
      `,
      variables: {
        deleteWserviceId: id,
      },
    });
    return mutation;
  };

  updateWservice = (
    id: string,
    name: string,
    cost: number,
    category: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateWservice(
          $updateWserviceId: ID!
          $updateWserviceName: String!
          $updateWserviceCost: Float!
          $updateWserviceCategory: String!
        ) {
          updateWservice(
            id: $updateWserviceId
            name: $updateWserviceName
            cost: $updateWserviceCost
            category: $updateWserviceCategory
          ) {
            id
            name
            cost
            category
          }
        }
      `,
      variables: {
        updateWserviceId: id,
        updateWserviceName: name,
        updateWserviceCost: cost,
        updateWserviceCategory: category,
      },
    });
    return mutation;
  };
}
