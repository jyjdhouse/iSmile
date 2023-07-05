window.addEventListener('load', () => {

    const form = document.querySelector('.create-blog-form')
    const inputs = form.querySelectorAll('input')
    const textArea = form.querySelector('textarea')
    let formErrors = false
    let images = document.querySelector('.images')
    let imagesRadioContentContainer = document.querySelector('.images-radio-content-container')


    form.addEventListener('submit', (e) => {

        e.preventDefault()
        formErrors = false
        inputs.forEach(inp => {
            inp.classList.remove('input-error')
            if (!inp.value) {
                inp.classList.add('input-error')
                formErrors = true
            }

        })

        textArea.classList.remove('input-error')
        if (textArea.value.trim() == '') {

            textArea.classList.add('input-error')
            formErrors = true
        }

        if (!formErrors) {
            form.submit()
        }

    })

    images.addEventListener('change', () => {

        for (var i = 0; i < images.length; i++) {
            let divContainer = document.createElement('div');
            divContainer.classList.add('radio-input-container');

            imagesRadioContentContainer.innerHTML += divContainer


            

        }


    })


})