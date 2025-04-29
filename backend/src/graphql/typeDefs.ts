import {gql} from 'graphql-tag'

export const typeDefs = gql`
    type Receipt {
        id: ID!
        name: String!
        ingredients: [String!]
        calories: Int!
        price: Float!
        rates: Int!
        image: String!
    }
    
    type Banner {
        id: ID!
        name: String!
        image: String!
    }

    type Query {
        receipts: [Receipt],
        banners: [Banner]
    }
    
    type Mutation {
        addReceipt(name: String, ingredients: [String], calories: Int, price: Float, rates: Int, image: String): Receipt,
        addBanner(name: String, image: String): Banner,
    }
`