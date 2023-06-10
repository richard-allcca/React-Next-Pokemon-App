import React, { FC } from "react";

import { useRouter } from "next/router";

import { Card, Grid } from "@nextui-org/react";

interface Props {
	id: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {
	const router = useRouter();

	const onClickFavorite = () => {
		router.push(`/pokemon/${id}`);
	};

	return (
		<Grid xs={6} sm={3} md={2} xl={1} onClick={onClickFavorite}>
			<Card isHoverable isPressable css={{ padding: 10 }}>
				<Card.Image
					width={180}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
				></Card.Image>
			</Card>
		</Grid>
	);
};
