window.addEventListener('load', () => {


    const images = document.querySelectorAll('.other-img-container')
    if(window.innerWidth < 768){


        if(images.length != 1) {
            const adminActionsToggle = document.querySelector('.admin-toggle')
            const adminDropdown = document.querySelector('.blog-admin-actions-dropdown')
           
        
            adminActionsToggle.addEventListener('click', () => {
                adminDropdown.classList.toggle('blog-admin-actions-dropdown-active')
            })
        
            let activeImg = 0
            
            const autoSlideCarousel = () => {
                images.forEach((img, i) => {
                    if (i == activeImg) {
                        img.classList.remove('prev-img-container')
                        img.classList.remove('next-img-container')
                        img.classList.add('img-container-active')
                    }
                    else if (i == activeImg - 1) {
                        img.classList.remove('img-container-active')
                        img.classList.remove('next-img-container')
                        img.classList.add('prev-img-container')
                    }
                    else if (i == images.length - 1 && activeImg == 0) {
                        img.classList.remove('img-container-active')
                        img.classList.remove('next-img-container')
                        img.classList.add('prev-img-container')
                    }
                    else {
                        img.classList.remove('img-container-active')
                        img.classList.remove('prev-img-container')
                        img.classList.add('next-img-container');
                    }
                })
               
            }
        
        
            const autoSlideCondition = () => {
                if (activeImg < images.length - 1) {           
                    activeImg++  
                } else {
                    activeImg = 0
                }
                autoSlideCarousel()
            }
        
            setInterval(autoSlideCondition, 3000)
        }

      

    } else {
        images.forEach(img => {
            img.classList.remove('img-container-active')
        })
    }

  

})