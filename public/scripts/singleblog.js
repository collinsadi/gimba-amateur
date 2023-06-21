//console.log('Connected')

const blogId = location.href.split('/').pop()

//console.log(blogId)

const authorContainer = document.getElementById('the-author')

const theBlogBody = document.getElementById('the-blog-body')
const lastUpdate= document.getElementById('last-edited')

const ptag = document.querySelectorAll('p')
const imagetag = document.querySelectorAll('img')

const sharePost = document.querySelector("#share-post");
const reportPost = document.querySelector("#report-post");

const reportBox = document.querySelector("#report-box")

const issues = document.querySelector("#reasonforreport")

sharePost.addEventListener('click', ()=>{

    navigator.clipboard.writeText(window.location.href)
    sharePost.innerHTML = `
    
        <p>Post Url Copied</p>
        <i class="fa-solid fa-clipboard-check"></i>
    
    `

})

reportPost.addEventListener('click', ()=>{

    reportBox.style.display = "flex"

    console.error("There is a Problem with this post")

})


issues.addEventListener('change', ()=>{
    console.log(issues.value)
})


const getAuthor = async ()=>{

    try{

        const response = await fetch('/api/get_post/'+blogId, {
            method: "GET",
            headers: {
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()

        const author = data.blogAuthor
        const blogbody =data.blog.blog_body

        if(data.blog.createdAt !== data.blog.updatedAt){

            const date = new Date(data.blog.updatedAt)

            lastUpdate.innerHTML = `Last Edited on  ${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' , hour: '2-digit', minute: "2-digit", second: "2-digit"})}`

            // blogTitle.innerHTML += " [EDITED]"
        }


        authorContainer.innerHTML = `
        
        <div class="name-badge-single">
        <p>Written By <span><a href="/u/${author.useridname}">${author.useridname}</a></span></p>

        ${author.verified === 'verified' ? `<i class="fa-solid fa-circle-check" title="Verified Author"></i>` : ''}

        
    </div>
        
        
        `

        theBlogBody.innerHTML = `
        
        
        
        ${blogbody}
        
        
        
        `

        //console.log(author)



    } catch(error){

        //console.log(error)
    }


}

getAuthor()