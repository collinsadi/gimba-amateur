// alert('Conected ')


const editButton = document.getElementById('edit-blog-btn');
const  blogTitle = document.getElementById('blog_title');
const blogSnippet = document.getElementById('blog_snippet');
const category = document.getElementById('blog_category');
const relatedCategory = document.getElementById('blog_related_category');
const imageUrl = document.getElementById('blog_image_url');
const blogBody = document.getElementById('blog_body');


let blogImageUrl = ""

const blogImage = document.getElementById('blog_image')


let fr = new FileReader();


blogImage.addEventListener("change", ()=>{

    fr.readAsDataURL(blogImage.files[0])

    
    fr.addEventListener("load", ()=>{


        blogImageUrl = fr.result;

       console.log(blogImageUrl)


        
           // selectedimage.src = imageurl;
    })

})



const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');


// blogTitle.value = "Hello"

const urlparams = new URLSearchParams(location.search)
const id = urlparams.get('id')

console.log(id)

const getOldData = async ()=>{

try {
    const response = await fetch('/api/get_old_blog_data/'+id, {
        method: 'POST', 
        headers:{
            'Content-Type': "Application/Json"
        },
    })

    const data = await response.json()
    const oldDetails = data.oldDetails

    if(oldDetails.author !== localStorage.getItem('id')){

        return alert('This Is not Your Blog')
    }

    blogBody.value = oldDetails.blog_body
    blogSnippet.value = oldDetails.blog_snippet
    blogTitle.value = oldDetails.blog_title
    category.value = oldDetails.blog_category
    relatedCategory.value = oldDetails.blog_related_category
    blogImageUrl = oldDetails.blog_body_image_url






    console.log(oldDetails)
} catch (error) {
    console.log(error)
    
}

 

}


getOldData(); 
   

const editBlog = async ()=>{

    try {

    const response = await fetch('/api/edit_blog_post/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': "Application/Json"
        },
        body: JSON.stringify({

      blog_title: blogTitle.value,
      blog_snippet: blogSnippet.value,
      blog_category: category.value,
      blog_related_category: relatedCategory.value,
      blog_body: blogBody.value,
      blog_body_image_url: blogImageUrl,

        })
    })

    const data = await response.json()
    console.log(data)

    if(data.details === "Blog Updated Sucessfully"){

        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = data.details;
    }

    } catch (error) {
        
    }

   
}

editButton.addEventListener('click', (e)=>{

e.preventDefault();
e.disabled = true
e.target.innerHTML = "Editing"

setTimeout(() => {

    editBlog()

  .then(e.target.innerHTML = "Edit Blog")  
.then(window.location.href = "/dashboard/articles")
}, 1000);

})
