const graphql = require("graphql");
const joinMonster = require("join-monster");
const client = require("./dbClient");
const { User, Product, Response } = require("./schema");

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
      login: {
        type: User,
        args: {
          email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
          password: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from user_profile where user_profile.email = \'${args.email}\'`
          );

          if (res.rows.length === 0) {
            throw new Error("Email not found");
          } else if (res.rows[0].password !== args.password) {
            throw new Error("Invalid password");
          }

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

      product: {
        type: Product,
        args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from product where product.product_id = ${args.id}`
          );
          return res.rows[0];
        },
      },

      product_by_user_id: {
        type: new graphql.GraphQLList(Product),
        args: { user_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from product where product.user_id = ${args.user_id}`
          );
          return res.rows;
        },
      },

      product_by_buyer_id: {
        type: new graphql.GraphQLList(Product),
        args: {
          bought_by: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from product where product.bought_by = ${args.bought_by}`
          );
          return res.rows;
        },
      },

      product_by_renter_id: {
        type: new graphql.GraphQLList(Product),
        args: {
          rented_by: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        },
        resolve: async (parent, args, context, resolveInfo) => {
          const res = await client.query(
            `select * from product where product.rented_by = ${args.rented_by}`
          );
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
              "INSERT INTO user_profile (firstName, lastName, address, email, phoneNumber, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
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
          throw new Error("Failed to insert new user");
        }
      },
    },

    product: {
      type: Product,
      args: {
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        categories: { type: graphql.GraphQLString },
        selling_price: { type: graphql.GraphQLInt },
        renting_price: { type: graphql.GraphQLInt },
        renting_price_unit: { type: graphql.GraphQLString },
        user_id: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await client.query(
              "INSERT INTO product (title, description, categories, selling_price, renting_price, renting_price_unit, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
              [
                args.title,
                args.description,
                args.categories,
                args.selling_price,
                args.renting_price,
                args.renting_price_unit,
                args.user_id,
              ]
            )
          ).rows[0];
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },

    update_product: {
      type: Product,
      args: {
        product_id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        categories: { type: graphql.GraphQLString },
        selling_price: { type: graphql.GraphQLInt },
        renting_price: { type: graphql.GraphQLInt },
        renting_price_unit: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (
            await client.query(
              `UPDATE product 
              SET
                  title = \'${args.title}\', 
                  description = \'${args.description}\', 
                  categories = \'${args.categories}\', 
                  selling_price = \'${args.selling_price}\', 
                  renting_price = \'${args.renting_price}\',
                  renting_price_unit = \'${args.renting_price_unit}\'

              where product_id = \'${args.product_id}\'
              
              RETURNING *`,
              []
            )
          ).rows[0];
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },

    buy_product: {
      type: Product,
      args: {
        product_id: { type: graphql.GraphQLString },
        bought_by: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          const boughtBy =
            args.bought_by === "return" ? "NULL" : "'" + args.bought_by + "'";
          const date = args.bought_by === "return" ? "NULL" : "NOW()";
          return (
            await client.query(
              `UPDATE product 
              SET
                  bought_by = ${boughtBy}, 
                  buying_date = ${date}

              where product_id = \'${args.product_id}\'
              
              RETURNING *`,
              []
            )
          ).rows[0];
        } catch (err) {
          throw new Error(err.message);
        }
      },
    },

    rent_product: {
      type: Product,
      args: {
        product_id: { type: graphql.GraphQLString },
        rented_by: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          const rentedBy =
            args.rented_by === "return" ? "NULL" : "'" + args.rented_by + "'";
          const date = args.rented_by === "return" ? "NULL" : "NOW()";
          return (
            await client.query(
              `UPDATE product 
              SET
                  rented_by = ${rentedBy}, 
                  renting_date = ${date}
  
              where product_id = \'${args.product_id}\'
              
              RETURNING *`,
              []
            )
          ).rows[0];
        } catch (err) {
          throw new Error(err.message);
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
