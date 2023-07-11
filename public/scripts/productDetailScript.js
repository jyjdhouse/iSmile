window.addEventListener('load', () => {

    const user = document.querySelector('.user-logged')
    console.log(user.innerText)

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

    
})
