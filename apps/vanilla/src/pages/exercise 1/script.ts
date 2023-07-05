const headerHeight = 72;
const filtersComponent = document.querySelector('.filters');

function fixFilters(){
	if(filtersComponent === null) return;
	addEventListener('scroll', () => {
		if(window.scrollY >= headerHeight){
			filtersComponent.classList.add('fixed');
		} else {
			filtersComponent.classList.remove('fixed')
		}
	})
}

function fixBookCategory(){
	const bookLists = document.querySelectorAll('.book-list');
	const maxWidthWindowWithOutsideFilters = 1000

	addEventListener('scroll', () => {
		const scrollY = window.scrollY;
		let offset = window.innerWidth <= maxWidthWindowWithOutsideFilters ?
			filtersComponent?.clientHeight ?? 0 :
			0

		for(let i = 0; i < bookLists.length; i++){
			const bookList = bookLists[i];
			const position = bookList.getBoundingClientRect();

			const category = bookList.querySelector('.book-category');
			if(category === null) continue;

			if(position.top <= offset && scrollY >= headerHeight) category.classList.add('fixed')
			else category.classList.remove('fixed')

			category.setAttribute('style', `top: ${offset}px`);
		}
	})
}


fixBookCategory()
fixFilters()
