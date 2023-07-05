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

function fixBookCategory(offset){
	const bookLists = document.querySelectorAll('.book-list');

	addEventListener('scroll', () => {
		const scrollY = window.scrollY;

		for(let i = 0; i < bookLists.length; i++){
			const bookList = bookLists[i];
			const position = bookList.getBoundingClientRect();

			const category = bookList.querySelector('.book-category');
			if(category === null) continue;

			if(position.top <= offset && scrollY >= headerHeight) category.classList.add('fixed')
			else category.classList.remove('fixed')

			category.style.top = offset + 'px'
		}
	})
}

const windowWidth = window.innerWidth;
const filtersHeight = filtersComponent?.clientHeight ?? 0;

fixBookCategory(windowWidth <= 1000 ? filtersHeight : 0)
fixFilters()
