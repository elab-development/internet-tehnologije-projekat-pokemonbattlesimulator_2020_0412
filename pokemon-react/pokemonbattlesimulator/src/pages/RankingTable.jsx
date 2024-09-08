import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import './RankingTable.css';

// Global Filter komponenta
const GlobalFilter = ({ filter, setFilter }) => (
  <span>
    Search: 
    <input
      value={filter || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Type to search..."
    />
  </span>
);

const RankingTable = () => {
  // Podaci o Pokémon-ima
  const data = useMemo(
    () => [
      { rank: 1, name: 'Pikachu', wins: 25, points: 2000 },
      { rank: 2, name: 'Charizard', wins: 20, points: 1800 },
      { rank: 3, name: 'Bulbasaur', wins: 18, points: 1600 },
      { rank: 4, name: 'Squirtle', wins: 15, points: 1500 },
      { rank: 5, name: 'Jigglypuff', wins: 12, points: 1400 },
      { rank: 6, name: 'Meowth', wins: 10, points: 1300 },
      { rank: 7, name: 'Eevee', wins: 8, points: 1200 },
      { rank: 8, name: 'Snorlax', wins: 7, points: 1100 },
      { rank: 9, name: 'Gengar', wins: 6, points: 1000 },
      { rank: 10, name: 'Mewtwo', wins: 5, points: 950 },
      { rank: 11, name: 'Vulpix', wins: 4, points: 900 },
      { rank: 12, name: 'Machop', wins: 3, points: 850 },
      { rank: 13, name: 'Diglett', wins: 2, points: 800 },
      { rank: 14, name: 'Poliwag', wins: 2, points: 800 },
      { rank: 15, name: 'Sandshrew', wins: 2, points: 800 },
      { rank: 16, name: 'Psyduck', wins: 1, points: 750 },
      { rank: 17, name: 'Magnemite', wins: 1, points: 750 },
      { rank: 18, name: 'Doduo', wins: 1, points: 750 },
      { rank: 19, name: 'Seel', wins: 1, points: 750 },
      { rank: 20, name: 'Grimer', wins: 1, points: 750 }
    ],
    []
  );

  // Kolone za tabelu
  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank',
        sortType: 'basic'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Wins',
        accessor: 'wins',
        sortType: 'basic'
      },
      {
        Header: 'Points',
        accessor: 'points',
        sortType: 'basic'
      }
    ],
    []
  );

  // React-Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    setPageSize
  } = useTable(
    { 
      columns, 
      data, 
      initialState: { pageIndex: 0, pageSize: 10 } // Postavi broj redova po stranici na 10
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="ranking-table">
      <h2>Ranking Table</h2>
      <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={state.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={state.pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RankingTable;
