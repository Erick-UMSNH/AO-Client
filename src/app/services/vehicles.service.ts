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
            category
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

  getCategories = () => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getCategories {
          getCategories {
            id
            name
          }
        }
      `,
    });
    return this.serviceQuery;
  };

  getVehicle = (id: string) => {
    this.serviceQuery = this.apollo.watchQuery<any>({
      query: gql`
        query getVehicle($id: ID!) {
          getVehicle(id: $id) {
            id
            brand
            model
            year
            color
            category
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
    category: string,
    plate: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createVehicle(
          $createVehicleBrand: String!
          $createVehicleModel: String!
          $createVehicleYear: String!
          $createVehicleColor: String
          $createVehicleCategory: String
          $createVehiclePlate: String!
        ) {
          createVehicle(
            brand: $createVehicleBrand
            model: $createVehicleModel
            year: $createVehicleYear
            color: $createVehicleColor
            category: $createVehicleCategory
            plate: $createVehiclePlate
          ) {
            id
            brand
            model
            year
            color
            category
            plate
          }
        }
      `,
      variables: {
        createVehicleBrand: brand,
        createVehicleModel: model,
        createVehicleYear: year,
        createVehicleColor: color,
        createVehicleCategory: category,
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
    category: string,
    plate: string
  ) => {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation updateVehicle(
          $updateVehicleId: ID!
          $updateVehicleBrand: String!
          $updateVehicleModel: String!
          $updateVehicleYear: String!
          $updateVehicleColor: String
          $updateVehicleCategory: String
          $updateVehiclePlate: String!
        ) {
          updateVehicle(
            id: $updateVehicleId
            brand: $updateVehicleBrand
            model: $updateVehicleModel
            year: $updateVehicleYear
            color: $updateVehicleColor
            category: $updateVehicleCategory
            plate: $updateVehiclePlate
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
        updateVehicleCategory: category,
        updateVehiclePlate: plate,
      },
    });
    return mutation;
  };
}
