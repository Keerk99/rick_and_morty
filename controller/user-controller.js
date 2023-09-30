import { userServices } from "../service/user-service.js";

(function () {
    const container = document.getElementById('cards__container');
    const containerCards = document.getElementById('cards__list');
    const txtCharacter = document.getElementById('txt__character');
    const noData = document.getElementById('no__data');

    const createCards = (character) => {
        const card = document.createElement('li');
        card.classList.add('cards');

        const imgCard = document.createElement('img');
        imgCard.src = character.image;
        imgCard.alt = character.name;
        imgCard.classList.add('cards__img');

        const textContainer = document.createElement('div');
        textContainer.classList.add('text__container');

        const nameCharacter = document.createElement('h2');
        nameCharacter.classList.add('character__name');
        nameCharacter.id = `character__${character.id}`;
        nameCharacter.textContent = character.name;

        const statusCharacter = document.createElement('p');
        statusCharacter.classList.add('character__status')
        statusCharacter.textContent = 'Status: ' + character.status;

        const speciesCharacter = document.createElement('p');
        speciesCharacter.classList.add('character__species');
        speciesCharacter.textContent = 'Specie: ' + character.species;


        const genderCharacter = document.createElement('p');
        genderCharacter.classList.add('character__gender');
        genderCharacter.textContent = 'Gender: ' + character.gender;

        textContainer.appendChild(nameCharacter);
        textContainer.appendChild(statusCharacter);
        textContainer.appendChild(speciesCharacter);
        textContainer.appendChild(genderCharacter);

        card.appendChild(imgCard);
        card.appendChild(textContainer);

        return card;
    }

    (async () => {
        try {
            const data = await userServices.listCharacters();
            data.results.forEach(character => {
                const newCard = createCards(character)
                containerCards.appendChild(newCard);
            });
        } catch (error) {
            console.log(error);
        }
    })();

    const getCharacterByName = async (e) => {
        try {
            containerCards.innerHTML = '';
            const data = await userServices.searchCharacter(e.target.value);
            if (data.results != undefined && data.results.length > 0) {
                data.results.map((character) => {
                    const newCard = createCards(character);
                    containerCards.appendChild(newCard);
                });
                noData.style.display = 'none';
            } else {
                noData.style.display = 'flex';
                container.appendChild(noData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    txtCharacter.addEventListener('keyup', getCharacterByName)
})();