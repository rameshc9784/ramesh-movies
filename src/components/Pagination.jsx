import React from 'react';

export default function Pagination({ current, total, perPage = 10, onChange }) {
    const totalPages = Math.ceil(total / perPage);
    if (totalPages <= 1) return null;

    const pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);

    for (let p = start; p <= end; p++) pages.push(p);

    return (
        <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">

            {/* Prev Button */}
            <button
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${current === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-sky-600 hover:text-white shadow'
                    }`}
            >
                Prev
            </button>

            {/* First Page + Ellipsis */}
            {start > 1 && (
                <>
                    <button
                        onClick={() => onChange(1)}
                        className="px-4 py-2 rounded-lg border bg-white text-slate-700 hover:bg-sky-600 hover:text-white shadow"
                    >
                        1
                    </button>
                    {start > 2 && <span className="px-2 text-gray-400">...</span>}
                </>
            )}

            {/* Page Numbers */}
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${p === current
                        ? 'bg-sky-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 hover:bg-sky-600 hover:text-white shadow'
                        }`}
                >
                    {p}
                </button>
            ))}

            {/* Last Page + Ellipsis */}
            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
                    <button
                        onClick={() => onChange(totalPages)}
                        className="px-4 py-2 rounded-lg border bg-white text-slate-700 hover:bg-sky-600 hover:text-white shadow"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                disabled={current === totalPages}
                onClick={() => onChange(current + 1)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${current === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-sky-600 hover:text-white shadow'
                    }`}
            >
                Next
            </button>
        </div>
    );
}
