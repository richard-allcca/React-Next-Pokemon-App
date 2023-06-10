/**
 * Agrega si no esta en lista de favoritos o lo qwita si esta en lista
 * @param id número que identifica al pokemon
 */
const toggleFavorite = (id: number) => {
	console.log("toggleFavorite llamado");

	let favorites: number[] = JSON.parse(
		localStorage.getItem("favorites") || "[]"
	);

	if (favorites.includes(id)) {
		favorites = favorites.filter((item) => item !== id);
	} else {
		favorites.push(id);
	}

	localStorage.setItem("favorites", JSON.stringify(favorites));
};

/**
 * Verifica si el id coincide con un pokemon guardado
 * @param id - numero que identifica al pokemon
 * @returns - pokemon incluido en favoritos
 */
const existInFavorites = (id: number): boolean => {
	if (typeof window === "undefined") return false; //? verifica esta en el server

	const favorites: number[] = JSON.parse(
		localStorage.getItem("favorites") || " []"
	);

	return favorites.includes(id);
};

/**
 * @returns Array de pokemon desde el localStorage
 */
const getPokemonLs = (): number[] => {
	return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export { toggleFavorite, existInFavorites, getPokemonLs };
