import { useState, useMemo } from 'react';

const usePagination = (data, pageSize) => {
    const [currentPage, setCurrentPage] = useState(1);

    const maxPage = useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [currentPage, pageSize, data]);

    return { currentData, currentPage, setCurrentPage, maxPage };
};

export default usePagination;
