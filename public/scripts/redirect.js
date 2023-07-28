window.addEventListener('load',()=>{
    function countdownRedirect() {
        let counter = 5;
        let msg = document.querySelector('.redirect-msg')
        const countdownInterval = setInterval(() => {
          counter--;
          msg.innerHTML= `Seras redirigido al inicio en ${counter}s`;
      
          // Si han transcurrido los 5 segundos, realiza el redirecciónamiento
          if (counter === 1) {
            clearInterval(countdownInterval);
            window.location.href = '/';
          }
        }, 1000);
      }
      
      // Llamar a la función countdownRedirect para iniciar el contador y el timeout
      countdownRedirect();
})