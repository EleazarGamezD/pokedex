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

    const {data}= await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    data.results.forEach(async({name, url})=>{
      const segments = url.split ('/');
      const no:number = +segments[segments.length -2]
      const pokemon = await this.pokemonModel.create({name, no})
    })
    
    return 'Seed executed'
  }
}
