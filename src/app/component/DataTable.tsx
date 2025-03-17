// components/DataTable.js
import React, { useEffect, useState } from 'react';
import { User } from '../../@types/user';
import Link from 'next/link';
import Image from "next/image";

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?page=${page}&limit=${pageSize}`);
                if(!response.ok) throw new Error("Failed to fetch Users");
                const data = await response.json();
                setData(data);
            } catch (err) {
                if(err instanceof Error){
                    setError(err.message);
                }else{
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, pageSize]);

    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field: React.SetStateAction<string>) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const filteredData = data.filter((item: User) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sortedData = filteredData.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        }
        return a[sortField] < b[sortField] ? 1 : -1;
    });

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="w-full md:w-56 flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="" width={14} height={14} />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="w-[200px] p-2 bg-transparent outline-none"
                />
            </div>
            <table className="w-full mt-4">
                <thead>
                    <tr className="text-left text-gray-500 text-sm">
                        <th onClick={() => handleSort('id')} className='hidden md:table-cell'>ID</th>
                        <th onClick={() => handleSort('name')} className='hidden md:table-cell'>Name</th>
                        <th onClick={() => handleSort('email')} className='hidden md:table-cell'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item: User) => (
                        <tr key={item.id}>
                            <td className="flex items-center gap-4 p-4">
                                <div className="flex flex-col">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-xs text-gray-500"></p>
                                </div>
                            </td>
                            <td className="hidden md:table-cell">{item.email}</td>
                            <td className="hidden md:table-cell">{item.username}</td>
                            <td className="hidden md:table-cell">{item.phone}</td>
                            <td className="hidden md:table-cell">{item.website}</td>
                            <td>
                                <div className="flex items-center gap-2">
                                <Link href={`/list/users/${item.id}`}>
                                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 cursor-pointer">
                                    <Image src="/view.png" alt="view" width={16} height={16} />
                                    </button>
                                </Link>
                                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-red-600 cursor-pointer">
                                    <Image src="/delete.png" alt="" width={16} height={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="p-4 flex items-center justify-between text-gray-500">
                <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Prev
                </button>
                <div className="flex items-center gap-2 text-sm">
                    <select onChange={(e) => setPageSize(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <button onClick={() => setPage(prev => prev + 1)} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;