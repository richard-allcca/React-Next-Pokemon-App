import React, { FC } from "react";

import { Grid } from "@nextui-org/react";

import { FavoriteCardPokemon } from "./";

interface Props {
	favorites: number[];
}

export const FavoritePokemons: FC<Props> = ({ favorites }) => {
	return (
		<Grid.Container gap={2} direction="row" justify="flex-start">
			{favorites.map((pokeId) => {
				return <FavoriteCardPokemon key={pokeId} id={pokeId} />;
			})}
		</Grid.Container>
	);
};
