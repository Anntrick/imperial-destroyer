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
            <li className={`${currentPage === 1? 'disabled' : ''}`} >
                <button onClick={() => setCurrentPage(currentPage - 1)}>
					&laquo;
				</button>
            </li>

            {pages.map((page) => (
				<li key={page} className={`${page === currentPage && 'active'}`} onClick={() => setCurrentPage(page)}>
					<button>{page}</button>
				</li>
			))}

            <li className={`${currentPage === totalPages && 'disabled'}`}>
				<button onClick={() => setCurrentPage(currentPage + 1)}>
					&raquo;
				</button>
			</li>
        </ul>
    )
}