/** Fix filters on top. */
function fixFilters(): void {

	/** Header height. */
	const headerHeight = 72;

	/** Filters component. */
	const filtersComponent = document.querySelector('.filters');

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

fixFilters();
