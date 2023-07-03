window.addEventListener('load', () => {

    const form = document.querySelector('.create-product-form')
    const inputs = document.querySelectorAll('.create-product-form input')
    const textArea = document.querySelector('.create-product-form textarea')


    form.addEventListener('submit', (e) => {
        console.log(inputs)
        e.preventDefault()
        inputs.forEach(inp => {
            inp.classList.remove('input-error')
            if(!inp.value){
                inp.classList.add('input-error')
            }
        })

        textArea.classList.remove('input-error')
        if(textArea.value.trim() == ''){
            console.log('entro')
            textArea.classList.add('input-error')
        }

    })

})