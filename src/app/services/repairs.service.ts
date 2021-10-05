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
            comments
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
            comments
          }
        }
      `,
      variables: {
        id: id,
      },
    });
    return this.serviceQuery;
  };

  getRepairsByState = (state: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getRepairsByState($repairState: String!) {
          getRepairsByState(state: $repairState) {
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
            comments
          }
        }
      `,
      variables: {
        repairState: state,
      },
    });
    return this.serviceQuery;
  };

  getRepairsStats = (state: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getRepairsByStateUnsorted($repairState: String!) {
          getRepairsByStateUnsorted(state: $repairState) {
            name: date
            value: total
          }
        }
      `,
      variables: {
        repairState: state,
      },
    });
    return this.serviceQuery;
  };

  getQuantityServiceStats = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getQuantityServiceStats {
          getQuantityServiceStats {
            name
            value
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getQuantityStatusStats = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getQuantityStatusStats {
          getQuantityStatusStats {
            name
            value
          }
        }
      `,
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
    total: number,
    comments: string
  ) => {
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
          $createRepairComments: String
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
            comments: $createRepairComments
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
            comments
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
        createRepairComments: comments,
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
            comments
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
    total: number,
    comments: string
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
          $updateRepairComments: String
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
            comments: $updateRepairComments
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
            comments
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
        updateRepairComments: comments,
      },
    });
    return mutation;
  };

  updateStatusRepair = (id: string, status: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateStatusRepair(
          $updateRepairId: ID!
          $updateRepairStatus: String!
        ) {
          updateStatusRepair(id: $updateRepairId, status: $updateRepairStatus) {
            id
            status
            vehicle {
              brand
              model
            }
          }
        }
      `,
      variables: {
        updateRepairId: id,
        updateRepairStatus: status,
      },
    });
    return mutation;
  };
}
