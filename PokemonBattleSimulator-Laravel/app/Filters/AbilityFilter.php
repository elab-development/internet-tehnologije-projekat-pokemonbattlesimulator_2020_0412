<?php

namespace App\Filters;

use Illuminate\Http\Request;
use App\Models\Ability;

class AbilityFilter extends ApiFilter
{
    protected $safeParams = [
        'name' => ['eq', 'like'],
        // Možeš dodati dodatne filtere ovde
    ];

    protected $columnMap = [
        'name' => 'name',
        // Mapiranje za ostale filtere možeš dodati ovde
    ];

    protected $operatorMap = [
        'eq' => '=',
        'like' => 'like',
        // Možeš dodati dodatne operatore ovde
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
