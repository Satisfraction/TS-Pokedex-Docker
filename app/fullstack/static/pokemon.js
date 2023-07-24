// Diese Funktion erhält den Wert eines angegebenen Query-Parameters aus der URL.
function getQueryParameter(name) {
    // Erstellt eine neue Instanz von URLSearchParams und verwendet window.location.search, um die Query-Parameter aus der aktuellen URL zu erhalten.
    const urlParams = new URLSearchParams(window.location.search);
    // Gibt den Wert des angegebenen Query-Parameters zurück.
    return urlParams.get(name);
}

// Ruft den Wert des Query-Parameters 'name' über die getQueryParameter-Funktion ab und speichert ihn in der Variable pokemonName.
const pokemonName = getQueryParameter('name');

// Sendet eine GET-Anfrage an die API-Endpunkt '/pokemon' mit dem Query-Parameter 'name' als Teil der URL.
fetch(`/pokemon?name=${encodeURIComponent(pokemonName)}`)
    // Verarbeitet die Antwort der GET-Anfrage als JSON.
    .then(response => response.json())
    // Verarbeitet die JSON-Daten des Pokémons.
    .then(pokemon => {
        // Aktualisiert das Bild des Pokémons.
        document.querySelector('.pokemon-image2').src = pokemon.Bild.endsWith('.gif') ? pokemon.Bild : pokemon.Bild.replace(/\.png|\.jpg/g, '.gif');
        // Aktualisiert die Nummer des Pokémons.
        document.querySelector('.pokemon-number').textContent = `Nr: ${pokemon.Nr}`;
        // Aktualisiert den Namen des Pokémons.
        document.querySelector('.pokemon-name').textContent = pokemon.Name;

        // Überprüft, ob 'pokemon.Typ' ein Array ist und die Typen mit ', ' verbindet.
        const pokemonType = Array.isArray(pokemon.Typ) ? pokemon.Typ.join(', ') : pokemon.Typ;
        // Aktualisiert den Typ des Pokémons.
        const pokemonTypeElement = document.querySelector('.pokemon-type');
        pokemonTypeElement.textContent = `Typ: ${pokemonType}`;

        // Überprüft, ob 'pokemon.Typ' ein Array mit mindestens einem Element ist.
        if (Array.isArray(pokemon.Typ) && pokemon.Typ.length >= 1) {
            const firstType = pokemon.Typ[0];
            const secondType = pokemon.Typ.length >= 2 ? pokemon.Typ[1] : '';
            pokemonTypeElement.innerHTML = `Typ1: <br><span class="${firstType}">${firstType}</span><br> Typ2: <br><span class="${secondType}">${secondType}</span>`;
        } else {
            pokemonTypeElement.innerHTML = `Typ: ${pokemonType}`;
        }

        // Remove the class from h3 tag
        pokemonTypeElement.classList.remove(Array.isArray(pokemon.Typ) ? pokemon.Typ[0] : pokemon.Typ);

        // Aktualisiert die Beschreibung des Pokémons.
        document.querySelector('.pokemon-description').textContent = pokemon.Beschreibung;
        // Aktualisiert die Größe des Pokémons.
        document.querySelector('.pokemon-height').textContent = `Größe: ${pokemon.Größe}`;
    })
    // Behandelt Fehler beim Abrufen der Pokémon-Daten.
    .catch(error => {
        console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
        // Zeigt eine Fehlermeldung an.
        document.querySelector('.pokemon-details').textContent = 'Fehler beim Abrufen der Pokémon-Daten';
    });

// Diese Funktion navigiert zurück zur vorherigen Seite.
function goBack() {
    // Fügt einen leeren State hinzu und aktualisiert die URL auf den übergeordneten Ordner.
    history.pushState({}, '', '../');
    // Lädt die Seite neu.
    window.location.reload();
}