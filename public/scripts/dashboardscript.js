

let bringSidebar = document.querySelector('#mobile-sidebar');
let sideBar = document.querySelector('#dashboard-sidebar');


bringSidebar.addEventListener('click', ()=>{
   // alert('working')
    sideBar.style.display = "block"

})

const expandEditor = document.querySelector('#create-new-blog')
const editor = document.querySelector('#the-main-editor');


expandEditor.addEventListener('click', ()=>{

    if(editor.classList.contains('removeeditor')){
        editor.classList.remove('removeeditor')
        editor.classList.add('showeditor')
    } else if(editor.classList.contains('showeditor')){
        editor.classList.remove('showeditor')
        editor.classList.add('removeeditor')
    } else{
        editor.style.display = 'none'
    }

    document.getElementById('arrow-to-toggle').classList.toggle('fa-angle-up', ' fa-angle-down')

})


