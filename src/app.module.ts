import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
  }),
  

MongooseModule.forRoot('mongodb+srv://sa:21121733@cluster0.gschvgu.mongodb.net/pokedex?retryWrites=true&w=majority'), // aca es donde indicamos la url de conexion a la base de datos puede ser local o en mi caso por MongoAtlas "cloud"


  PokemonModule, CommonModule, SeedModule
],
})
export class AppModule {}
