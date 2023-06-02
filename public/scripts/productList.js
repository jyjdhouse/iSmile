window.addEventListener('load', () => {

    //FUNCIONES

    const filterBtn = document.querySelector('.filter-btn-container');
    const filterContainer = document.querySelector('.filters-container');
    const filtersContainer = 'filters-container';
    const blackScreen = 'black-screen';

    document.querySelector(`.${blackScreen}`).addEventListener('click', () => {
        const filtersContainerElement = document.querySelector(`.${filtersContainer}`)
        if (filtersContainerElement.classList.contains('filters-container-active')) {
            filtersContainerElement.classList.remove('filters-container-active')
        }
    });


    // FUNCION FILTROS
    const activeFiltersContainer = document.querySelector('.active-filters-container');
    const activeFiltersClearBtnContainer = document.querySelector('.active-filters-clear-filters-container');
    const filterValues = document.querySelectorAll('.filter-value');
    const clearAllBtn = document.querySelector('.clear-all-btn');
    const clearAllFiltersContainer = document.querySelector('.clear-filters-container');
    const filterAmountContainer = document.querySelector('.filter-amount-parenthesis');
    const filterAmount = document.querySelector('.filter-amount');

    let i = 0;
    let activeFiltersArray = [];


    filterBtn.addEventListener('click', () => {
        filterContainer.classList.toggle('filters-container-active');
        if (activeFiltersArray.length) { //Si hay activos, los toggleo, sino solo los saco
            activeFiltersClearBtnContainer.classList.toggle('active-filters-clear-filters-container-active');
        } else {
            activeFiltersClearBtnContainer.classList.remove('active-filters-clear-filters-container-active');
        }

    });

    // FUNCION PARA SACAR UN SOLO FILTRO
    const clearOneFilter = () => {
        let activeFilters = document.querySelectorAll('.active-filter');
        activeFilters.forEach(activeItem => {
            activeItem.addEventListener('click', () => {
                let value = activeItem.dataset.filtervalue;
                activeItem.remove(); // Lo borro de los div
                activeFiltersArray = activeFiltersArray.filter(item => item != value);
                innerFilterAmount();
            })
        })
    }

    // INYECTO LA CANTIDAD DE FILTROS SEGUN CORRESPONDA
    const innerFilterAmount = () => {
        const amount = activeFiltersArray.length;
        console.log(amount);
        if (!amount) { //Si no hay filtros activos..
            filterAmountContainer.classList.remove('filter-amount-parenthesis-active');
            clearAllFiltersContainer.classList.remove('clear-filters-container-active');
            activeFiltersClearBtnContainer.classList.remove('active-filters-clear-filters-container-active');

        } else {
            filterAmountContainer.classList.add('filter-amount-parenthesis-active');
            activeFiltersClearBtnContainer.classList.add('active-filters-clear-filters-container-active');
            filterAmount.innerText = amount;
        }

    }


    filterValues.forEach(filter => {
        filter.addEventListener('click', () => {
            // Si no esta activa la parte de tarjetas de filtros, la agrego
            if (!clearAllFiltersContainer.classList.contains('clear-filters-container-active')) {
                clearAllFiltersContainer.classList.add('clear-filters-container-active');
            }
            let value = filter.dataset.filtervalue;
            console.log(value);

            // pregunto si es la primera vez que selecciona filtro
            if (i === 0) {
                activeFiltersArray.push(value);
                i++;
                activeFiltersContainer.innerHTML +=
                    `<div class = 'active-filter' data-filterValue = "${value}"> 
                        <i class='bx bx-x'></i>
                        <span class="active-filter-span">${value}</span>
                    </div> `;

            } else {

                const checkIfFilterExists = activeFiltersArray.find(filter => filter == value);
                if (!checkIfFilterExists) {
                    activeFiltersArray.push(value);
                    activeFiltersContainer.innerHTML +=
                        `<div class = 'active-filter' data-filterValue = "${value}"> 
                            <i class='bx bx-x'></i>
                            <span class="active-filter-span">${value}</span>
                        </div> `;
                }
            }
            clearOneFilter();
            innerFilterAmount();
        })
    })



    // FUNCION PARA HACER UN CLEAR ALL DE TODOS LOS FILTROS

    const clearAllFn = () => {
        clearAllBtn.addEventListener('click', () => {
            const activeFilters = activeFiltersContainer.querySelectorAll('.active-filter');
            activeFilters.forEach(filter => {
                filter.remove();
                activeFiltersArray = [];
            });
            innerFilterAmount();
            activeFiltersClearBtnContainer.classList.remove('active-filters-clear-filters-container-active');
        })
    }
    clearAllFn();

})