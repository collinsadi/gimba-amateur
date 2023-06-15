const adTitle = document.getElementById('advert_title')
const adDescription = document.getElementById('ad_description')


const adContainer = document.getElementById('ad_container')


const getAd = async ()=>{

try{

    const response = await fetch('/api/superadmin/get_active_ad', {
        method: "GET",
        headers: {
            "Content-Type":"Application/Json"
        }
    })

    const data = await response.json()
    const ad = data.activeAd[0]

    console.log(data.activeAd[0])

    if(ad){
  adContainer.innerHTML = `
    
    
    
    <div class="featured-inner">


        <div class="main1">
            <img src="${ad.Ad_image}" alt="">
        </div>

        <div class="blog-contents">

            <div class="content-inner">
                

                
                <div class="left">

                    <div class="category1">
                        <h4>Advertisement</h4>
                    </div>

                    <div class="blog-title">
                        
                        <a href=${ad.Ad_link}>
                        <h1 id="advert_title">${ad.Ad_title}</h1>
                        </a>
                    
                    </div>

                    <div class="blog-snippet">

                        <p id="ad_description">${ad.Ad_description}</p>

                    </div>

                </div>
                <div class="right">

                    <div class="top">

                        <div class="tag-btn1">
                        <a href=${ad.Ad_link} style="text-decoration: none; color: rgba(128, 128, 128, 0.705);"><h3>Learn More</h3></a>
                        </div>

                    </div>

                    

                </div>





            </div>
            
        </div>
    </div>
    
    
    
    
    
    `


    } else{

        adContainer.style.display = "none"
    }

  
    console.log(data)


}catch(error){

console.log(error)

}   


}

getAd()