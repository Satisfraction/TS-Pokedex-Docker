// Function to fetch the list of Pokemon from the server
function fetchPokemonList() {
  fetch('/informationen')
    .then(response => response.json())
    .then(pokemonData => {
      const pokemonListContainer = document.getElementById('pokemon-list');
      pokemonListContainer.innerHTML = ''; // Clear the container before adding Pokemon cards

      pokemonData.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.dataset.name = pokemon.Name; // Store the Pokemon name as a data attribute

        const pokemonImage = document.createElement('img');
        pokemonImage.className = 'pokemon-image';
        pokemonImage.src = pokemon.Bild;
        pokemonImage.alt = pokemon.Name;

        const pokemonNumber = document.createElement('p');
        pokemonNumber.className = 'pokemon-number';
        pokemonNumber.textContent = `Nr: ${pokemon.Nr}`;

        const pokemonName = document.createElement('p');
        pokemonName.className = 'pokemon-name';
        pokemonName.textContent = pokemon.Name;

        const pokemonType = document.createElement('p');
        pokemonType.className = 'pokemon-type';
        pokemonType.textContent = `Type: ${pokemon.Typ}`;

        const pokemonDescription = document.createElement('p');
        pokemonDescription.className = 'pokemon-description';
        pokemonDescription.textContent = pokemon.Beschreibung;

        const pokemonHeight = document.createElement('p');
        pokemonHeight.className = 'pokemon-height';
        pokemonHeight.textContent = `Height: ${pokemon.Größe}`;

        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonNumber);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonType);
        // pokemonCard.appendChild(pokemonDescription);
        pokemonCard.appendChild(pokemonHeight);

        pokemonCard.addEventListener('click', () => {
          // Redirect to the pokemon.html page in the template folder with the specific Pokemon name
          window.location.href = `static/pokemon.html?name=${encodeURIComponent(pokemon.Name)}`;
        });

        pokemonListContainer.appendChild(pokemonCard);
      });
    })
    .catch(error => console.error('Error fetching Pokemon list:', error));
}

// Call the fetchPokemonList function when the page loads
document.addEventListener('DOMContentLoaded', fetchPokemonList);
