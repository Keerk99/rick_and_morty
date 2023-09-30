const urlCharacters = "https://rickandmortyapi.com/api/character";

const listCharacters = () => fetch(urlCharacters).then(response => response.json());

const searchCharacter = (name) => fetch(`${urlCharacters}/?name=${name}`).then(response => response.json());

export const userServices = {
    listCharacters,
    searchCharacter
};