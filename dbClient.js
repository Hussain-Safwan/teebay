const pg = require("pg");

const config = {
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "teebay",
  // connectionTimeoutMillis: 2000,
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0].version);
  });
});

module.exports = client;
