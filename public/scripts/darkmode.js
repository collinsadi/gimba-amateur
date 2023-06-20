const body = document.querySelector('body');

const toggle = document.getElementById('mode-switch')


window.addEventListener("keydown",(e)=>{

    if(e.altKey && e.key === 'b'){

       // alert('working')

        body.style.setProperty('--white-color', 'white')
        body.style.setProperty('--white-text', 'white')
        body.style.setProperty('--black-color', 'black')
        body.style.setProperty('--black-text', 'black')

        localStorage.setItem('mode', 'light')

        if(toggle){

              toggle.checked = true
        }

      

    }

    if(e.altKey && e.key === 'd'){

        body.style.setProperty('--white-color', 'black')
        body.style.setProperty('--white-text', 'black')
        body.style.setProperty('--black-color', 'white')
        body.style.setProperty('--black-text', 'white')

        localStorage.setItem('mode', 'dark')

        if(toggle){

             toggle.checked = false
        }

       

    }


})


const checkMode = ()=>{

    const mode = localStorage.getItem('mode')


    if(mode === 'dark'){

        body.style.setProperty('--white-color', 'black')
        body.style.setProperty('--white-text', 'black')
        body.style.setProperty('--black-color', 'white')
        body.style.setProperty('--black-text', 'white')

        if(toggle){

            toggle.checked = false
        }

        


    }
    else{

        if(toggle){

              toggle.checked = true
        }

      
    }

}

checkMode()

toggle.addEventListener('change', ()=>{


if(toggle.checked){

    
    body.style.setProperty('--white-color', 'white')
    body.style.setProperty('--white-text', 'white')
    body.style.setProperty('--black-color', 'black')
    body.style.setProperty('--black-text', 'black')


    localStorage.setItem('mode', 'light')
    //alert('checked')
}

if(!toggle.checked){

    body.style.setProperty('--white-color', 'black')
    body.style.setProperty('--white-text', 'black')
    body.style.setProperty('--black-color', 'white')
    body.style.setProperty('--black-text', 'white')


    localStorage.setItem('mode', 'dark')

}

})
