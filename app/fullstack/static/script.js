// Funktion zum Abrufen der Liste der Pokémon vom Server
async function fetchPokemonList() {
  try {
    const response = await fetch('/informationen');
    const pokemonData = await response.json();

    const pokemonListContainer = document.getElementById('pokemon-list');
    pokemonListContainer.innerHTML = ''; // Container leeren, bevor Pokémon-Karten hinzugefügt werden

    pokemonData.forEach(pokemon => {
      const pokemonCard = document.createElement('div');
      pokemonCard.className = 'pokemon-card';
      pokemonCard.dataset.name = pokemon.Name; // Pokémon-Namen als Datenattribut speichern
      console.log(pokemon.Name);

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
      pokemonType.textContent = `Typ: ${pokemon.Typ}`;

      const pokemonDescription = document.createElement('p');
      pokemonDescription.className = 'pokemon-description';
      pokemonDescription.textContent = pokemon.Beschreibung;

      const pokemonHeight = document.createElement('p');
      pokemonHeight.className = 'pokemon-height';
      pokemonHeight.textContent = `Größe: ${pokemon.Größe}`;

      pokemonCard.appendChild(pokemonImage);
      pokemonCard.appendChild(pokemonNumber);
      pokemonCard.appendChild(pokemonName);
      pokemonCard.appendChild(pokemonType);
      // pokemonCard.appendChild(pokemonDescription);
      pokemonCard.appendChild(pokemonHeight);

      pokemonCard.addEventListener('click', () => {
        // Weiterleitung zur pokemon.html-Seite im Vorlagenordner mit dem spezifischen Pokémon-Namen
        window.location.href = `static/pokemon.html?name=${encodeURIComponent(pokemon.Name)}`;
      });

      pokemonListContainer.appendChild(pokemonCard);
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Pokémon-Liste:', error);
  }
}

// Aufruf der fetchPokemonList-Funktion, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', fetchPokemonList);
