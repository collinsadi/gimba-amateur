const droptoggle = document.querySelectorAll("#drop-toggle")
const id = localStorage.getItem('id')
// for(i =0; i < droptoggle.length; i++){



    

//     droptoggle[i].addEventListener('click', ()=>{
//         const panel = droptoggle[i].nextElementSibling;

       
//             if(panel.classList.contains('removeeditor')){
//             panel.classList.remove('removeeditor')
//             panel.classList.add('showeditor')
//         } else if(panel.classList.contains('showeditor')){
//             panel.classList.remove('showeditor')
//             panel.classList.add('removeeditor')
//         } else{
//             panel.style.display = 'none'
//         }
      

        
//     })
// }

droptoggle.forEach(button =>{

    button.addEventListener("click", ()=>{

        const panel = button.nextElementSibling;

       
        if(panel.classList.contains('removepanel')){
        panel.classList.remove('removepanel')
        panel.classList.add('showpanel')
    } else if(panel.classList.contains('showpanel')){
        panel.classList.remove('showpanel')
        panel.classList.add('removepanel')
    } else{
        panel.style.display = 'none'
    }

    })

})

// Get the users previous Informations


const fullname = document.getElementById('fullname')
const email = document.getElementById('email');
const username = document.getElementById('username');
const profileImage = document.getElementById('profile_image');

const getUserInfo = async ()=>{

    try{

        const response = await fetch('/api/get_user_information/'+id, {
            method: "POST", 
            headers:{
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()
        
        const currentUser = data.currentUser
        console.log(currentUser)
        
        // Fill the inputs

        email.value = currentUser.email
        fullname.value = currentUser.full_name
        localStorage.setItem('fullName',currentUser.full_name )

    } catch(error){
        console.error(error)
    }

}

getUserInfo();

// Save updated Informations

const saveChanges = document.getElementById('change-info')

saveChanges.addEventListener('click', async ()=>{
    // alert('Working')

    try {
        
    const response = await fetch('/api/edit_user/'+id, {
        method: "PUT",
        headers: {
        "Content-Type":"Application/Json"
        },
        body: JSON.stringify({
            full_name: fullname.value.trim(),
            username: username.value.trim(),
            profile_image: profileImage.value.trim()

        })
    })

    const data = await response.json()
    console.log(data)
    location.reload()

    } catch (error) {
        console.log(response)
        alert('An Error Has Occured')
    }
})

// Change Password

