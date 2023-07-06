window.addEventListener('load', () => {

    const form = document.querySelector('.create-product-form')
    const inputs = document.querySelectorAll('.create-product-form input')
    const textArea = document.querySelector('.create-product-form textarea')
    let formErrors = false


    form.addEventListener('submit', (e) => {

        e.preventDefault()
        formErrors = false
        inputs.forEach(inp => {
            inp.classList.remove('input-error')
            if(!inp.value){
                inp.classList.add('input-error')
                formErrors = true
            }
           
        })

        textArea.classList.remove('input-error')
        if(textArea.value.trim() == ''){
            
            textArea.classList.add('input-error')
            formErrors = true
        }

        if(!formErrors){
            form.submit()
        }

    })

})