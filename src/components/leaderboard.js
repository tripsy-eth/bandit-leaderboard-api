"use client";

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Copy, Check, X, Info } from 'lucide-react';
import PropTypes from 'prop-types';

const LeaderboardComponent = ({ actionId }) => {
    const [mounted, setMounted] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedAddress, setCopiedAddress] = useState(null);
    const [pageInputValue, setPageInputValue] = useState(currentPage);

    const ITEMS_PER_PAGE = 10;

    const fetchLeaderboardData = async (page) => {
        try {
            setIsLoading(true);
            const offset = (page - 1) * ITEMS_PER_PAGE;
            console.log('Fetching data with offset:', offset);

            const response = await fetch(
                `/api/leaderboard?action-id=${actionId}&offset=${offset}&limit=${ITEMS_PER_PAGE}`,
                {
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_LEADERBOARD_API_KEY,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to fetch leaderboard data: ${response.status} ${errorText}`);
            }

            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }

            const data = await response.json();
            setLeaderboardData(data.leaderboard);
            setTotalUsers(data.totalUser);
            setTotalXp(data.totalXp);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        fetchLeaderboardData(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageInput = (e) => {
        const value = e.target.value;
        setPageInputValue(value);
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            const page = Number(pageInputValue);
            if (page >= 1 && page <= totalPages) {
                handlePageChange(page);
            } else {
                setPageInputValue(currentPage);
            }
        }
    };

    const filteredData = leaderboardData.filter((item) =>
        item.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyToClipboard = async (address) => {
        try {
            await navigator.clipboard.writeText(address);
            setCopiedAddress(address);
            // Reset copy feedback after 2 seconds
            setTimeout(() => setCopiedAddress(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!mounted) {
        return (
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 border border-red-300 rounded-lg bg-red-50">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Leaderboard</h3>
                <p className="text-red-600">{error.toString()}</p>
                <button
                    onClick={() => {
                        setError(null);
                        fetchLeaderboardData(currentPage);
                    }}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="w-[75vw] mx-auto bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">Leaderboard</h2>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Average XP</p>
                        <p className="text-xl font-bold">{totalUsers ? (totalXp / totalUsers).toFixed(0).toLocaleString() : '0'}</p>
                    </div>
                    <div className="text-center border-x">
                        <p className="text-sm text-gray-600">Highest XP</p>
                        <p className="text-xl font-bold">
                            {leaderboardData.length > 0
                                ? Math.max(...leaderboardData.map(item => item.xp)).toLocaleString()
                                : '0'
                            }
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Total Participants</p>
                        <p className="text-xl font-bold">{totalUsers.toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by wallet address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    Total Users: {totalUsers} | Total XP: {totalXp.toLocaleString()}
                </div>
            </div>

            <div className="p-4 sm:p-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-4 text-left w-20">Rank</th>
                                        <th className="p-4 text-left">Wallet Address</th>
                                        <th className="p-4 text-right w-32">XP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item) => (
                                        <tr key={item.walletAddress} className="border-b hover:bg-gray-50">
                                            <td className="p-4">{item.rank}</td>
                                            <td className="p-4 font-mono break-all flex items-center gap-1">
                                                <span>{item.walletAddress}</span>
                                                <button
                                                    onClick={() => copyToClipboard(item.walletAddress)}
                                                    className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
                                                    title="Copy wallet address"
                                                >
                                                    {copiedAddress === item.walletAddress ? (
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-500" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="p-4 text-right">{item.xp.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-4 px-4 sm:px-6">
                            <div className="text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex items-center group">
                                        <Info className="w-4 h-4 text-gray-400 mr-1 cursor-help" />
                                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                                            Type the page number and press Enter to navigate
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600">Go to page:</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={totalPages}
                                        value={pageInputValue}
                                        onChange={handlePageInput}
                                        onKeyDown={handlePageInputKeyDown}
                                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 flex items-center gap-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 flex items-center gap-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

LeaderboardComponent.propTypes = {
    actionId: PropTypes.string.isRequired
};

export default LeaderboardComponent;