let cookieconsent = document.getElementById('cookieconsent');
let closeconsent = document.querySelector('#closeconsent');


window.addEventListener('load',()=>{

    setTimeout(() => {
         cookieconsent.classList.add('show-consent')
    }, 4000);

   
})

closeconsent.addEventListener('click', ()=>{
    cookieconsent.classList.add('remove-consent')
})