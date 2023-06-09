

const toggleFavorite = (id: number) => {

  console.log('toggleFavorite llamado');

  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existInFavorites = (id: number): boolean => {

  if (typeof window === 'undefined') return false;//? verifica esta en el server

  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || ' []');

  return favorites.includes(id)
}

const getPokemonLs = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export {
  toggleFavorite,
  existInFavorites,
  getPokemonLs
};
