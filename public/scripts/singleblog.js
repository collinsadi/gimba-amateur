console.log('Connected')

const blogId = location.href.split('/').pop()

console.log(blogId)

const authorContainer = document.getElementById('the-author')

const theBlogBody = document.getElementById('the-blog-body')




const getAuthor = async ()=>{

    try{

        const response = await fetch('/api/get_post_author/'+blogId, {
            method: "GET",
            headers: {
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()

        const author = data.blogAuthor
        const blogbody =data.blog.blog_body
        authorContainer.innerHTML = `
        
        <div class="name-badge-single">
        <p>Written By <span><a href="/u/${author.useridname}">${author.useridname}</a></span></p>

        ${author.verified === 'verified' ? `<i class="fa-solid fa-circle-check" title="Verified Author"></i>` : ''}

        
    </div>
        
        
        `

        theBlogBody.innerHTML = `
        
        
        
        ${blogbody}
        
        
        
        `

        console.log(author)



    } catch(error){

        console.log(error)
    }


}

getAuthor()