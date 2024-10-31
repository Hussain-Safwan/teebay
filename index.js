const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const pg = require("pg");
const config = require("./postgre_config");
const schema = require("./query");

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0].version);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});

const app = express();
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));

/*

postgres://avnadmin:AVNS_O-W_E4kaiYwbsTwlgt8@pg-26600bda-safwan-project.j.aivencloud.com:24849/defaultdb?sslmode=require

create table Player (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

insert into Player (id, first_name, last_name) values (1, 'Hussain Md', 'Safwan');

insert into Team (name) values ('Big_Ms');
*/
