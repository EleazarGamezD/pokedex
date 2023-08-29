<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Ejecutar en desarrollo
```
1.- Clonar el Repositorio
```

2.- Ejecutar 
```
   npm install
```

3.- Tener nest CLI instalado
```
  npm i -g @nestjs/cli
```

4.- Levantar la base de datos 
```  
  docker-compose up -d 
```
5.- Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6.- Llenar las variables de entorno definidas en el __.env__

7.- ejecutar la aplicacion en dev 
```
npm run start:dev
```
8.-  construccion de la base de datos con el comando Seed 

```
 http://localhost:3000/api/v2/seed

```

#Build de produccion 
1.- crea el archivo ```.env.prod``` 
2.- llamar alas variables de de entorno prod 
3.- crear la nueva imagen 


__DOCKER__
## Build
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
## Run
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

## Nota
Por defecto, __docker-compose__ usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build
```