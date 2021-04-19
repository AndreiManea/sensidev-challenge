import { Pokemons } from '../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';



type PokemonState = {
    status: "loading" | "idle",
    error: string | null,
    pokemons: Pokemons;
}

const initialState = {
    pokemons: {} as Pokemons,
    error: null,
    status: "idle"
} as PokemonState


export const getPokemons = createAsyncThunk<Pokemons>(
    'pokemons/get',
    async () => {
    // Fetch the backend endpoint
    const response = await fetch('https://pokeapi.co/api/v2/generation/1');
    // Get the JSON from the response:
    const data: Pokemons = await response.json();
    // Return result:
    return data;
    }
  )


export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
    } ,
    extraReducers: (builder) => {
        builder.addCase(getPokemons.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getPokemons.fulfilled, (state,{payload}) => {
            state.pokemons.pokemon_species = payload.pokemon_species;
            state.status = "idle";
        });
    }
  });



export const selectPokemons = (state: RootStateOrAny) => (state.pokemons.pokemons.pokemon_species);

export default pokemonsSlice.reducer;