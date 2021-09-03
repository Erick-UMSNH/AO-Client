import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  vehicles: any[] = [];
  loading: boolean = true;
  error: any;
  serviceQuery?: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  getVehicles = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getVehicles {
          getVehicles {
            id
            brand
            model
            year
            color
            type
            plate
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getBrands = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getBrands {
          getBrands {
            id
            name
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getvehicle = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getVehicle($id: ID!) {
          getVehicle(id: $id) {
            id
            brand
            model
            year
            color
            type
            plate
          }
        }
      `,
      variables: {
        id: id,
      },
    });
    return this.serviceQuery;
  };

  createVehicle = (
    brand: string,
    model: string,
    year: string,
    color: string,
    type: string,
    plate: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createVehicle(
          $createVehicleBrand: String!
          $createVehicleModel: String!
          $createVehicleYear: String!
          $createVehicleColor: String
          $createVehicleType: String
          $createVehiclePlate: String!
        ) {
          createVehicle(
            brand: $createVehicleBrand
            model: $createVehicleModel
            year: $createVehicleYear
            color: $createVehicleColor
            type: $createVehicleType
            plate: $createVehiclePlate
          ) {
            id
            brand
            model
            year
            color
            type
            plate
          }
        }
      `,
      variables: {
        createVehicleBrand: brand,
        createVehicleModel: model,
        createVehicleYear: year,
        createVehicleColor: color,
        createVehicleType: type,
        createVehiclePlate: plate,
      },
    });
    return mutation;
  };

  deleteVehicle = (id: string) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation deleteVehicle($deleteVehicleId: ID!) {
          deleteVehicle(id: $deleteVehicleId) {
            id
            brand
            model
            year
            plate
          }
        }
      `,
      variables: {
        deleteVehicleId: id,
      },
    });
    return mutation;
  };

  updateVehicle = (
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
        mutation updatevehicle(
          $updateVehicleBrand: String!
          $updateVehicleModel: String!
          $updateVehicleYear: String!
          $updateVehicleColor: String
          $updateVehicleType: String
          $updateVehiclePlate: String!
        ) {
          updateVehicle(
            brand: $createVehicleBrand
            model: $createVehicleModel
            year: $createVehicleYear
            color: $createVehicleColor
            type: $createVehicleType
            plate: $createVehiclePlate
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
        updateVehicleId: id,
        updateVehicleBrand: brand,
        updateVehicleModel: model,
        updateVehicleYear: year,
        updateVehicleColor: color,
        updateVehicleType: type,
        updateVehiclePlate: plate,
      },
    });
    return mutation;
  };
}
