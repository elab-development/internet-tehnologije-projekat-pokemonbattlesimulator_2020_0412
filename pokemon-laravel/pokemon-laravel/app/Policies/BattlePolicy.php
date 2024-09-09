<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Battle;
use Illuminate\Auth\Access\HandlesAuthorization;

class BattlePolicy
    {
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any battles.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny ( User $user )
        {
        return true;
        }

    /**
     * Determine whether the user can view the battle.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Battle  $battle
     * @return mixed
     */
    public function view ( User $user, Battle $battle )
        {
        return true;
        }

    /**
     * Determine whether the user can create battles.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create ( User $user )
        {
        return $user->hasRole ( 'admin' );
        }

    /**
     * Determine whether the user can update the battle.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Battle  $battle
     * @return mixed
     */
    public function update ( User $user, Battle $battle )
        {
        return $user->hasRole ( 'admin' );
        }

    /**
     * Determine whether the user can delete the battle.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Battle  $battle
     * @return mixed
     */
    public function delete ( User $user, Battle $battle )
        {
        return $user->hasRole ( 'admin' );
        }
    }

