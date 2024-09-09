<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Pokemon;
use Illuminate\Auth\Access\HandlesAuthorization;

class PokemonPolicy
    {
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any pokemons.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny ( User $user )
        {
        return true;
        }

    /**
     * Determine whether the user can view the pokemon.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Pokemon  $pokemon
     * @return mixed
     */
    public function view ( User $user, Pokemon $pokemon )
        {
        return true;
        }

    /**
     * Determine whether the user can create pokemons.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create ( User $user )
        {
        return $user->hasRole ( 'admin' );
        }

    /**
     * Determine whether the user can update the pokemon.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Pokemon  $pokemon
     * @return mixed
     */
    public function update ( User $user, Pokemon $pokemon )
        {
        return $user->hasRole ( 'admin' );
        }

    /**
     * Determine whether the user can delete the pokemon.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Pokemon  $pokemon
     * @return mixed
     */
    public function delete ( User $user, Pokemon $pokemon )
        {
        return $user->hasRole ( 'admin' );
        }
    }

