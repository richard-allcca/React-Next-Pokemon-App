import axios from "axios";

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export default pokeApi;




// https://pokeapi.co/api/v2/pokemon/ditto