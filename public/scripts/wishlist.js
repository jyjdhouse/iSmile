import { changeWishlistProductDimension, addWishlistProduct, removeWishlistProduct, printWishlistProducts, deactivateClass, activateClass } from "./utils.js";
window.addEventListener('load', async () => {
    try {
        const heartsContainer = document.querySelectorAll('.faved-item-container')

        // Apenas carga, imprimo los productos
        await printWishlistProducts();
        const modifyWishlistQuantity = () => {
            // Ahora modifico el wishlist
            const wishlistProductsAmount = document.querySelectorAll('.wishlist-product-card').length;
            // Agarro los dos <p> que tienen la cantidad de productos en la wishlist
            const wishlistProductQuantityElements = document.querySelectorAll('.wishlist-quantity-number');
            // Le escribo la cantidad de productos que tiene la wishlist
            wishlistProductQuantityElements.forEach(el => el.innerHTML = wishlistProductsAmount || '')
        };
        modifyWishlistQuantity();

        const toggleTopHeart = (liked, heart) => { //funcion para agregar producto a wishlist
            if (liked) {//Si estaba likeado, lo dislikeo
                heart.classList.remove('faved-item-container-active');
            } else {//Si NO estaba likeado, lo likeo
                heart.classList.add('faved-item-container-active');
            }
        };
        const handleFavContainerClick = async (e) => {
            const wishlistProductsSection = document.querySelector('.wishlist-products-section');
            const wishListProductCards = document.querySelectorAll('.wishlist-product-card');
            const productId = e.target.dataset.productid;
            const colorId = e.target.dataset.colorid;
            // Capturo al corazon
            let displayedHeart = e.target.closest('.product-card-container').querySelector('.faved-item-container');
            // Pregunto si ya estaba likeado o no
            let wasLiked = displayedHeart.classList.contains('faved-item-container-active');
            if (wasLiked) {//Si estaba likeado, lo dislikeo
                await removeWishlistProduct(productId, colorId);

            } else {//Si NO estaba likeado, lo likeo

                await addWishlistProduct(productId, colorId);
            }
            // Pinto o despinto el corazon
            toggleTopHeart(wasLiked, displayedHeart);
            await printWishlistProducts();
            modifyWishlistQuantity();
            listenRemoveBtns();
            listenFavContainers();
            listenAddingCartBtn();

        }
        const listenFavContainers = () => {//Escucha a los corazones
            const quickAddFavContainers = document.querySelectorAll('.quick-fav-container');

            for (let i = 0; i < quickAddFavContainers.length; i++) {
                const container = quickAddFavContainers[i];
                container.removeEventListener('click', handleFavContainerClick);
                container.addEventListener('click', handleFavContainerClick);
            };
        }
        listenFavContainers();
        // LOGICA PARA BORRAR PRODUCTO DESDE WISHLIST
        const listenRemoveBtns = () => {
            const removeProductBtns = document.querySelectorAll('.remove-wishlist-product-btn');
            const wishlistProductsSection = document.querySelector('.wishlist-products-section');
            removeProductBtns.forEach(btn => {
                btn.addEventListener('click', async () => {
                    const container = btn.closest('.wishlist-product-card'); //Agarro al contenedor de ese btn
                    const productId = container.dataset.productid
                    const colorId = container.dataset.colorid;
                    wishlistProductsSection.contains(container) && wishlistProductsSection.removeChild(container);
                    // Lo saco de db
                    await removeWishlistProduct(productId, colorId);
                    // Si no hay es que no esta en la vista de productList
                    if (heartsContainer) {//Si hay, voy por cada uno hasta encontrarlo
                        heartsContainer.forEach(heart => {
                            if (heart.dataset.colorid == colorId && heart.dataset.productid == productId) {
                                toggleTopHeart(true, heart);//Le paso true asi lo dislikea
                            }
                        })
                    }
                    modifyWishlistQuantity();
                    changeWishlistProductDimension();
                    listenRemoveBtns();
                });
            });
        };
        listenRemoveBtns();

        // LOGICA PARA AGREGAR PRODUCTO AL CARRO
        const listenAddingCartBtn = () => {

            const addProductCartBtn = document.querySelectorAll('.quick-add-bag-button');
            let sizeListContainer;
            let container;

            const wishlistProductColorTag = 'wishlist-product-selected-color-size';
            const wishlistAddCartSize = 'wishlist-quick-add-sizes-list';
            addProductCartBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    removeAllActiveSizes();
                    container = btn.closest('.wishlist-product-card');
                    sizeListContainer = container.querySelector('.wishlist-quick-add-sizes-list');
                    container.querySelector(`.${wishlistProductColorTag}`).classList.add(`${wishlistProductColorTag}-active`);
                    container.querySelector(`.${wishlistAddCartSize}`).classList.add(`${wishlistAddCartSize}-active`);
                    container.querySelector(`.quick-add-bag-button`).classList.add(`quick-add-bag-button-active`);

                    // Esto lo hago aca para que escuche una vez desplegado los sizes
                    document.addEventListener('click', (e) => {
                        // Me fijo si toco en cualquier lado menos en el contenedor de sizes
                        let clickInSizesContainer = e.target == sizeListContainer || sizeListContainer?.contains(e.target);
                        // Si el objetivo no es el contenedor ni ningún elemento hijo
                        if (!clickInSizesContainer && sizeListContainer.classList.contains(`${wishlistAddCartSize}-active`)) {
                            removeAllActiveSizes();
                        }
                    });
                })
            });

        };
        const removeAllActiveSizes = () => { //Le saco el active a todos los contenedores de la wishList
            const containers = document.querySelectorAll('.wishlist-product-card');
            containers.forEach(cont => {
                cont.querySelector(`.wishlist-product-selected-color-size`).classList.remove(`wishlist-product-selected-color-size-active`);
                cont.querySelector(`.wishlist-quick-add-sizes-list`).classList.remove(`wishlist-quick-add-sizes-list-active`);
                cont.querySelector(`.quick-add-bag-button`).classList.remove(`quick-add-bag-button-active`);
            })
        }
        listenAddingCartBtn();

    } catch (error) {
        return console.log(error);
    }
})