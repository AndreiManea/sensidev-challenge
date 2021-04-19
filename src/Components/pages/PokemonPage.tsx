import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { Pokemon } from '../../types';
import { PokemonType } from '../elements/PokemonType';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, selectPokemon } from '../../redux/pokemonSlice';

interface PokemonType{
  type: string;
}

export const PokemonPage: React.FC = () => {
  const pokemon:Pokemon = useSelector(selectPokemon);
  const { id } = useParams<{id: string}>();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemon(id));
  }, []);

  useEffect(() => {
    if(Object.keys(pokemon).length !== 0 && pokemon.constructor === Object){
      setLoading(false);
    }
  }, [pokemon]);


        return (
            <PokemonPageContainer>
              
              <PokemonContainer>
                <PokemonName>{!loading && pokemon?.name}</PokemonName>    
                <PokemonTypes>
                {!loading && pokemon?.types.map((type, i) => <PokemonType type={type} key={i}>{type}</PokemonType>)}
                </PokemonTypes>

                <PokemonImages>
                {!loading && pokemon?.sprites.map((sprite, i) => <PokemonImage key={i} src={sprite}/>)}
                </PokemonImages>

                <PokemonDescription><span>Description:</span> {!loading && pokemon?.description}</PokemonDescription>

                  <PokemonStats>
                  Stats
                  {!loading && pokemon?.stats.map((stat, i) => 
                  <PokemonStat key={i}>
                    <span>{stat.name} :</span> {stat.value}
                    </PokemonStat>)}
                  </PokemonStats>
                </PokemonContainer>
            
            </PokemonPageContainer>      
        );
}

const PokemonPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`
const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vw;
  padding: 50px 50px 25px 50px;
  background: rgba(19, 47, 104, 0.9);
  border-radius: 25px;
`

const PokemonImages = styled.div`
  display: flex;
`

const PokemonTypes = styled.div`
  display: flex;
  margin-top: 10px;
  >p:first-child{
    margin-left: 0;
  }
`

const PokemonImage = styled.img`
  width: 200px;
`

const PokemonName = styled.h1`
  color: #08FDD1;
`
const PokemonDescription = styled.h1`
  color: #08FDD1;
  font-weight: lighter;
  >span{
    color: white;
    margin-right: 20px;
  }
`

const PokemonStats = styled.ul`
  color: #08FDD1;
  margin-top: 15px;
  font-size: 1.8em;
  padding: 0;
`
const PokemonStat = styled.li`
  color: #08FDD1;
  font-size: 0.7em;
  margin-left: 30px;
  margin-top: 10px;
  >span{color:white}
`