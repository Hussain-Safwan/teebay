const graphql = require("graphql");
const joinMonster = require("join-monster");
const client = require("./dbClient");

const User = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    firstname: {
      type: graphql.GraphQLString,
    },
    lastname: { type: graphql.GraphQLString },
    adress: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    phonenumber: { type: graphql.GraphQLInt },
    password: { type: graphql.GraphQLString },
    // team: {
    //   type: Team,
    //   sqlJoin: (playerTable, teamTable, args) =>
    //     `${playerTable}.team_id = ${teamTable}.id`,
    // },
  }),
});

User._typeConfig = {
  sqlTable: "userprofile",
  uniqueKey: "id",
};

var Team = new graphql.GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    players: {
      type: graphql.GraphQLList(Player),
      sqlJoin: (teamTable, playerTable, args) =>
        `${teamTable}.id = ${playerTable}.team_id`,
    },
  }),
});

Team._typeConfig = {
  sqlTable: "team",
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
          const res = await client.query("select * from userprofile");
          return res.rows;
        },
      },
      user: {
        type: User,
        args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
        where: (userTable, args, context) => `${userTable}.id = ${args.id}`,
        resolve: async (args) => {
          const res = await client.query(
            `select * from userprofile where userprofile.id = ${args.id}`
          );
          console.log(res.rows);
          return res.rows;
        },
      },
    };
  },
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;
