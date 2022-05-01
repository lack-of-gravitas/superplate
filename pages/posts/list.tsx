import React from "react";
import { useTable, Column } from "@pankod/refine-react-table";
import { useOne,useNavigation  } from "@pankod/refine-core";
export const ShowIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
export const PostList: React.FC = () => {
    const { show } = useNavigation();

    const columns: Array<Column> = React.useMemo(
        () => [
            {
                id: "action",
                Header: "Action",
                accessor: "id",
                Cell: ({ value }) => (
                    <button
                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                        onClick={() => show("posts", value)}
                    >
                        {ShowIcon}
                    </button>
                ),
            },
            {
                id: "id",
                Header: "ID",
                accessor: "id",
            },
            {
                id: "title",
                Header: "Title",
                accessor: "title",
            },
            {
                id: "status",
                Header: "Status",
                accessor: "status",
            },
            {
                id: "createdAt",
                Header: "CreatedAt",
                accessor: "createdAt",
            },
            
            {
                id: "category.id",
                Header: "Category",
                accessor: "category.id",
                Cell: ({ cell }) => {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: cell.value,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title;
                },
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable({ columns });

    return (
        <div className="container mx-auto pb-4">
            <table
                className="min-w-full table-fixed divide-y divide-gray-200 border"
                {...getTableProps()}
            >
                <thead className="bg-gray-100">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 bg-white"
                >
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="transition hover:bg-gray-100"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};