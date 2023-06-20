const droptoggle = document.querySelectorAll("#drop-toggle")
const adsContainer = document.querySelector('#all-ads-container')

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

const ErrorTracker = document.getElementById('error-tracker');
const advertisementTitle = document.getElementById('advertisement_title');
const advertisementLink = document.getElementById('ad_link');
const advertisementImage = document.getElementById('advertisement_image');
const advertisementDescription = document.getElementById('ad_description');

const createAdBtn = document.getElementById('create-ad');

const sampleTitle = 'The Psychology of Color in Marketing and Design'

const sampleDescription = "A deep dive into the psychology of color, including how different colors can impact emotions, behavior, and perceptions"


const getCreatedAds = async ()=>{

try{

    const response = await fetch('/api/superadmin/get_all_ads',{
        method: "GET",
        headers: {
            "Content-Type":"Application/Json"
        }
    })

    const data = await response.json()
    const ads = data.adverts

    adsContainer.innerHTML = ads.map(x =>{

    return `
    
    
    <div class="single-ad">

    <div class="ad-title">
        <p>
        ${x.Ad_title}</p>
    </div>
    <div class="ad-description">
        <p>${x.Ad_description}</p>
    </div>
    <div class="ad-status">
    ${x.Ad_status === 'active' ? `<p class="active-ad">Active</p>` : `<p class="inactive-ad">Inactive</p>`}
        
    </div>
    <div class="ad-controls">

    ${x.Ad_status !== 'active' ? ` <button class="activate-ad" id="activate-ad" data-adid=${x._id} >Activate</button>` : ` <button class="deactivate-ad" id="deactivate-ad" data-adid=${x._id} > Deactivate</button>`}
       
       

    </div>

</div>


    
    
    `


    }).join('')

    const activateAdBtn = document.querySelectorAll('#activate-ad')

    activateAdBtn.forEach((button)=>{

        button.addEventListener('click', async ()=>{

            const id = button.dataset.adid

            try{

                const response = await fetch('/api/superadmin/change_ad_status', {
                    method: "POST",
                    headers: {
                        "Content-Type":"Application/Json"
                    },
                    body: JSON.stringify({
                        action: 'activate',
                        id: id
                    })
                })

                const data = await response.json()

                alert(data.details)
                //console.log(data)




            } catch(error){

                console.error(error)
            }

           // alert(id)
            
        })

    })


    // Deactivate already active ad

    const DeactivateAdBtn = document.querySelectorAll('#deactivate-ad')

    DeactivateAdBtn.forEach((button)=>{

        button.addEventListener('click', async ()=>{

            const id = button.dataset.adid

            try{

                const response = await fetch('/api/superadmin/change_ad_status', {
                    method: "POST",
                    headers: {
                        "Content-Type":"Application/Json"
                    },
                    body: JSON.stringify({
                        action: 'deactivate',
                        id: id
                    })
                })

                const data = await response.json()

                alert(data.details)
                //console.log(data)




            } catch(error){

                console.error(error)
            }

        })

    })

    //console.log(data)

}
catch(error){

    console.error(error)
}



}


getCreatedAds()




const createAd = async ()=>{

   try{

    const response = await fetch('/api/superadmin/create_ad', {
        method: "POST",
        headers: {
            "Content-Type":"Application/Json"
        },
        body: JSON.stringify({
            Ad_image: advertisementImage.value,
            Ad_title: advertisementTitle.value,
            Ad_description: advertisementDescription.value,
            Ad_link: advertisementLink.value

        })
    })

    const data = await response.json()

    if(data.details === "Advertisement Sucesfully Created"){

        location.reload()
    }

    //console.log(data)
    

   } 
   catch(error){

    //console.log(error)
   }


}

createAdBtn.addEventListener('click', (e)=>{

    if(advertisementTitle.value.length > sampleTitle.length){

        ErrorTracker.innerHTML = "Title should be " + sampleTitle.length + " Characters Max (spaces included) "
        ErrorTracker.style.color = "red"
        return;
    }

    if(advertisementDescription.value.length > sampleDescription.length){

        ErrorTracker.innerHTML = "Description should be " + sampleDescription.length + " Characters Max (spaces included) "
        ErrorTracker.style.color = "red"
        return;

    }

    e.target.innerHTML = "creating..."

    setTimeout(() => {

        createAd()
        .then(e.target.innerHTML = "Create Ad")
        
    }, 1000);

})

