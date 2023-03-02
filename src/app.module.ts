import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path'
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from 'config/env.config';

@Module({
  imports: [
  ConfigModule.forRoot({
    load: [EnvConfiguration]}
  ),  //linea de codigo para decirle a nest que lea el archivo de variable de entorno .ENV importante instalar @nestjs/config
  ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
  }),
  
//MongooseModule.forRoot(process.env.MONGODB), // conexion a la base de datos Local en Docker 
MongooseModule.forRoot(process.env.MONGODBATLAS), // aca es donde indicamos la url de conexion a la base de datos puede ser local o en mi caso por MongoAtlas "cloud"


  PokemonModule, CommonModule, SeedModule
],
})
export class AppModule {

  constructor(){
    console.log(process.env)
  }
}
