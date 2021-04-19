import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from '../redux/pokemonsSlice'
import pokemonReducer from '../redux/pokemonSlice'
export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemon: pokemonReducer,
    },
  });