import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import http from "http"
import db from './db'

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => {
    return {
      db
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
httpServer.listen({ port: process.env.PORT || 8000, host: '0.0.0.0' }, () => {
  console.log(`Apollo Server on http://0.0.0.0:${process.env.PORT || 8000}/graphql`)
})