import React from "react"
import './Pagination.scss'

export const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let pages = [];

	for (let p = 1; p <= totalPages; p++) {
		pages.push(p);
	}

    return (
        <ul className="Pagination">
            <li>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1? 'disabled' : ''}>&laquo;</button>
            </li>

            {pages.map((page) => (
				<li key={page} className={page === currentPage && 'active'} onClick={() => setCurrentPage(page)}>
					<button>{page}</button>
				</li>
			))}

            <li >
				<button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages && 'disabled'}>
					&raquo;
				</button>
			</li>
        </ul>
    )
}