const sectionsCount = document.querySelectorAll('section');

let sectionIdName = [];
/// looping over the sectionsCount nodelist to extract every section in order to manipulate it
const getSectionDetails = () => {
	sectionsCount.forEach((element) => {
		sectionIdName.push(element.id);
	});
};

// build the nav

const buildNavItems = () => {
	getSectionDetails();

	const ulElement = document.querySelector('#navbar__list');

	for (let i = 0; i < sectionIdName.length; i++) {
		const unOrderedList = document.createElement('li');

		const unOrderedListLink = document.createElement('a');

		unOrderedListLink.innerHTML = sectionIdName[i];

		unOrderedListLink.classList.add('menu__link');
		unOrderedListLink.setAttribute('href', `${sectionIdName[i]}`);

		unOrderedList.append(unOrderedListLink);

		ulElement.append(unOrderedList);
	}
};

document.addEventListener('load', buildNavItems());

const navBarAnchorTags = document.querySelectorAll('a.menu__link');

///adding scroll event listener to the window element.
const scrollPy = () => {
	window.onscroll = () => {
		const scrollPositon = document.documentElement.scrollTop || document.body.scrollTop;

		for (let s in sectionsCount) {
			///the 80 is for better performance of the scrollpy function.
			if (sectionsCount.hasOwnProperty(s) && sectionsCount[s].offsetTop - 80 <= scrollPositon) {
				const id = sectionsCount[s].id;

				navBarAnchorTags.forEach((element) => {
					element.classList.remove('myaddedclass');
				});

				document.querySelector(`a[href*=${id}]`).classList.add('myaddedclass');

				sectionsCount.forEach((element) => {
					element.classList.remove('your-active-class');
				});

				sectionsCount[s].classList.add('your-active-class');
			} else if (scrollPositon === 0) {
				navBarAnchorTags.forEach((element) => {
					element.classList.remove('myaddedclass');
				});
			}
		}
	};
};
scrollPy();

// Scroll to anchor ID using scrollTO event.
navBarAnchorTags.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		sectionsCount[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});
