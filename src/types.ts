export interface Pokemons {
    pokemon_species: {
        name: string, 
        url:  string
    }[];
}

export interface Pokemon {
    name: string;
    types: string[];
    description: string;
    sprites: string[];
    stats: {
        value: number,
        name: string
    }[];
}

export interface PokemonResponse {
    name: string;
    types: {slot:number, type: {name:string}}[];
    description: string;
    sprites: string[];
    stats: {
        base_stat: number,
        stat: {
            name: string
        }
    }[];
}