<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Ability;
use App\Models\Battle;
use App\Models\Pokemon;
use App\Policies\AbilityPolicy;
use App\Policies\BattlePolicy;
use App\Policies\PokemonPolicy;

class AuthServiceProvider extends ServiceProvider
    {
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [ 
    Ability::class => AbilityPolicy::class,
    Battle::class  => BattlePolicy::class,
    Pokemon::class => PokemonPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot ()
        {
        $this->registerPolicies ();
        }
    }

