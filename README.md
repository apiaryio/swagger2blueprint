# Swagger to API Blueprint Converter

Converts a [Swagger](http://swagger.io/) API description into the [API Blueprint](https://apiblueprint.org/) format. It is built on the [Fury.js](https://github.com/apiaryio/fury.js) API description library.

Currently supported is Swagger version 2.0. If you would like to convert
a Swagger 1.2 document, please first use [swagger-converter](https://github.com/apigee-127/swagger-converter).

## Installation

Requires [Node.js](https://nodejs.org/) and a compiler to install.

```bash
sudo npm install -g swagger2blueprint
```

## Usage

```bash
# Convert a local file to standard out
swagger2blueprint uber.yml

# Output to a file
swagger2blueprint uber.yml uber.apib

# Convert a URL
swagger2blueprint http://petstore.swagger.io/v2/swagger.json
```

## License

MIT License. See the [LICENSE](https://github.com/apiaryio/swagger2blueprint/blob/master/LICENSE) file.
