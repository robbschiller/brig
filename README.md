## brig

> Boilerplate for building an Express app

## Development

Gulp is being used as the build tool, to run Gulp run:

````
$ gulp watch
````

The server listens on the port specified in the `config.yaml` file. To run the server run:

````
$ gulp server
````

To enable the server logger, export `NODE_ENV` to `development`.

```
$ export NODE_ENV=development
```

To have gulp run the server and the `watch` task, run:

```
$ gulp
```

## Running Tests

The test suite is run using [mocha](http://github.com/visionmedia/mocha). To run the suite run:

```
$ npm test
```

## License

MIT
