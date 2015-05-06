#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

>  Command-line client for AWS KMS


## Install as nodejs module (global)

```sh
$ npm install kms-cli -g
```
## Install as a docker executable container

#### Create an alias for a docker run command

```docker
docker run --rm --env-file .env ddffx/kms-cli /usr/local/bin/kms-cli "$@"
```
```
alias kms-cli=./run-cli.sh
```
## Usage

```sh
$ kms-cli --help
```
### Implemented Features
#### Encrypt
```
kms-cli encrypt -k my_kms_key_id --pt 'My plain text'
```
#### Decrypt
```
kms-cli decrypt  --ct 'My encrypted cipher text'
```
#### Describe Key
```
kms-cli describe  -k my_kms_key_id
```
## License

MIT © [Deb Das]()


[npm-image]: https://badge.fury.io/js/kms-cli.svg
[npm-url]: https://npmjs.org/package/kms-cli
[travis-image]: https://travis-ci.org/ddffx/kms-cli.svg?branch=master
[travis-url]: https://travis-ci.org/ddffx/kms-cli
[daviddm-image]: https://david-dm.org/ddffx/kms-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ddffx/kms-cli
