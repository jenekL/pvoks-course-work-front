import React, {useState} from "react";
import {useTable, useFilters, useSortBy} from "react-table";
import {
    BrowserRouter as Router,
} from "react-router-dom";

export default function Table({columns, data, searchName = "name"}) {
    const [filterInput, setFilterInput] = useState("");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSortBy
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter(searchName, value);
        setFilterInput(value);
    };

    return (
        <>
            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search " + searchName}
            />
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className={
                                    column.isSorted
                                        ? column.isSortedDesc
                                        ? "sort-desc"
                                        : "sort-asc"
                                        : ""
                                }
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <Router>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
                </Router>
            </table>
        </>
    );
}