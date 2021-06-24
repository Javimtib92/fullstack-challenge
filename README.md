# Dev Test

Please read this docs in order to setup and run the application.

This project use `yarn workspaces` in order to have a fullstack monorepo.

The client was generated using [create-react-app](https://create-react-app.dev/docs/adding-typescript/) with the typescript template flag.

The server was generated using [express-generator-typescript](https://www.npmjs.com/package/express-generator-typescript) and then adapted
to the project.

## How to run the application

First of all, we need to install the npm packages. With _yarn workspaces_ we only need to run
`yarn install` at the root of the project and this will install the required packages for client
and server.

After that, everything is ready to run the application!

## Run in dev server

To run the dev server you need to open two CLI prompts and navigate to the root of the project.

On one prompt run the client using
`yarn start:client-dev`

On the other prompt run the server using 
`yarn start:server-dev`

## Run a production build

To run a production build we need, first of all, to build client and server.

On the project's root run `yarn build`

This will use _yarn workspaces_ to build both packages.

>You can also build the projects separately by running the following commands:
>
> `yarn build:client`
> `yarn build:server`

After that, start client and the server by running:

`yarn start:client` and `yarn start:server` in separate CLI tabs.

## Run Client Tests

Run the command `yarn test:client`

## Run Server Tests

Run the command `yarn test:server`

## Lint the project

You can run eslint in both packages at once by running:

`yarn lint`

Alternatively, if you want to fix linting errors you can run:

`yarn lint --fix`
