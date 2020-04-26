import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

const client = jwksClient({
  jwksUri: `https://pointapp.auth0.com/.well-known/jwks.json`
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: "In7MCkWcqQeuBKwKONpnYNIsd1Q04asR",
  issuer: "https://pointapp.auth0.com/",
  algorithms: ["RS256"],
};

const server = new ApolloServer({
  context: ({ req }) => {
    const token = req.headers && req.headers.authorization || '';
    if (!token) return { noAuth: true };
    const authPayload = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if(err) return reject(err);
        resolve(decoded);
      });
    });

    return { authPayload };
  },
  typeDefs,
  resolvers,
});

server.listen().then(({url}) => {
  console.log(`Server running at ${url}`);
});