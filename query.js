const graphql = require("graphql");
const joinMonster = require("join-monster");
const pg = require("pg");
const config = require("./postgre_config");

const client = new pg.Client(config);

const Player = new graphql.GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    first_name: { type: graphql.GraphQLString },
    last_name: { type: graphql.GraphQLString },
    // team: {
    //   type: Team,
    //   sqlJoin: (playerTable, teamTable, args) =>
    //     `${playerTable}.team_id = ${teamTable}.id`,
    // },
  }),
});

Player._typeConfig = {
  sqlTable: "Player",
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
    players: {
      type: new graphql.GraphQLList(Player),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, (sql) => {
          return client.query(sql);
        });
      },
    },
    player: {
      type: Player,
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
