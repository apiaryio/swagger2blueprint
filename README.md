# Swagger to API Blueprint Converter

Converts a [Swagger](http://swagger.io/) API description into the [API Blueprint](https://apiblueprint.org/) format. It is built on the [Fury.js](https://github.com/apiaryio/fury.js) API description library.

## Installation

Requires [Node.js](https://nodejs.org/) and a compiler to install.

```bash
sudo npm install -g swagger2blueprint
```

## Usage

```bash
# Convert a local file
swagger2blueprint uber.yml

# Output to a file
swagger2blueprint uber.yml >uber.apib

# Specify Swagger version
swagger2blueprint -s 2.0 uber.yml

# Convert a URL
swagger2blueprint http://petstore.swagger.io/v2/swagger.json
```

## License

MIT License. See the LICENSE file.
