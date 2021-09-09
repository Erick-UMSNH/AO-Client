import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RepairsService {
  repairs: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;

  constructor(private apollo: Apollo) {}
  getRepairs = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getRepairs {
          getRepairs {
            id
            order
            date
            time
            client
            vehicle
            km
            rims
            covers
            concept
            service
            status
            total
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getRepair = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getRepair($id: ID!) {
          getRepair(id: $id) {
            id
            order
            date
            time
            client
            vehicle
            km
            rims
            covers
            concept
            service
            status
            total
          }
        }
      `,
      variables: {
        id: id,
      },
    });
    return this.serviceQuery;
  };

  createRepair = (
    date: string,
    time: string,
    client: string,
    vehicle: string,
    km: number,
    rims: number,
    covers: number,
    concept: string,
    service: string,
    status: string,
    total: number
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createRepair(
          $createRepairDate: String!
          $createRepairTime: String!
          $createRepairClient: String!
          $createRepairVehicle: String!
          $createRepairKm: Int
          $createRepairRims: Int
          $createRepairCovers: Int
          $createRepairConcept: String
          $createRepairService: String!
          $createRepairStatus: String!
          $createRepairTotal: Float!
        ) {
          createRepair(
            date: $createRepairDate
            time: $createRepairTime
            client: $createRepairClient
            vehicle: $createRepairVehicle
            km: $createRepairKm
            rims: $createRepairRims
            covers: $createRepairCovers
            concept: $createRepairConcept
            service: $createRepairService
            status: $createRepairStatus
            total: $createRepairTotal
          ) {
            id
            order
            date
            time
            client
            vehicle
            km
            rims
            covers
            concept
            service
            status
            total
          }
        }
      `,
      variables: {
        createRepairDate: date,
        createRepairTime: time,
        createRepairClient: client,
        createRepairVehicle: vehicle,
        createRepairKm: km,
        createRepairRims: rims,
        createRepairCovers: covers,
        createRepairConcept: concept,
        createRepairService: service,
        createRepairStatus: status,
        createRepairTotal: total,
      },
    });
    return mutation;
  };

  deleteRepair = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteRepair($deleteRepairId: ID!) {
          deleteRepair(id: $deleteRepairId) {
            id
            order
            date
            time
            client
            vehicle
            km
            rims
            covers
            concept
            service
            status
            total
          }
        }
      `,
      variables: {
        deleteRepairId: id,
      },
    });
    return mutation;
  };

  updateRepair = (
    id: string,
    date: string,
    time: string,
    client: string,
    vehicle: string,
    km: number,
    rims: number,
    covers: number,
    concept: string,
    service: string,
    status: string,
    total: number
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateRepair(
          $updateRepairId: ID!
          $updateRepairDate: String!
          $updateRepairTime: String!
          $updateRepairClient: String!
          $updateRepairVehicle: String!
          $updateRepairKm: Int
          $updateRepairRims: Int
          $updateRepairCovers: Int
          $updateRepairConcept: String
          $updateRepairService: String!
          $updateRepairStatus: String!
          $updateRepairTotal: Float!
        ) {
          updateRepair(
            id: $updateRepairId
            date: $updateRepairDate
            time: $updateRepairTime
            client: $updateRepairClient
            vehicle: $updateRepairVehicle
            km: $updateRepairKm
            rims: $updateRepairRims
            covers: $updateRepairCovers
            concept: $updateRepairConcept
            service: $updateRepairService
            status: $updateRepairStatus
            total: $updateRepairTotal
          ) {
            id
            order
            date
            time
            client
            vehicle
            km
            rims
            covers
            concept
            service
            status
            total
          }
        }
      `,
      variables: {
        updateRepairId: id,
        updateRepairDate: date,
        updateRepairTime: time,
        updateRepairClient: client,
        updateRepairVehicle: vehicle,
        updateRepairKm: km,
        updateRepairRims: rims,
        updateRepairCovers: covers,
        updateRepairConcept: concept,
        updateRepairService: service,
        updateRepairStatus: status,
        updateRepairTotal: total,
      },
    });
    return mutation;
  };
}
