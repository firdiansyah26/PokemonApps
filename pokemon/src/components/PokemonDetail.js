import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { LOAD_POKEMON_DETAIL } from "../GraphQL/Queries";
import PokemonContextProvider, { PokemonContext } from "../context/PokemonContext";

export default function PokemonDetail() {
    let { name } = useParams()
    const { pokemonValue } = useContext(PokemonContext)

    const [pokemonDetail, setPokemonDetail] = useState([])

    const [cardColor, setCardColor] = useState("")

    const { loading, error, data } = useQuery(LOAD_POKEMON_DETAIL, {
        variables: { name }
    });

    function probability(n) {
        return Math.random() < n
    }

    function catchPokemon() {
        if(probability(0.5)) {
            console.log("Success")
        } else {
            console.log("Failed")
        }
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            setPokemonDetail(data.pokemon)
            for (let item of data.pokemon.types) {
                console.log(item.type.name)
                switch (item.type.name) {
                    case "grass":
                        setCardColor("bg-emerald-500")
                        break;
                    case "fire":
                        setCardColor("bg-red-500")
                        break;
                    case "fyling":
                        setCardColor("bg-slate-500")
                        break;
                    case "water":
                        setCardColor("bg-blue-500")
                        break;
                    case "bug":
                        setCardColor("bg-stone-400")
                    break;
                    default:
                        setCardColor("bg-slate-300")
                        break;
                }
            }
        }
    })

    return (
        <PokemonContextProvider>
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="p-5">
                    <div className="flex">
                        <p className="mb-2 flex-1 text-xl font-bold tracking-tight text-slate-600">{pokemonDetail.name}</p>
                        <p>#{pokemonValue.id}</p>
                    </div>
                    <div className="flex flex-wrap space-x-2">
                        {pokemonDetail.types?.map((item) =>
                            <span
                                key={item.index}
                                className={`${cardColor} px-4 py-2 rounded-full text-slate-100 font-semibold text-sm flex align-center w-max cursor-pointer  transition duration-300 ease`}>
                                {item.type.name}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <img src={pokemonValue.image} alt="" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-600">Moves</p>
                        <div className="grid grid-cols-2 gap-2 ">
                            {pokemonDetail.moves?.slice(0, 4).map((item) =>
                                <span
                                    key={item.index}
                                    className={`${cardColor} mt-2  px-4 py-2 rounded-full text-slate-100 font-semibold text-sm flex align-center justify-center  w-full cursor-pointer  transition duration-300 ease`}>
                                    {item.move.name}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <button onClick={catchPokemon} className="rounded-xl bg-blue-800 w-full p-2 text-white">Catch Pokemon</button>
                    </div>
                </div>
            </div>
        </PokemonContextProvider>

    )
}