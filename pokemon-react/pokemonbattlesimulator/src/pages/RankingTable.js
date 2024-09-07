import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './RankingTable.css';

const RankingTable = () => {

  const data = React.useMemo(
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
      { rank: 10, name: 'Mewtwo', wins: 5, points: 950 }
    ],
    []
  );

  const columns = React.useMemo(
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div className="ranking-table">
      <h2>Ranking Table</h2>
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
            {rows.map(row => {
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
    </div>
  );
};

export default RankingTable;
