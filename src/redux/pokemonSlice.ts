import { Pokemon, PokemonResponse } from '../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';



type PokemonState = {
    status: "loading" | "idle",
    error: string | null,
    pokemon: Pokemon;
}

const initialState = {
    pokemon: {} as Pokemon,
    error: null,
    status: "idle"
} as PokemonState;


export const getPokemon = createAsyncThunk<Pokemon, string>(
    'pokemons/:id',
    async (id: string) => {
    // Fetch the backend endpoint
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    // Get the JSON from the response:
    const data: PokemonResponse = await response.json();
        //Extracting name
        const name = data.name;

        //Extracting types
        const types:string[] = [];
        data.types.forEach((el) => types.push(el.type.name));

        //Extracting sprites
        const sprites:string[] = [];
        const keys = Object.keys(data.sprites);
        keys.forEach((key:any) => typeof data.sprites[key] === 'string' ? sprites.push(data.sprites[key]) : null)

        //Extracting stats
        const stats:{value: number, name: string}[] = [];
        data.stats.forEach( stat => stats.push({value: stat.base_stat, name: stat.stat.name}))

        //Extracting highest individual value
        const highestIV = Math.max(...stats.map(stat => (stat.value)));
        const characteristic = Math.round(highestIV / 5);

        // Fetch the backend endpoint 2
        const response2 = await fetch(`https://pokeapi.co/api/v2/characteristic/${characteristic}`);
        const data2 = await response2.json();
        
        // Extracting description
        const description = data2.descriptions[2].description;
        
    // Return result:
    return {
        name: name,
        description: description,
        sprites: sprites,
        stats: stats,
        types: types
    };
    }
  )


export const pokemonsSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
    } ,
    extraReducers: (builder) => {
        builder.addCase(getPokemon.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getPokemon.fulfilled, (state,{payload}) => {
            state.pokemon= payload;
            state.status = "idle";
        });
    }
  });



export const selectPokemon = (state: RootStateOrAny) => (state.pokemon.pokemon);

export default pokemonsSlice.reducer;