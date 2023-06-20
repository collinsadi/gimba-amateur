// alert('Working')

const getProfileInfo = async ()=>{

    const ProfileCard = document.getElementById('profile-card')
    const PostsDisplay = document.getElementById('blog-display')

    const username = window.location.href.split('/').pop()
    console.log(username)

try{

    const response = await fetch('/api/get_user_profile/'+username, {
        method: "GET",
        headers: {
            "Content-Type":"Application/Json"
        }
    })

    const data = await response.json()
    
    // createdAt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

    

    if(data.details === "Author Not Found"){
        window.location.href = "/404"
        return;
    }
    if(data.details === "Account is Disabled"){
        window.location.href = "/404"
        return;
    }


    const user = data.user
    const posts = data.posts
    const date = new Date(user.createdAt)

    document.title = user.full_name.toUpperCase()

    ProfileCard.innerHTML = `
    
    
    <div class="profile-card-inner">

    <div class="profile-image">
        <img src=${user.profileimage ? user.profileimage : `/images/user.png`} alt="">
    </div>
    <div class="author-details">


        <div class="name-badge">
        <h2>${user.useridname}</h2>
        

        ${user.verified === "verified" ? `<div class="badge pd-btm" title="Verified Blogger">
             <div class="fa-solid fa-circle-check"></div>
        </div>` : ""}
        
        
       
       
        </div>
        <p class="joined">Joined ${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
        <p>${user.bio.length > 75 ? user.bio.substring(0, 75)+ "..." : user.bio}</p>

        ${user.website ? `<div class="website">
            <i class="fa-solid fa-globe"></i>
            <p><a href=${user.website}>${user.website}</a></p>
        </div>` : ""}
        

        <div class="socials">

        ${user.twitter ? `<div class="twitter">
               <a href=${user.twitter}> <img src="/images/twitter.png" alt=""></a>
            </div>`: ""}

            

        </div>
        

    </div>

    ${user.cofee ? `<div class="buy-me-cofee">

       <a href=${user.cofee}> <img src="/images/buycofee.svg" alt=""></a>

    </div>
` : ""}

    
</div>
    
    
    
    
    `

    if(posts.length > 0){
          PostsDisplay.innerHTML = posts.map(x=>{

        return `
        
        

            <div class="blogs-single-item">

            <div class="single-item-top">

                <img src="${x.blog_body_image_url}" alt="">

            </div>

            <div class="single-item-bottom">

                <div class="author-date">

                <div class ="name-badge">
                <p>${user.useridname}</p>
                    ${user.verified === "verified" ? `<div class="badge" title="Verified Blogger">
                    <div class="fa-solid fa-circle-check"></div>
               </div>` : ""}
                </div>
                    

                    <div class="fa-solid fa-arrow-right
                    "></div>

                </div>

                <div class="blog-title-second">

                    <a href="/blog-post/${x._id}">
                    <h3>${x.blog_title}</h3>
                    </a>

                </div>

                <div class="blog-snippet-second">

                    
                    <p>${x.blog_snippet.substring(0,150)+ " ..."}</p>
                        

                </div>

            </div>

            </div>
                    



    







       



   
        
        `


    }).join("")


    }

    if(posts.length === 0){

        PostsDisplay.innerHTML = `
        
        <div class="no-blog" style="margin-top: 10px; text-align: center; width: 100%;">
        <p> This User hasn't Created Any Post</p>
        </div>
        
        
        `

    }

  
    console.log(data)

}catch(error){

    console.log(error)
}


}

getProfileInfo();