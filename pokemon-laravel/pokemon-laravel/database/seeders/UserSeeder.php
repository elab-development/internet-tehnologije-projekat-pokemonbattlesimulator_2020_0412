<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::where('name', 'admin')->first();
        $userRole = Role::where('name', 'user')->first();
        $guestRole = Role::where('name', 'guest')->first();

        $adminUser = User::find(1);
        if ($adminUser) {
            $adminUser->assignRole($adminRole);
        }

        $user = User::find(2);
        if ($user) {
            $user->assignRole($userRole);
        }

        $guest = User::find(3);
        if ($guest) {
            $guest->assignRole($guestRole);
        }
    }
}


