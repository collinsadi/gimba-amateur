



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

            <td><button class="block-user" data-userid=${x.user_id}>Block</button></td>
            <td><button class="verify-user" id="verify-user" data-userid=${x._id}>Verify</button></td>
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
console.log(data)

} catch(error){

    console.log(error)
}



    
// alert(id)
}