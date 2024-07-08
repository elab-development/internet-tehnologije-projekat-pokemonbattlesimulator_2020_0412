<?php

namespace App\Filters;

use Illuminate\Http\Request;
use App\Models\Pokemon;

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

    public function applyFilters()
    {
        foreach ($this->filters as $param => $value) {
            if (array_key_exists($param, $this->safeParams)) {
                $operators = $this->safeParams[$param];
                foreach ($operators as $operator) {
                    $this->query->where($this->columnMap[$param], $this->operatorMap[$operator], $value);
                }
            }
        }
    }
}
