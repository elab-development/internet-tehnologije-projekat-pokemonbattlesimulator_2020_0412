# Pokemon Battle Simulator

Pokemon Battle Simulator is a web application that allows users to simulate battles between different Pokemon. Users can choose their Pokemon, evolve them over time, and use unique abilities to defeat their opponents in battles. The simulator presents detailed battle statistics after each match, and users can access the application through a hosted web interface.

## Features

- Choose from a variety of Pokemon
- Simulate battles with turn-based mechanics
- Evolve Pokemon after battles
- View detailed statistics after each battle
- Use different abilities and strategies to win
- Authentication system for registered users
- RESTful API with JSON responses for various game features
- Frontend built using React, Backend using Laravel

## Installation

### Backend (Laravel)

1. Clone the repository:

   ```bash
   git clone https://github.com/elab-development/internet-tehnologije-projekat-pokemonbattlesimulator_2020_0412.git

   ```

2. Navigate to the project directory:

   ```bash
   cd internet-tehnologije-projekat-pokemonbattlesimulator_2020_0412

   ```

3. Install dependencies using Composer:

   ```bash
   composer install

   ```

4. Set up your .env file by copying the example file:

   ```bash
   cp .env.example .env

   ```

5. Generate an application key:

   ```bash
   php artisan key:generate

   ```

6. Set up the database connection in the .env file.

7. Run migrations to create the necessary database tables:

   ```bash
   php artisan migrate

   ```

8. Seed the database with initial data:

   ```bash
   php artisan db:seed

   ```

9. Start the Laravel development server:

   ```bash
   php artisan serve

   ```

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd frontend

   ```

2. Install dependencies using npm or yarn:

   ```bash
   npm install

   ```

3. Start the React development server:

   ```bash
   npm start

   ```

## API Endpoints

**POST /register** - Register a new user
**POST /login** - User login
**POST /logout** - User logout (requires authentication)
**GET /battles1/pokemon/{pokemon1_id}** - Get battles for Pokemon 1
**GET /battles2/pokemon/{pokemon2_id}** - Get battles for Pokemon 2
**GET /battles/wins/pokemon/{pokemon_id}** - Get battles where Pokemon won
**GET /pokemons/strongest** - Get the strongest Pokemon
**GET /pokemons/types** - Get all available Pokemon types
**GET /pokemons/type/{type}** - Get Pokemon by type
**GET /abilities/status** - Get abilities that cause status effects
**GET /abilities/type/{type}** - Get abilities by type
**GET /abilities/latest** - Get the latest abilities
**POST /upload** - Upload a file
**GET /export/csv** - Export data as CSV
**GET /search** - Search for Pokemon or abilities
**POST /password/email** - Send a password reset link
**POST /forgot-password** - Forgot password reset process
**POST /reset-password** - Reset password with a token

**_Protected Routes (requires authentication with Sanctum)_**

**GET /pokemons/paginate** - Get a paginated list of Pokemon
**GET /pokemons/filter** - Filter Pokemon by type
**GET /location-stats** - Get battle statistics by location

**_Admin Routes (requires authentication and admin role)_**

### CRUD Operations for Pokemon (`PokemonController`)

- **GET /pokemons** - Retrieve a list of all Pokemon
- **GET /pokemons/{id}** - Retrieve a specific Pokemon by ID
- **POST /pokemons** - Create a new Pokemon
- **PUT /pokemons/{id}** - Update an existing Pokemon by ID
- **DELETE /pokemons/{id}** - Delete a specific Pokemon by ID

### CRUD Operations for Battles (`BattleController`)

- **GET /battles** - Retrieve a list of all battles
- **GET /battles/{id}** - Retrieve a specific battle by ID
- **POST /battles** - Create a new battle
- **PUT /battles/{id}** - Update an existing battle by ID
- **DELETE /battles/{id}** - Delete a specific battle by ID

### CRUD Operations for Abilities (`AbilityController`)

- **GET /abilities** - Retrieve a list of all abilities
- **GET /abilities/{id}** - Retrieve a specific ability by ID
- **POST /abilities** - Create a new ability
- **PUT /abilities/{id}** - Update an existing ability by ID
- **DELETE /abilities/{id}** - Delete a specific ability by ID
  **GET /pokemon-data** - Fetch external Pokemon data

## Technologies Used

**Backend:** Laravel (PHP Framework)
**Frontend:** React.js
**Database:** MySQL (or another database defined in the .env file)
**Authentication:** Laravel Sanctum
**API: RESTful API** with JSON responses
**Version Control:** GitHub

## Usage

Once both the frontend and backend are running, visit the application in your browser at http://localhost:3000 (React frontend) or http://localhost:8000 (Laravel backend). Create an account, choose your Pokemon, and start simulating battles!

## License

This project is open-source and licensed under the MIT License.
