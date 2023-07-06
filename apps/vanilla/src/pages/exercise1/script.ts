/** Header height. */
const headerHeight = 72;

/** Filters component. */
const filtersComponent = document.querySelector('.filters');

/** Fix filters on top. */
function fixFilters(): void {
	if (filtersComponent === null) {
		return;
	}
	addEventListener('scroll', () => {
		if (window.scrollY >= headerHeight) {
			filtersComponent.classList.add('fixed');
		} else {
			filtersComponent.classList.remove('fixed');
		}
	});
}

/** Fix book categories on top. */
function fixBookCategory(): void {
	const bookLists = document.querySelectorAll('.book-list');
	const maxWidthWindowWithOutsideFilters = 1000;

	addEventListener('scroll', () => {
		const { scrollY } = window;
		const offset = window.innerWidth <= maxWidthWindowWithOutsideFilters ?
			filtersComponent?.clientHeight ?? 0 :
			0;

		for (let i = 0; i < bookLists.length; i++) {
			const bookList = bookLists[i];
			const position = bookList.getBoundingClientRect();

			const category = bookList.querySelector('.book-category');
			if (category === null) {
				continue;
			}

			if (position.top <= offset && scrollY >= headerHeight) {
				category.classList.add('fixed');
			} else {
				category.classList.remove('fixed');
			}

			category.setAttribute('style', `top: ${offset}px`);
		}
	});
}

fixBookCategory();
fixFilters();
