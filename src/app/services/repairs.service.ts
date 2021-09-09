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
    total: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createRepair(
          $createRepairDate: String!
          $createRepairTime: String!
          $createRepairClient: String!
          $createRepairVehicle: String
          $createRepairKm: Int
          $createRepairRims: Int
          $createRepairCovers: Int
          $createRepairConcept: String
          $createRepairService: String!
          $createRepairStatus: String!
          $createRepairTotal: Int!
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

  deleterepair = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleterepair($deleterepairId: ID!) {
          deleterepair(id: $deleterepairId) {
            id
            brand
            model
            year
            plate
          }
        }
      `,
      variables: {
        deleterepairId: id,
      },
    });
    return mutation;
  };

  updaterepair = (
    id: string,
    brand: string,
    model: string,
    year: string,
    color: string,
    type: string,
    plate: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updaterepair(
          $updaterepairId: ID!
          $updaterepairBrand: String!
          $updaterepairModel: String!
          $updaterepairYear: String!
          $updaterepairColor: String
          $updaterepairType: String
          $updaterepairPlate: String!
        ) {
          updaterepair(
            id: $updaterepairId
            brand: $updaterepairBrand
            model: $updaterepairModel
            year: $updaterepairYear
            color: $updaterepairColor
            type: $updaterepairType
            plate: $updaterepairPlate
          ) {
            id
            brand
            model
            year
            plate
          }
        }
      `,
      variables: {
        updaterepairId: id,
        updaterepairBrand: brand,
        updaterepairModel: model,
        updaterepairYear: year,
        updaterepairColor: color,
        updaterepairType: type,
        updaterepairPlate: plate,
      },
    });
    return mutation;
  };
}
