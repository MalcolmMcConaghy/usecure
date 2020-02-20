import GraphQLJSON from 'graphql-type-json'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import userResolvers from './user'
import courseResultResolvers from './courseResult'

/*
  This allows us to use JSON/Date/Time/DateTime types when returning data from GraphQL
 */
const customScalarResolver = {
  JSON: GraphQLJSON,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
}

export default [
  userResolvers, courseResultResolvers
]

