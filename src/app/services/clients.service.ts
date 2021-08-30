import { Injectable } from '@angular/core';
import { clientsList } from '../services/clientslist';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor() {}

  getClients = () => {
    return clientsList;
  };

  getClient = (id: number) => {
    return clientsList[id - 1];
  };
}
