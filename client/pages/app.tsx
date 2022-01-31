import { ApolloProvider } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { Users } from '../components/users/Users'
import { apolloClient } from '../lib/apolloClient'

const about = () => {
  return (
    <React.Fragment>
      <Link href="/"><a>Back to Home</a></Link>
      <ApolloProvider client={apolloClient}>
        <Users />
      </ApolloProvider>
    </React.Fragment>
  )
}

export default about;