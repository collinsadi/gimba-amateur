// alert('Okay')

const droptoggle = document.querySelectorAll("#drop-toggle")


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

const blacklistItem = document.getElementById("receiver")
const addToBlacklistBtn = document.getElementById('add-to-blacklist')
const ErrorTracker = document.getElementById('error-tracker')
 const itemsContainer = document.getElementById('blacklist-items')

 
addToBlacklistBtn.addEventListener('click', async ()=>{

try{

    const response = await fetch('/api/superadmin/create_new_blacklist', {
        method: "POST",
        headers: {
            "Content-Type":"Application/Json"
        },
        body: JSON.stringify({blacklistitem: blacklistItem.value.toLowerCase().trim()})
    })

    const data = await response.json()

    ErrorTracker.innerHTML = data.details
    ErrorTracker.style.color = "red"

    if(data.details === "Item added to Blacklist"){

        ErrorTracker.innerHTML = data.details
        ErrorTracker.style.color = "green"
        location.reload()
    }

    console.log(data)


} catch(error){
    
    

    console.log(error)
}


})

const displayBlaclistItems = async ()=>{

   

    try {

        const response = await fetch('/api/superadmin/get_blacklist_items', {
            method: "POST",
            headers: {
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()
        const blacklist = data.blacklist

        itemsContainer.innerHTML = blacklist.map(x=>{

            return `
            
            <tr>
            <td>${x.blacklistItem}</td>
            <td><button class="block-user" id="remove-from-blacklist" data-itemid=${x._id}>Remove</button></td>
            </tr>
            
            
            
            
            `

        }).join('')

        console.log(data)

        const removeFromBlacklistBtn = document.querySelectorAll('#remove-from-blacklist')

        removeFromBlacklistBtn.forEach(button=>{

            button.addEventListener('click', async ()=>{

                const id = button.dataset.itemid

                // alert(id)

                try{

                    const response = await fetch('/api/superadmin/remove_from_blacklist', {
                        method: "DELETE",
                        headers: {
                            "Content-Type":"Application/Json"
                        },
                        body: JSON.stringify({itemid: id})
                    })

                    const data = await response.json()

                    if(data.details === "Item Removed From Blacklist"){

                        location.reload()
                    }

                    console.log(data)


                } catch(error){

                    console.log(error)
                }
            })

        })


    }
    catch(error){

        console.log(error)
    }

}

displayBlaclistItems();
