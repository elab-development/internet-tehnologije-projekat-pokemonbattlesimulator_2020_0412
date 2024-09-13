import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { useNavigate } from 'react-router-dom';
import './RankingTable.css';

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
  const handleExportCsv = () => {
    fetch('http://127.0.0.1:8000/api/export/csv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => console.error('Error exporting CSV:', error));
  };

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRoles = localStorage.getItem('userRoles');
    
    if (token && userRoles) {
      try {
        const parsedRoles = JSON.parse(userRoles);
        setIsAuthenticated(true);
        setIsAdmin(parsedRoles.includes('admin'));
      } catch (error) {
        console.error('Error parsing user roles:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, [navigate]);

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
    { rank: 20, name: 'Grimer', wins: 1, points: 750 },
    { rank: 21, name: 'Jynx', wins: 1, points: 700 },
    { rank: 22, name: 'Poliwhirl', wins: 1, points: 700 },
    { rank: 23, name: 'Machoke', wins: 1, points: 700 },
    { rank: 24, name: 'Tentacruel', wins: 1, points: 700 }
    ],
    []
  );

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
      initialState: { pageIndex: 0, pageSize: 10 } 
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="ranking-table">
      <h2>Ranking Table</h2>
      
      {isAuthenticated ? (
      <>
        <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      </>
    ) : (
      <p>Please log in to view full rankings.</p> 
    )}
      

      <p>
        See which users are in the lead. You can download the list of users 
        and their emails in CSV format using the button below.
      </p>
      <button onClick={handleExportCsv}>Export CSV</button>

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
      
      {isAuthenticated ? (
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
      ) : (
        <p>Full list not available.</p>
      )}
    </div>
  );
};

export default RankingTable;
