import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ParseMongoIdPipe } from "./../common/pipes/parse-mongo-id/parse-mongo-id.pipe";
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
 private defaultLimit:number;
 constructor(
  @InjectModel(Pokemon.name)
  private readonly pokemonModel:Model<Pokemon>, 
  private readonly configService:ConfigService,
  ){
    this.defaultLimit=configService.get<number>('defaulLimit');
  }
  
  



//-----------------------------------------------------------------//
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase(); // para grabar los nombres en minúsculas 
    // se usa try and catch para poder realizar validacion de usario o nro repetido usando una unica consulta a la DB y ahorrar tiempo y recursos 
    try {    
    const pokemon = await this.pokemonModel.create(createPokemonDto)    // validamos que el nro o usuario no exista para poder crearlo en DATABASE 
    return pokemon;}
    catch (error){                // Si el usuario o nro existe devolvemos el error del servidor y con el código del mismo indicamos que tipo de error es   
     this.handleException(error)  //llamando al metodo privado de manejador de errores
    }}
//-----------------------------------------------------------------//
//-----------------------------------------------------------------//    
  async findAllPokemon(paginationDto:PaginationDto): Promise<Pokemon[]> {   // espera una Promesa con un arreglo de Todos los Pokemones 
    
    const{limit = this.defaultLimit, offset = 0} = paginationDto // desectructuracion del paginationDTO para poder ingresar valores al limit y al offset por defectos en caso de que no sean colocados en la UR
    return this.pokemonModel.find() // retorna todos los pokemones en la DATABASE y los envia al arreglo resolviendo asi la promesa
    .limit(limit)
    .skip(offset) 
    .sort(
      {no: 1
      })  
    .select('-__v')
  }
//-----------------------------------------------------------------//

//-----------------------------------------------------------------//
async findOne(id: string) {
let pokemon:Pokemon;
if (!isNaN(+id)){ //verificamos si el ID no es un numero con el !isNaN
  pokemon = await this.pokemonModel.findOne({no:id})
}
//verificacion por MongoID
if (!pokemon && isValidObjectId(id)){ // usamos funcion que viene en mongo  isValidObjectId que nos valida que el string es un MONGO_ID 
  pokemon = await this.pokemonModel.findById(id); // buscamos el pokemon por el MONGO_ID 
}

//verificacion por Name

if(!pokemon){  //primero verificamos que el nombre no este vacio 
  pokemon = await this.pokemonModel.findOne({name: id.toLowerCase()}) // luego buscamos que dentro de los nombres en dabte base este el nombre que estamos buscando para devolverlo 
}

if(!pokemon)
throw new NotFoundException(`Pokemon whit id, name or no "${id}" not found `)
return pokemon;

  }
//-----------------------------------------------------------------//
 
//-----------------------------------------------------------------//
async update(id: string, updatePokemonDto: UpdatePokemonDto) {
try{const pokemon = await this.findOne(id) // llamamos a la función findOne para ubicar el pokemon a modificar ya sea por nombre numero o el dato que se use segun este el DATABASE
    if(updatePokemonDto.name)
updatePokemonDto.name = updatePokemonDto.name.toLowerCase() //convertimos todo el nombre en minusculas por que asi los tenemos grabados en DATABASE 
await pokemon.updateOne(updatePokemonDto)   // actualizamos el objeto completo del pokemon 
return {...pokemon.toJSON,...updatePokemonDto}}
catch (error){
        this.handleException(error)  //llamando al metodo privado de manejador de errores 
  }}
//-----------------------------------------------------------------//
  async remove(id: string) {
  //   const pokemon = await this.findOne(id) // declaramos la constante y llamamos al metodo de busqueda de ese unico pokemon
  //   await pokemon.deleteOne()  // aplicamos el metodo de borrado
  // const result = await this.pokemonModel.findByIdAndDelete(id)
  const {deletedCount} = await this.pokemonModel.deleteOne({_id:id})
  if (deletedCount === 0 )
  throw new BadRequestException(`Pokemon whith id ${id} no found  `)
return
}
//-----------------------------------------------------------------//
//-----------------------------------------------------------------//
private handleException (error:any) {
  
  if(error.code === 11000){     
        throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);     
      }
      console.log(error);  // si el código es diferente al que indicamos en la condicion IF retornamos el numero y pedimos chequeo en Logs 
      throw new InternalServerErrorException(`Cant Create Pokemon - Check Server Logs`);      
      }
  
}



