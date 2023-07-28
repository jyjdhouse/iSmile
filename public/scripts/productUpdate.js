window.addEventListener('load', () => {

    const form = document.querySelector('.create-product-form')
    const inputs = document.querySelectorAll('.required-input')
    const textArea = document.querySelector('.create-product-form textarea')
    let formErrors = false

    inputs.forEach(inp => {
        inp.addEventListener('change', (e) => {
            inp.value(e.target.value)
        })
    })

    form.addEventListener('submit', (e) => {

        e.preventDefault()
        formErrors = false
        inputs.forEach(inp => {
            inp.classList.remove('input-error')
            if(!inp.value || inp.value.trim() == ''){
                inp.classList.add('input-error')
                formErrors = true
            }
           
        })

       /*  textArea.classList.remove('input-error')
        if(textArea.value.trim() == ''){
            
            textArea.classList.add('input-error')
            formErrors = true
        } */

        if(!formErrors){
            form.submit()
        }

    });

    // Logica para reproducir los videos que esten
    const videosInView = document.querySelectorAll('.video');
    videosInView.forEach(video=>video.play());

})