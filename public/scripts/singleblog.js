//console.log('Connected')

const blogId = location.href.split('/').pop()
let blogbody = "";
let blogTitle = "";
let blogSnippet = ""
let blogImage = ""


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

        if (data.details){

            blogbody =data.details

        } else{

            blogbody = data.blog.blog_body
            blogTitle = data.blog.blog_title
            blogSnippet = data.blog.blog_snippet
            blogImage = data.blog.blog_body_image_url
        }

       
   
       

        
        // Was receiving too many error so i did som shitty ci=oding herer
        // if my response is not sentding a detail object the function inside the if statement would run
        // and i am not sending a details object because iam sending the blog details which was necessary

        if(!data.details){

         if(data.blog.createdAt !== data.blog.updatedAt){

            const date = new Date(data.blog.updatedAt)

            lastUpdate.innerHTML = `Last Edited on  ${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' , hour: '2-digit', minute: "2-digit", second: "2-digit"})}`

            // blogTitle.innerHTML += " [EDITED]"
        }
        }

        


        authorContainer.innerHTML = `
        
        <div class="name-badge-single">
        <p>Written By <span><a href="/u/${author.useridname}">${author.useridname}</a></span></p>

        ${author.verified === 'verified' ? `<i class="fa-solid fa-circle-check" title="Verified Author"></i>` : ''}

        
    </div>
        
        
        `

        if(blogbody){

     theBlogBody.innerHTML = `
        
        ${blogbody}
        
        
        
        `

        } 

      
        //console.log(author)



    } catch(error){

        console.log(error)
    }


}

getAuthor()










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

const reportDetails = document.querySelector("#reportDetails")

const reportstatus = document.getElementById('reportError')

const sendReport = document.querySelector("#send-report")

const mainShare = document.getElementById("share-outside");

sharePost.addEventListener('click', ()=>{

    navigator.clipboard.writeText(window.location.href)
    sharePost.innerHTML = `
    
        <p>Post Url Copied</p>
        <i class="fa-solid fa-clipboard-check"></i>
    
    `

})

reportPost.addEventListener('click', async ()=>{

    reportBox.style.display = "flex"


})


mainShare.addEventListener("click", ()=>{

    if(navigator.share){

    navigator.share({
        files: [
            {
            data: blogImage,
            type: blogImage.includes('data:image/png') ? 'img/png' : "img/jpeg",
        }

        ],
        title: blogTitle,
        text: blogSnippet,
        url: window.location.href
    })

    .then(()=>{
        console.log("shared sucessfully")
    })
    .catch(()=>{
        console.log("an Error Occured")
    })


    }

   
})


sendReport.addEventListener('click', async (e)=>{



//  const blogid = window.location.href.split('/').pop()


if(reportDetails.value.length < 30){

  reportstatus.innerHTML = "Please add a More Detailed Report"

  return;

}
e.target.innerHTML = "Sending"
e.target.disabled = true

try{

    const response = await fetch('/api/report_post/'+blogId, {
        method: "POST",
        headers:{
            "Content-Type":"Application/Json"
        },
        body: JSON.stringify({
            issue: issues.value,
            details: reportDetails.value
        })
    })

    const data = await response.json()

    if(response.ok){
        reportstatus.innerHTML = data.details
        reportstatus.style.color = "green"
    }



} catch(error){

    alert(error)
}


// alert(blogid)



})

// issues.addEventListener('change', ()=>{
//     console.log(issues.value)
// })


