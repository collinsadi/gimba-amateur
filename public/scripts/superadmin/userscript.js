
const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');




const getUsers = async ()=>{

    const allUserTable = document.querySelector('#all-users')

try {

        const response = await fetch('/api/superadmin/get_all_users', {
            method: "POST",
            headers: {
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()
        const authors = data.authors
        

        allUserTable.innerHTML = authors.map( (x)=>{

        const date = new Date(x.createdAt)

    



            return `
            
            
            <tr>
            <td><a href="/u/${x.useridname}">${x.useridname}</a></td>
            <td>${x.email}</td>
            
                <td>${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</td>


            ${x.verified === "verified" ? `<td class="verified">Verified</td>` : ""}

            ${x.verified === "requested" ? `<td class="requested">Requested</td>` : ""}

            ${x.verified === "not verified" ? `<td class="not-verified">Not Verified</td>` : ""}

            ${x.verified === "removed" ? `<td class="removed">Removed</td>` : ""}

            ${x.blocked !== true ? `<td><button class="block-user" id="block-users" data-userid=${x._id}>Block</button></td>` : `<td><button class="block-user" data-userid=${x._id}>Unblock</button></td>`}

            

            ${x.verified !== "verified" ? `<td><button class="verify-user" id="verify-user" data-userid=${x._id}>Verify</button></td>` : `<td><button class="unverify-user" id="unverify-user" data-userid=${x._id}>X-Badge</button></td>`}


            
        </tr>
            
            
            `
        }).join('')

        console.log(data)

        
        const VerifyBtn = document.querySelectorAll("#verify-user")
        

        VerifyBtn.forEach((button)=>{

            button.addEventListener("click", ()=>{

                verifyUser(button)
            })

        })


    const removeverificationBtn  = document.querySelectorAll("#unverify-user")

    removeverificationBtn.forEach((button)=>{

            button.addEventListener("click", ()=>{

                removeVerification(button)
            })

        })


    const blockBtn  = document.querySelectorAll("#block-users")

    blockBtn.forEach((button)=>{

            button.addEventListener("click", ()=>{

                blockUser(button)
            })

        })



}catch(error){

    console.log(error)
}


}

getUsers();

const verifyUser = async (button)=>{


const id = button.dataset.userid

try{

const response = await fetch('/api/superadmin/verify_user', {
    method: "POST",
    headers: {
        "Content-Type":"Application/Json"
    },
    body: JSON.stringify({userid: id})
})

const data = await response.json()

if(data.details === "User Verified"){

    errorMesage.style.display = 'block';
    errorMesage.style.borderLeft = '10px solid green';
    errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
    messageTitle.innerHTML = 'Success!';
    messageBody.innerHTML = data.details;
    location.reload()
}
console.log(data)

} catch(error){

    console.log(error)
}



    
// alert(id)
}

const removeVerification = async (button)=>{


const id = button.dataset.userid

try{

const response = await fetch('/api/superadmin/remove_user_verification', {
    method: "POST",
    headers: {
        "Content-Type":"Application/Json"
    },
    body: JSON.stringify({userid: id})
})

const data = await response.json()

if(data.details === "User Verification Removed"){

    errorMesage.style.display = 'block';
    errorMesage.style.borderLeft = '10px solid green';
    errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
    messageTitle.innerHTML = 'Success!';
    messageBody.innerHTML = data.details;
    location.reload()
}
console.log(data)

} catch(error){

    console.log(error)
}



    
// alert(id)
}
const blockUser = async (button)=>{


const id = button.dataset.userid

try{

const response = await fetch('/api/superadmin/block_user', {
    method: "POST",
    headers: {
        "Content-Type":"Application/Json"
    },
    body: JSON.stringify({userid: id})
})

const data = await response.json()

if(data.details === "User Blocked"){

    errorMesage.style.display = 'block';
    errorMesage.style.borderLeft = '10px solid green';
    errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
    messageTitle.innerHTML = 'Success!';
    messageBody.innerHTML = data.details;
    location.reload()
}
console.log(data)

} catch(error){

    console.log(error)
}



    
// alert(id)
}