import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'http://localhost:5656/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri, withCredentials: true }),
    cache: new InMemoryCache({
      typePolicies: {
        Repair: {
          fields: {
            service: {
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
        Query: {
          fields: {
            getRepairsByState: {
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
      },
      addTypename: false,
    }),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
