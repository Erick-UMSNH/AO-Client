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

  getTotal = (rows: any[]) => {
    return rows.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  };

  getRepairs = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getRepairs {
          getRepairs {
            id
            order
            date
            time
            client {
              id
              name
              lastName
              areaCode
              phone
              email
            }
            vehicle {
              id
              brand
              model
              year
              color
              category
              plate
            }
            km
            rims
            covers
            concept
            service {
              id
              name
              category
              quantity
              cost
              amount
            }
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
            client {
              id
              name
              lastName
              areaCode
              phone
              email
            }
            vehicle {
              id
              brand
              model
              year
              color
              category
              plate
            }
            km
            rims
            covers
            concept
            service {
              id
              name
              category
              quantity
              cost
              amount
            }
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
    client: {
      id: string;
      name: string;
      lastName: string;
      areaCode: string;
      phone: string;
      email: string;
    },
    vehicle: {
      id: string;
      brand: string;
      model: string;
      year: string;
      color: string;
      category: string;
      plate: string;
    },
    km: number,
    rims: number,
    covers: number,
    concept: string,
    service: any[],
    status: string,
    total: number
  ) => {
    console.log('COVERS:', covers);
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createRepair(
          $createRepairDate: String!
          $createRepairTime: String!
          $createRepairClient: ClientInput!
          $createRepairVehicle: VehicleInput!
          $createRepairKm: Int
          $createRepairRims: Int
          $createRepairCovers: Int
          $createRepairConcept: String
          $createRepairService: [WserviceItemInput!]
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
            client {
              id
              name
              lastName
              areaCode
              phone
              email
            }
            vehicle {
              id
              brand
              model
              year
              color
              category
              plate
            }
            km
            rims
            covers
            concept
            service {
              id
              name
              category
              quantity
              cost
              amount
            }
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
            client {
              id
              name
              lastName
              areaCode
              phone
              email
            }
            vehicle {
              id
              brand
              model
              year
              color
              category
              plate
            }
            km
            rims
            covers
            concept
            service {
              id
              name
              category
              quantity
              cost
              amount
            }
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
    client: {
      id: string;
      name: string;
      lastName: string;
      areaCode: string;
      phone: string;
      email: string;
    },
    vehicle: {
      id: string;
      brand: string;
      model: string;
      year: string;
      color: string;
      category: string;
      plate: string;
    },
    km: number,
    rims: number,
    covers: number,
    concept: string,
    service: any[],
    status: string,
    total: number
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateRepair(
          $updateRepairId: ID!
          $updateRepairDate: String!
          $updateRepairTime: String!
          $updateRepairClient: ClientInput!
          $updateRepairVehicle: VehicleInput!
          $updateRepairKm: Int
          $updateRepairRims: Int
          $updateRepairCovers: Int
          $updateRepairConcept: String
          $updateRepairService: [WserviceItemInput!]
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
            client {
              id
              name
              lastName
              areaCode
              phone
              email
            }
            vehicle {
              id
              brand
              model
              year
              color
              category
              plate
            }
            km
            rims
            covers
            concept
            service {
              id
              name
              category
              quantity
              cost
              amount
            }
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
