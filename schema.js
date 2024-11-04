const graphql = require("graphql");
const graphqlJSON = require("graphql-type-json");

const User = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    firstname: { type: graphql.GraphQLString },
    lastname: { type: graphql.GraphQLString },
    adress: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    phonenumber: { type: graphql.GraphQLInt },
    password: { type: graphql.GraphQLString },
  }),
});

User._typeConfig = {
  sqlTable: "userprofile",
  uniqueKey: "id",
};

const Product = new graphql.GraphQLObjectType({
  name: "Product",
  fields: () => ({
    product_id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    categories: { type: graphql.GraphQLString },
    selling_price: { type: graphql.GraphQLInt },
    renting_price: { type: graphql.GraphQLInt },
    renting_price_unit: { type: graphql.GraphQLString },
    user_id: { type: graphql.GraphQLString },
    bought_by: { type: graphql.GraphQLString },
    rented_by: { type: graphql.GraphQLString },
    creating_date: { type: graphql.GraphQLString },
    buying_date: { type: graphql.GraphQLString },
    renting_date: { type: graphql.GraphQLString },
  }),
});

Product._typeConfig = {
  sqlTable: "product",
  uniqueKey: "id",
};

const Response = new graphql.GraphQLObjectType({
  name: "Response",
  fields: () => ({
    success: { type: graphql.GraphQLBoolean },
    message: { type: graphql.GraphQLString },
    data: graphqlJSON,
  }),
});

module.exports = { User, Product, Response };
