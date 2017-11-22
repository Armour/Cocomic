# Cocomic

An open-source platform for comic/manga collaboration

## Example

Placeholder here

## Stack

* [x] [express](http://expressjs.com/) - backend
* [x] [yarn](https://github.com/yarnpkg/yarn) - dependency manager
* [x] [gulp](https://github.com/gulpjs/gulp) - task runner
* [x] [materialize](http://materializecss.com/) - a modern responsive front-end framework based on Material Design
* [x] [sass](https://github.com/sass/sass) - CSS pre-processors
* [x] [postcss](https://github.com/postcss/postcss) - CSS post-processor
* [x] [webpack 3](https://github.com/webpack/webpack) - module bundler
* [x] [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) - offers a dev middleware for webpack, which arguments a live bundle to a directory
* [x] [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) - add hot reloading into an existing server without [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [x] followed [ES6 standard](https://github.com/lukehoban/es6features)
* [x] [babel](https://babeljs.io/) - compile ES6 to ES5
* [x] [react](https://facebook.github.io/react/) - building user interfaces
* [x] [react-hot-loader 3](https://github.com/gaearon/react-hot-loader) - hot module reload!
* [x] [react-router 4](https://github.com/ReactTraining/react-router) - routing
* [x] [react-redux](https://github.com/reactjs/react-redux) - the official react bindings for [redux](https://github.com/reactjs/redux) (a predictable state container for js apps)
* [x] [connected-react-router](https://github.com/supasate/connected-react-router) - a redux binding for react-router 4, currently a replacement for [react-router-redux v5](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)
* [x] [immutable.js](https://github.com/facebook/immutable-js/) - persistent Immutable data structures for react redux state management
* [x] [editorconfig](http://editorconfig.org/) - maintain consistent coding styles between different editors and IDEs
* [x] [eslint](http://eslint.org/) - lint javascript files (.js, .jsx)
* [x] [stylelint](https://stylelint.io/) - lint style files (.css, .scss)
* [x] [postgresql](https://www.postgresql.org/) - advanced open source database
* [x] [docker](https://github.com/docker/docker) - the open-source application container engine

## How to run the example code

### Prerequisite

* `node`
* `yarn` (recommended) or `npm`
* `docker` (optional)

Install [yarn](https://yarnpkg.com/en/docs/install#linux-tab) follows official documentation.

### Use docker

The easiest way to run the example project is to use `docker-compose`

```bash
docker-compose up
```

that's it :)

you can also manually install and run it by following below

### Install project dependencies

Go to project root directory:

```bash
yarn
yarn global add gulp
```

If you meet permission problem when try to install yarn globally, check [this](https://github.com/yarnpkg/yarn/issues/1060#issuecomment-268160528) out.

### Database setup

Make sure you have `postgresql` installed, and set the right configs in `backend/config.json`.

### Build & Run

On development (with react-hot-reload):

```bash
gulp
```

On production (with uglify-js and other optimazitions):

```bash
NODE_ENV=production gulp
```

### Profile assets bundle

```bash
gulp profile
```

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D

## License

MIT License
