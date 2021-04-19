import React from 'react'
import styled from 'styled-components';
interface PokemonTypeProps {
    type: string;
}

const handleTypeColor = (color: string) => {
    switch (color) {
      case "normal":
        return "#75525C";
      case "fighting":
        return "#994025";
      case "flying":
        return "#4A677D";
      case "poison":
        return "#5E2D89";
      case "ground":
        return "#A8702D";
      case "rock":
        return "#48190B";
      case "bug":
        return "#1C4B27";
      case "ghost":
        return "#33336B";
      case "fire":
        return "#AB1F24";
      case "water":
        return "#1552E1";
      case "grass":
        return "#147B3D";
      case "electric":
        return "#E2E32B";
      case "psychic":
        return "#A52A6C";
      case "ice":
        return "#86D2F5";
      case "dragon":
        return "#448A95";

      default:
        return "black";
    }
  };


export const PokemonType: React.FC<PokemonTypeProps> = ({type}) => {
        return (
            <PokemonTypeName type={type}>{type}</PokemonTypeName>
        );
}

const PokemonTypeName = styled.p<PokemonTypeProps>`
  background: ${props => handleTypeColor(props.type)};    
  width: 60px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  margin-left: 10px;
`