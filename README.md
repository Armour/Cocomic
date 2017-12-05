# Cocomic

An open-source platform for comic/manga collaboration

## How to run the example code
### develop version
* run `vagrant up` in console
* visit `localhost:3003`

### production version
* visit [https://cocomic.azendless.com/](https://cocomic.azendless.com/)

## Features Might be Easily Missed
* responsiveness

## Functions
* Register
* Login
* User Center
  * My collection: books created by the user
    * click + to upload a new book
  * Bookmarks
* Home
  * 6 most popular books
  * 6 newest books
* Popular: comic books sorted by popularity
* New: comic books sorted by create time
* Click a book to open:
  * book cover and author info
  * chapters
    * at the end of chapter, click to place a bookmark, to like the chapter or to create a new chapter (new branch), or to edit the chapter
    * at the end of chapter, drag the carousel to select the next chapter to read

## Known bugs
* Branch switch doesn't on ios chrome

## Tech Stack

* [x] [express](http://expressjs.com/) - backend
* [x] [nginx](https://www.nginx.com/) - reverse proxy
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
* [x] [Google Cloud Platform](https://cloud.google.com/) - build and host applications and websites, store data, and analyze data on Google's scalable infrastructure
* [x] [let's encrypt](https://letsencrypt.org/) - free SSL/TLS certificates


## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D

## License

MIT License
