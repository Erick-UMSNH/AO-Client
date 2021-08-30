import { Injectable } from '@angular/core';
import { Client } from '../models/Clients';
//import { clientsList } from '../services/clientslist';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients: any[] = [];
  loading: boolean = true;
  error: any;

  constructor(private apollo: Apollo) {}

  getClients = (): Observable<any> => {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          clients {
            id
            name
            lastName
            areaCode
            phone
            email
          }
        }
      `,
    }).valueChanges;
  };

  // getClients = async() =>{

  // }

  getClient = (id: string): Observable<any> => {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getClient($id: ID!) {
          client(id: $id) {
            id
            lastName
            areaCode
            phone
            email
          }
        }
      `,
    }).valueChanges;
  };
}
