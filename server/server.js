const { ApolloServer, gql } = require('apollo-server');
const casual = require('casual');

const typeDefs = gql`
type user {
  id: ID,
  fullName: String,
  address: String,
  email: String,
  phone: String
}
type userConnection {
  nodes: [user]
}
type Query {
  users(limit: Int!, offset: Int): userConnection
}
`
casual.define('user', function (id) {
  return {
    id,
    fullName: casual.full_name,
    address: casual.address,
    email: casual.email,
    phone: casual.phone,
  }
})

const usersRecords = function (userCount) {
  const result = [];

  for (var i = 0; i < userCount; ++i) {
    result.push(casual.user(i));
  }
  return result;
};


const resolvers = {
  Query: {
    users: (query, {limit = 20, offset = 0}) => {
      const users = usersRecords(offset + limit);
      return {
        nodes: users.slice(offset, offset + limit).map((user => ({...user})))
      }
    },
  },
}


// ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

// Server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server started on ${url}`);
});