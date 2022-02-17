import { gql } from "@apollo/client";

export const LOAD_POKEMON = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        message
        results {
            id
            url
            name
            image
        }
        }
    }
`

export const LOAD_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
        id
        name
        sprites {
            front_default
        }
        moves {
            move {
            name
            }
        }
        types {
            type {
            name
            }
        }
        }
    }
`