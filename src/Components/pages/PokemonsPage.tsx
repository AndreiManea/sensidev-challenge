import React, { useEffect, useState } from 'react'
import { Pokemons } from '../../types';
import { Pokemon } from '../elements/Pokemon';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, selectPokemons } from '../../redux/pokemonsSlice';


export const PokemonsPage: React.FC<Pokemons> = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(selectPokemons);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<{name:string, url:string}[]>()
  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  useEffect(() => {
    if(pokemons){
      setLoading(false);
    }
    setFilteredPokemons(
      pokemons?.filter((pokemon: { name: string; }) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemons]);

        return (
            <PokemonsPageContainer>
            <PokemonSearch type="text" placeholder="Search Pokemon" value={search} onChange={e => setSearch(e.target.value)}/>
            {!loading && filteredPokemons?.map((pokemon) => <Pokemon key={pokemon.url} name={pokemon.name} url={pokemon.url} />)}
            </PokemonsPageContainer>      
        );
}

const PokemonsPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
`

const PokemonSearch = styled.input`
  position: fixed;
  height: 20px;
  width: 500px;
  outline: none;
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
  top: 10px;
  color: #08FDD1;
  background: #0E244F;
  left: 50%;
  transform: translate(-50%, 0)
`