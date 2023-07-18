import os
from pymongo import MongoClient
from flask import Flask, jsonify, render_template, url_for, request
from dotenv import load_dotenv

load_dotenv()

# Verbindung zur MongoDB herstellen
def get_mongo_connection():
    # MongoDB URL und Datenbankname aus der Umgebungsvariable lesen
    mongo_url = os.getenv("MONGO_URL")
    database_name = os.getenv("DATABASE_NAME")

    # Verbindung zur MongoDB herstellen
    client = MongoClient(mongo_url)
    db = client[database_name]
    collection = db['pokemon']
    return collection

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def index():
    # Die Startseite rendern
    return render_template('index.html')

@app.route('/informationen', methods=['GET'])
def get_informationen():
    # Informationen aus der Datenbank abrufen
    collection = get_mongo_connection()
    dokumente = collection.find()

    # Informationen in JSON-Format konvertieren und zurückgeben
    informationen = [{
        'Nr': dokument['Nr'],
        'Name': dokument['Name'],
        'Typ': dokument['Typ'],
        'Beschreibung': dokument['Beschreibung'],
        'Größe': dokument['Größe'],
        'Bild': dokument['Bild']
    } for dokument in dokumente]

    return jsonify(informationen)

@app.route('/pokemon', methods=['GET'])
def get_pokemon():
    # Retrieve the 'name' query parameter from the request
    pokemon_name = request.args.get('name')

    if not pokemon_name:
        return jsonify({'error': 'Pokemon name not provided'}), 400

    # Connect to the MongoDB and retrieve the Pokemon details
    collection = get_mongo_connection()
    pokemon_data = collection.find_one({'Name': pokemon_name})

    if not pokemon_data:
        return jsonify({'error': 'Pokemon not found'}), 404

    # Convert the Pokemon data to JSON format and return
    pokemon_info = {
        'Nr': pokemon_data['Nr'],
        'Name': pokemon_data['Name'],
        'Typ': pokemon_data['Typ'],
        'Beschreibung': pokemon_data['Beschreibung'],
        'Größe': pokemon_data['Größe'],
        'Bild': pokemon_data['Bild']
    }

    return jsonify(pokemon_info)

if __name__ == '__main__':
    # Die Flask-Anwendung starten
    app.run(debug=True, host='0.0.0.0', port=3000)
