const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./query");

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

CREATE TABLE UserProfile (
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phoneNumber INT,
    password VARCHAR (255)
);

insert into UserProfile (firstName, lastName, address, email, phoneNumber, password) 
values ('Hussain Md', 'Safwan', 'Dhaka, BD', 'safwan.du16@gmail.com', 761049, '123456');

insert into Team (name) values ('Big_Ms');
*/
