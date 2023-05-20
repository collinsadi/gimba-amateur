
const openNav = document.querySelector('#open-btn');
const closeNav = document.querySelector("#close-menu");
const Panel = document.querySelector("#mobile-panel");
const preloader = document.getElementById('preloader');




window.addEventListener('load', ()=>{

    setTimeout(() => {

        preloader.style.display = "none"
        
    }, 2000);
})


openNav.addEventListener("click", ()=>{

    Panel.classList.add("open-nav")

})

closeNav.addEventListener("click", ()=>{

    //("close?")

    Panel.classList.remove("open-nav")
    Panel.classList.add('close-nav')
})