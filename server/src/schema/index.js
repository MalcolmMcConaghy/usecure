import { gql } from 'apollo-server-express'
import courseResultSchema from './courseResult'
import userSchema from './user'

/*
  We use linkSchema so we can link all the schemas together and extend query/mutations/subscriptions
 */
const linkSchema = gql`
    scalar JSON
    scalar Date
    scalar Time
    scalar DateTime

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`
export default [
  linkSchema,
  userSchema, courseResultSchema
]