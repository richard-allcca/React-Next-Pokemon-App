import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

/**
 * Valida al existencia de un id pokemon y genera una nueva pagina en tiempo de ejecucion
 * @param nameOdId ID para generar las paginas staticas
 * @returns si el enpoint existe trae la data de lo contrario retorna null
 */
export const getPokemonInfo = async (nameOdId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOdId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};
