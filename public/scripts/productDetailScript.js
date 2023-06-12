window.addEventListener('load', () => {

    const mainImg = document.querySelector('.main-img')
    const productImgs = document.querySelectorAll('.product-img')
    const itemQuantity = document.querySelector('.item-quantity')
    const addToCartForm = document.querySelector('.add-to-cart-form')

    productImgs.forEach(img => {
        img.addEventListener('click', () => {
            const activeImg = document?.querySelector('.other-img-container-active')
            activeImg?.classList.remove('other-img-container-active')
            mainImg.src = img.src
            img.classList.add('other-img-container-active')
        })
    })

    itemQuantity.addEventListener('change', (e) => {
        itemQuantity.value = e.target.value
    })

    addToCartForm.addEventListener('submit', (e) => {
        e.preventDefault()
        itemQuantity.classList.remove('input-error')
        const inputValue = itemQuantity.value.trim() // sin espacios
        if(isNaN(inputValue)){
            itemQuantity.classList.add('input-error')
        }
    })

})
