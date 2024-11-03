const graphql = require("graphql");
const joinMonster = require("join-monster");
const client = require("./dbClient");

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

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!",
      },
      users: {
        type: new graphql.GraphQLList(User),
        resolve: async () => {
          const res = await client.query("select * from user_profile");
          return res.rows;
        },
      },
      user: {
        type: User,
        args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from userprofile where user_profile.id = ${args.id}`
          );
          console.log(res.rows);
          return res.rows[0];
        },
      },

      products: {
        type: new graphql.GraphQLList(Product),
        resolve: async () => {
          const res = await client.query("select * from product");
          return res.rows;
        },
      },
    };
  },
});

const MutationRoot = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    user: {
      type: User,
      args: {
        id: { type: graphql.GraphQLString },
        firstname: { type: graphql.GraphQLString },
        lastname: { type: graphql.GraphQLString },
        adress: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        phonenumber: { type: graphql.GraphQLInt },
        password: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await client.query(
              "INSERT INTO userprofile (firstName, lastName, address, email, phoneNumber, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
              [
                args.firstname,
                args.lastname,
                args.adress,
                args.email,
                args.phonenumber,
                args.password,
              ]
            )
          ).rows[0];
        } catch (err) {
          throw new Error("Failed to insert new player");
        }
      },
    },
  }),
});

const schema = new graphql.GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});

module.exports = schema;
