const graphql = require("graphql");
const joinMonster = require("join-monster");
const client = require("./dbClient");

const User = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLString },
    firstsName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    adress: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    phoneNumber: { type: graphql.GraphQLInt },
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
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!",
    },
    users: {
      type: new graphql.GraphQLList(User),
      resolve: () => {
        client.query("select * from userprofile", [], (err, res) => {
          if (err) {
            console.log(err.message);
            return err.message;
          }
          console.log(res.rows);
          return res.rows;
        });
      },
    },
    player: {
      type: User,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (playerTable, args, context) => `${playerTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return client.query(sql);
        });
      },
    },
  }),
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;
