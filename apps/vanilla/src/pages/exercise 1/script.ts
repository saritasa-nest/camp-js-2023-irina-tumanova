function fixFilters(){
	const filtersComponent = document.querySelector('.filters');
	const headerHeight = 72;

	if(filtersComponent === null) return;
	addEventListener('scroll', () => {
		if(window.scrollY >= headerHeight){
			filtersComponent.classList.add('fixed');
		} else {
			filtersComponent.classList.remove('fixed')
		}
	})
}

fixFilters();
