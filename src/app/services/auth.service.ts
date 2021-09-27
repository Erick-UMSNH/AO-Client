import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serviceQuery?: QueryRef<any>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<any>({});

  constructor(private apollo: Apollo) {}

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userInfo(): Observable<any> {
    return this.user.asObservable();
  }

  authenticateUser = (email: string, password: string) => {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query authenticateUser($authEmail: String!, $authPassword: String!) {
            authenticateUser(email: $authEmail, password: $authPassword) {
              user {
                id
                name
                lastName
                role
                photo
              }
              token
            }
          }
        `,
        variables: {
          authEmail: email,
          authPassword: password,
        },
      })
      .valueChanges.subscribe((result) => {
        console.log('Inside service check session: ', result);
        this.loggedIn.next(true);
        this.user.next(result.data.authenticateUser.user);
      });
  };

  checkSession = () => {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query checkSession {
            checkSession {
              id
              name
              lastName
              role
              photo
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        console.log('Inside service check session: ', result);
        this.loggedIn.next(true);
        this.user.next(result.data.checkSession);
      });
    // return this.serviceQuery;
  };
}
