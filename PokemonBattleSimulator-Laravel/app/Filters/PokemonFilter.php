<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class PokemonFilter extends ApiFilter
{
    protected $safeParams = [
        'name' => ['eq', 'like'],
        'type' => ['eq'],
    ];

    protected $columnMap = [
        'name' => 'name',
        'type' => 'type',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'like' => 'like',
    ];

    public function applyFilters(Builder $query, array $filters)
    {
        foreach ($filters as $param => $value) {
            if (array_key_exists($param, $this->safeParams)) {
                $operators = $this->safeParams[$param];
                foreach ($operators as $operator) {
                    $query->where($this->columnMap[$param], $this->operatorMap[$operator], $value);
                }
            }
        }
    }
}
