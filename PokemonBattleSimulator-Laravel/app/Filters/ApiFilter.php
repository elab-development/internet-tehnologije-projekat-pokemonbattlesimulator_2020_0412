<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ApiFilter
{
    public static function apply(Builder $query, array $filters)
    {
        foreach ($filters as $filter => $value) {
            $method = 'filterBy' . ucfirst($filter);
            if (method_exists(__CLASS__, $method)) {
                self::$method($query, $value);
            }
        }
        return $query;
    }

    protected static function filterByName($query, $name)
    {
        return $query->where('name', 'like', '%' . $name . '%');
    }

    protected static function filterByType($query, $type)
    {
        return $query->where('type', $type);
    }

    protected static function sortBy($query, $field, $direction = 'asc')
    {
        return $query->orderBy($field, $direction);
    }
}
