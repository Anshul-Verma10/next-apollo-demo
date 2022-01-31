import { gql } from '@apollo/client';

export const USERS_INFO = gql`
  query USERS_INFO ($offset: Int) {
    users (limit: 20, offset: $offset) {
      nodes {
           id
          fullName
          address
          email
          phone        
      }
    }
  }
`;


