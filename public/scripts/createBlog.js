window.addEventListener('load', () => {

    const form = document.querySelector('.create-blog-form')
    const inputs = form.querySelectorAll('input')
    const textArea = form.querySelector('textarea')
    let formErrors = false
    let images = document.querySelector('.images')


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