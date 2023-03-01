import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance }  from 'axios';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()



export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
  @InjectModel(Pokemon.name)
  private readonly pokemonModel:Model<Pokemon> ){}
 
  async executedSeed() {
await this.pokemonModel.deleteMany({}); // linea que limpia todos los registros es igual a // delete*from pokemons;
    const {data}= await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    const  pokemonToInsert: {name:string,no:number}[]=[]; //método de inserción de semilla en un solo arreglo 

    data.results.forEach(async({name, url})=>{
      const segments = url.split ('/');
      const no:number = +segments[segments.length -2]
      //const pokemon = await this.pokemonModel.create({name, no})
    pokemonToInsert.push({name,no});
    
    })
    await this.pokemonModel.insertMany(pokemonToInsert) // inserta los registros en un solo arreglo para reducir tiempo de ejecución en el server. 
    return 'Seed executed'
  }
}
