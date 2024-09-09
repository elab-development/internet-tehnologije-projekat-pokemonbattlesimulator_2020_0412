<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Ability;
use Illuminate\Auth\Access\HandlesAuthorization;

class AbilityPolicy
    {
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any abilities.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny ( User $user )
        {
        return true; // Svi korisnici mogu da pregledaju sve sposobnosti
        }

    /**
     * Determine whether the user can view the ability.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ability  $ability
     * @return mixed
     */
    public function view ( User $user, Ability $ability )
        {
        return true; // Svi korisnici mogu da vide pojedinačne sposobnosti
        }

    /**
     * Determine whether the user can create abilities.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create ( User $user )
        {
        return $user->hasRole ( 'admin' ); // Samo administratori mogu da kreiraju sposobnosti
        }

    /**
     * Determine whether the user can update the ability.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ability  $ability
     * @return mixed
     */
    public function update ( User $user, Ability $ability )
        {
        return $user->hasRole ( 'admin' );
        }

    /**
     * Determine whether the user can delete the ability.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Ability  $ability
     * @return mixed
     */
    public function delete ( User $user, Ability $ability )
        {
        return $user->hasRole ( 'admin' );
        }
    }

