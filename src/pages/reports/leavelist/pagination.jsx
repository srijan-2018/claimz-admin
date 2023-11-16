import React from 'react';

function Pagination({ currentPage, totalPage, onPageChange }) {
	const pagesToShow = 2;
	const startPage = Math.max(currentPage - pagesToShow, 1);
	const endPage = Math.min(currentPage + pagesToShow, totalPage);

	const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
		(index) => startPage + index
	);

	return (
		<ul className='pagination'>
			{currentPage > 1 && (
				<li>
					<button onClick={() => onPageChange(currentPage - 1)}>
						&laquo; Previous
					</button>
				</li>
			)}
			{pageNumbers.map((page) => (
				<li key={page} className={currentPage === page ? 'active' : ''}>
					<button onClick={() => onPageChange(page)}>{page}</button>
				</li>
			))}
			{currentPage < totalPage && (
				<li>
					<button onClick={() => onPageChange(currentPage + 1)}>
						Next &raquo;
					</button>
				</li>
			)}
		</ul>
	);
}

export default Pagination;
