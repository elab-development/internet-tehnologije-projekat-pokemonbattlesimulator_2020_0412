<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
    {
    public function run ()
        {

        $adminRole = Role::firstOrCreate ( [ 'name' => 'admin' ] );
        $userRole  = Role::firstOrCreate ( [ 'name' => 'user' ] );
        $guestRole = Role::firstOrCreate ( [ 'name' => 'guest' ] );


        User::updateOrCreate (
            [ 'email' => 'admin@example.com' ],
            [ 
                'name'     => 'Admin User',
                'password' => Hash::make ( 'adminpassword' ),
            ],
        )->assignRole ( $adminRole );


        User::updateOrCreate (
            [ 'email' => 'aleksandra123@example.com' ],
            [ 
                'name'     => 'aleksandra',
                'password' => Hash::make ( 'pokemoni123' ),
            ],
        )->assignRole ( $adminRole );

        User::updateOrCreate (
            [ 'email' => 'miona123@example.com' ],
            [ 
                'name'     => 'miona',
                'password' => Hash::make ( 'pikacu123' ),
            ],
        )->assignRole ( $adminRole );
        }
    }
