window.addEventListener('load', () => {

    const mainImg = document.querySelector('.main-img')
    const productImgs = document.querySelectorAll('.product-img')

    productImgs.forEach(img => {
        img.addEventListener('click', () => {
            const activeImg = document?.querySelector('.other-img-container-active')
            activeImg?.classList.remove('other-img-container-active')
            mainImg.src = img.src
            img.classList.add('other-img-container-active')
        })
    });

    // Apenas carga me fijo cuantas other-images vienen- en base a eso le doy width
    const otherImgs = document.querySelectorAll('.other-img-container');
    const count = otherImgs.length;
    otherImgs.forEach(cont => cont.style.width = `${100 / count - (count > 2 ? 5 : 15)}%`)
    // Modifico el tamano de otherImg en funcion de la foto gde
    const otherImgContainer = document.querySelector('.other-product-imgs-container');
    // console.log(otherImgContainer);
    const mainImgContainer = document.querySelector('.main-img-container');
    let widthToSet = mainImgContainer.offsetWidth;
    otherImgContainer.style.width = `${widthToSet}px`;
    // Cuando cambia la resolucion va cambiando con esto
    window.addEventListener('resize', () => {
        widthToSet = mainImgContainer.offsetWidth;
        otherImgContainer.style.width = `${widthToSet}px`;
    })

})
