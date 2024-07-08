<?php

namespace App\Filters;

use Illuminate\Http\Request;
use App\Models\Battle;

class BattleFilter extends ApiFilter
{
    protected $safeParams = [
        'result' => ['eq', 'in'],
    ];

    protected $columnMap = [
        'result' => 'result',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'in' => 'in',
    ];

    public function applyFilters()
    {
        foreach ($this->filters as $param => $value) {
            if (array_key_exists($param, $this->safeParams)) {
                $operators = $this->safeParams[$param];
                foreach ($operators as $operator) {
                    if ($operator === 'in') {
                        $value = explode(',', $value);
                    }
                    $this->query->where($this->columnMap[$param], $this->operatorMap[$operator], $value);
                }
            }
        }
    }
}
