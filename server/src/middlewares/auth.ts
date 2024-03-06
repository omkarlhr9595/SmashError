import jwt = require("express-jwt");
import jwksClient = require("jwks-rsa");
const auth0Domain = process.env.AUTH0_DOMAIN;

const authCheck = jwt.expressjwt({
  secret: jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  }) as jwt.GetVerificationKey,
  audience: process.env.audience,
  issuer: `https://${auth0Domain}/`,
  algorithms: ["RS256"],
});

export { authCheck };
