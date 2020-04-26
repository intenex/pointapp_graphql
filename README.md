# Point Backend Engineering Challenge 

### Installation:

To install dependencies: `yarn install && cd client && yarn install`

To run the backend API server, in the main project directory: `yarn start`

To run the frontend React server in the client directory: `cd client && yarn start`

The backend API server is hosted at http://localhost:4000

The frontend React server is hosted at http://localhost:3000

### Functionality

#### Backend

There are GraphQL endpoints to:

##### Query

* find all `users`

* find a specific `user ` by email

* find all `tweets`

* find a specific `tweet` by id
* find all `tweets` nested under a `user` found by email
* find the author `user` nested under a `tweet` found by id

Example queries:

```graphql
query getAllTweets {
  tweets{
    body,
    user {
      email
    }
  }
}
```

```graphql
query getUserTweets {
  user(email:"kenan@point.app"){
    tweets {
      body
    }
  }
}
```

##### Mutate

* `createUser` with an email
* `createTweet` with a body (string of text) along with a user `email` retrieved automatically from an HTTP request header (namedspaced at `req.headers.authorization`) decrypted from a JSON Web Token signed by an Auth0 key. The design of the app automatically passes these headers along with every single HTTP request from the frontend Apollo Client.

Example mutation:

```graphql
# note that this fails without an appropriate HTTP request header passing an auth payload
# can use this in the playground to verify that authentication is in fact happening however

mutation createTweet {
  createTweet(body:"Hello World"){
    body
  }
}
```

Data is stored in a basic sqlite database locally hosted at `./pointapp.sqlite`. Decided to go with that to provide a simple real SQL implementation that still requires no setup effort for anyone running the app.

#### Frontend

A very basic React app is provided with endpoints to facilitate:

* Logging in/signing up/logging out via Auth0
* Viewing all tweets at `/`
* Viewing all tweets by a specific user at `/user`. This is an authentication protected route.
* Creating a tweet at `/create`. This is an authentication protected route.

To most closely follow HTTP Header authentication practices recommended by Apollo (https://www.apollographql.com/docs/react/networking/authentication/), I chose this route of automatically storing and passing along the encrypted JWT tokens produced by Auth0 in the HTTP headers of every request the client sends to the backend GraphQL api server. Consequently, by far the easiest way to test the authentication protected route `createTweet` GraphQL endpoint is to utilize the provided frontend as it would be done in a real application. Otherwise, the encrypted idToken provided by an Auth0 login would need to be captured and manually inserted into an HTTP request's header in order to pass the backend authentication.

## Pros and Cons

### Pros

* Pretty secure authentication utilizing Auth0. The decision to use an encrypted JWT token signed with a private key stored on Auth0's servers means that most of the security is abstracted away to Auth0 - as long as my private key isn't leaked, it would be difficult to spoof authentication and gain unauthorized access to a user's account and post/delete/modify tweets on their behalf.
* Less culpability/liability if Auth0 gets hacked and loses all the data! It was their fault!

### Cons

* I'm reliant on an external service, Auth0, for my authentication. It essentially serves as a blackbox for my application, and I'm effectively trusting them to be more responsible with my user information than I myself would be. This is overall a pretty good bet - delegating something as critical as authentication to a professional enterprise specialist is probably less privy to vulnerability than rolling my own auth.
* Rather difficult to migrate away from Auth0 to another service or a homespun solution in the future. The security/ownership tradeoff I've made is to entrust Auth0 with all my sensitive user information. I could choose to migrate to my own database storage and maintain a connection to Auth0, but there are vulnerabilities introduced there that are nice to avoid.
* A little harder to manually authenticate and just directly pass login credentials in a query and have the resolver manage to handle that and retrieve the data requested.

For simplicity, I'm also just directly using an Apollo Server instance rather than plugging it in to a more full fledged server framework like Express. Clear downsides in limited functionality and optionality here, but the upside is a slightly more straightforward and implementation which served my very limited purposes here well.

