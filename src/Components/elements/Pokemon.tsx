import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
interface PokemonProps {
    name: string;
    url: string;
}   

export const Pokemon: React.FC<PokemonProps> = ({name, url}) => {

    const [pokemonImg, setPokemonImg] = useState<string>();
    const [pokemonId, setPokemonId] = useState<string>();
    useEffect(() => {
        const urlCopy = url.split('/');
        const id = urlCopy[6];
        setPokemonId(id);
        const getPokemonImg = async () => (
          await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(response => response.json())
          .then(data => setPokemonImg(data.sprites.front_default))
        );
    
        getPokemonImg();
      }, []);

        return (
            <PokemonContainer>
                <PokemonImg src={pokemonImg}/>
                <PokemonName>{name}</PokemonName>
                <PokemonButton href={`/${pokemonId}`}>Learn More</PokemonButton>
            </PokemonContainer>      
        );
}

const PokemonContainer = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    background: #132F68;
    align-items: center;
    padding: 10px 20px 20px 20px;
    border-radius: 20px;
    margin: 10px 0 10px 20px;
`

const PokemonName = styled.h1`
    color: white;
`

const PokemonImg = styled.img`
    width: 100px;
`

const PokemonButton = styled.a`
    border-radius: 20px;
    margin-top: 20px;
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    color: #08FDD1;
    background: #1A408F;
    cursor: pointer;
    transition: 0.3s;

    :hover{
        color: #08FDD1;
        background: #0E244F;
    }
`