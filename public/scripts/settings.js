const droptoggle = document.querySelectorAll("#drop-toggle")
const id = localStorage.getItem('id')

const requestVerificationBtn = document.getElementById('request-verification');
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

// Display the verification

const verificationStatus = document.getElementById('verification-status')

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

        if(currentUser.verified === 'not verified'){
            verificationStatus.innerHTML = "Not Verified"
        }
        if(currentUser.verified === 'requested'){
            verificationStatus.innerHTML = "Requested"
            verificationStatus.style.color = "orange"
            requestVerificationBtn.style.display ="none"
            requestVerificationBtn.disabled = true
        }
        if(currentUser.verified === 'verified'){
            verificationStatus.innerHTML = "Verified"
            verificationStatus.style.color = "green"
            requestVerificationBtn.style.display ="none"
            requestVerificationBtn.disabled = true
        }

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

const changePasswordBtn = document.getElementById('change-password');
const oldPassword = document.getElementById('old_password');
const newPassword = document.getElementById('new_password');
const confirmNewPassword = document.getElementById('confirm_password');
const passwordChangeStatus = document.getElementById('change-status')


changePasswordBtn.addEventListener('click', async ()=>{

if(confirmNewPassword.value !== newPassword.value){

passwordChangeStatus.innerHTML = "New Passwords Don't Match"
passwordChangeStatus.style.color = "red"

return;
}

if(newPassword.value < 6){
    passwordChangeStatus.innerHTML = "Password not Strong"
    passwordChangeStatus.style.color = "red"

    return; 

}

if(oldPassword.value === ""){
    passwordChangeStatus.innerHTML = "Password Required"
    passwordChangeStatus.style.color = "red"

    return;
}

if(oldPassword.value.trim() === newPassword.value.trim()){

    passwordChangeStatus.innerHTML = "Choose a Different Password"
    passwordChangeStatus.style.color = "red"

    return;
}

// return console.log(oldPassword.value)

try {

    const response = await fetch('/api/change_password/'+id, {
        method: "PUT",
        headers: {
            "Content-Type":"Application/Json"
        },
        body: JSON.stringify({
            oldPassword: oldPassword.value.trim(),
            password: newPassword.value.trim()
        })
    })

    const data = await response.json()
    console.log(data)

    if(data.details === "Invalid Credentials"){
        passwordChangeStatus.innerHTML = data.details
        passwordChangeStatus.style.color = "red"

        return;
    }
    if(data.details === "Password Updated Sucessfully"){
        passwordChangeStatus.innerHTML = data.details
        passwordChangeStatus.style.color = "green"
        window.location.href = '/join'

        return;
    }


    
} catch (error) {
    console.log(error)
}


})


// Request for verifications


requestVerificationBtn.addEventListener('click', async()=>{

    try{

    const response = await fetch('/api/request_verification/'+id, {
    
        method: "PUT",
        headers:{
            "Content-Type":"Application/Json"
        }

    })


    } catch(error){

        console.log(error)
    }

})