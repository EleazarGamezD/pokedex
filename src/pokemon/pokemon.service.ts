import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
 
 constructor(
  @InjectModel(Pokemon.name)
  private readonly pokemonModel:Model<Pokemon> ){}
 

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase(); // para grabar los nombres en minúsculas 
    // se usa try and catch para poder realizar validacion de usario o nro repetido usando una unica consulta a la DB y ahorrar tiempo y recursos 
    try {    const pokemon = await this.pokemonModel.create(createPokemonDto)    // validamos que el nro o usuario no exista para poder crearlo en DATABASE 
    return pokemon;}
    catch (error){                // Si el usuario o nro existe devolvemos el error del servidor y con el código del mismo indicamos que tipo de error es   
      if(error.code === 11000){     
        throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);     
      }
      console.log(error);  // si el codigo es diferente al que indicamos en la condicion IF retornamos el numero y pedimos chequeo en Logs 
      throw new InternalServerErrorException(`Cant Create Pokemon - Check Server Logs`);      
      }
    }
  findAll() {
    return `This action returns all pokemon`;
  }

async findOne(id: string) {
let pokemon:Pokemon;
if (isNaN(+id)){
  pokemon = await this.pokemonModel.findOne({no:id})
}
//verificacion por MongoID
if (!pokemon && isValidObjectId(id)){
  pokemon = await this.pokemonModel.findById(id); // buscamos el pokemon por el MONGO_ID 
}

//verificacion por Name

if(!pokemon){  //primero verificamos que el nombre no este vacio 
  pokemon = await this.pokemonModel.findOne({name: id.toLowerCase()}) // luego buscamos que dentro de los nombres en dabte base este el nombre que estamos buscando para devolverlo 
}

if(!pokemon)
throw new NotFoundException(`Pokemon whih id, name or no "${id}" not found `)
return pokemon;

  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
