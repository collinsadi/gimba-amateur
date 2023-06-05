// alert('Conected ')


const editButton = document.getElementById('edit-draft-btn');
const createButton = document.getElementById('publish-draft-btn');
const  blogTitle = document.getElementById('blog_title');
const blogSnippet = document.getElementById('blog_snippet');
const category = document.getElementById('blog_category');
const relatedCategory = document.getElementById('blog_related_category');
const imageUrl = document.getElementById('blog_image_url');
const blogBody = document.getElementById('blog_body');


const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');


// blogTitle.value = "Hello"

const urlparams = new URLSearchParams(location.search)
const id = urlparams.get('id')

console.log(id)

const getOldData = async ()=>{

try {
    const response = await fetch('/dashboard/edit-draft/'+id, {
        method: 'POST', 
        headers:{
            'Content-Type': "Application/Json"
        },
    })

    const data = await response.json()
    const oldDetails = data.draft

    if(oldDetails.author !== localStorage.getItem('id')){

        return alert('This Is not Your Blog')
    }

    blogBody.value = oldDetails.blog_body
    blogSnippet.value = oldDetails.blog_snippet
    blogTitle.value = oldDetails.blog_title
    category.value = oldDetails.blog_category
    relatedCategory.value = oldDetails.blog_related_category
    imageUrl.value = oldDetails.blog_body_image_url






    console.log(oldDetails)
} catch (error) {
    console.log(error)
    
}

 

}


getOldData(); 
   

const editDraft = async ()=>{

    try {

    const response = await fetch('/dashboard/edit-draft/'+id, {
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
      blog_body_image_url: imageUrl.value,

        })
    })

    const data = await response.json()
    console.log(data)

    if(data.details === "Draft Item Updated"){

        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = data.details;
        window.location.href = "/dashboard/drafts"
    }

    } catch (error) {
        
        console.log(error)
    }

   
}



const craeteBlog = async()=>{

    const response = await fetch('/dashboard/publish-draft/'+id,{
  
      method: 'POST', 
      headers: {
  
        'Content-Type': 'Application/Json'
      },
      body: JSON.stringify({
  
        blog_title: blogTitle.value,
        blog_snippet: blogSnippet.value,
        blog_category: category.value,
        blog_related_category: relatedCategory.value,
        blog_body: blogBody.value,
        blog_body_image_url: imageUrl.value,
        authorId: localStorage.getItem('id')
  
      })
  
  
      
    })
    .then(response => {
      if (response.ok) {
        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = 'Creating Blog';
        window.location.href = '/dashboard/drafts'
      } else {
        throw new Error('Error Creating Blog');
      }
    })
    .catch(error => {
      errorMesage.style.display = 'block';
      messageTitle.innerHTML = 'Error!';
      messageBody.innerHTML = error.message;
      return;
    });
  
  
  }
  
  
  
  
  createButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.innerHTML = "Creating...";
    console.log(document.querySelector('#editor').innerHTML)
  
    setTimeout(() => {
      let isinvalid = false;
      let isImageUrlValid = true;
  
      if (blogTitle.value.length > 64 || blogTitle.value.length < 2) {
        errorMesage.classList.add('show-error');
        messageBody.innerHTML = blogTitle.value.length > 64 ? "Blog Title too long" : "Invalid Blog Title";
        isinvalid = true;
        setTimeout(() => {
          errorMesage.classList.remove('show-error')
        }, 4000);
      }
  
      if (blogSnippet.value.length < 2) {
        errorMesage.classList.add('show-error');
        messageBody.innerHTML = "Invalid Blog Snippet";
        isinvalid = true;
        setTimeout(() => {
          errorMesage.classList.remove('show-error')
        }, 4000);
      }
  
      if (category.value.length < 2) {
        errorMesage.classList.add('show-error');
        messageBody.innerHTML = "Invalid Blog Category";
        isinvalid = true;
        setTimeout(() => {
          errorMesage.classList.remove('show-error')
        }, 4000);
      }
  
      if (imageUrl.value.length < 5) {
        errorMesage.classList.add('show-error');
        messageBody.innerHTML = "Enter a Valid Image URL";
        isImageUrlValid = false;
        setTimeout(() => {
          errorMesage.classList.remove('show-error')
        }, 4000);
      }
  
  
    // var bloglength = quill.getLength();
  
      if (blogBody.value.length < 60) {
        errorMesage.classList.add('show-error');
        messageBody.innerHTML = "Invalid Blog Content";
        isinvalid = true;
        setTimeout(() => {
          errorMesage.classList.remove('show-error')
        }, 4000);
        
      }
  
  
  
  
      
     
  
  
      if (!isinvalid && isImageUrlValid) {
        craeteBlog();
      } else{
  
        errorMesage.classList.add('show-error')
      }
  
      e.target.innerHTML = "CREATE BLOG";
    }, 1000);
  });

editButton.addEventListener('click', (e)=>{

e.preventDefault();
e.disabled = true
e.target.innerHTML = "Editing"

setTimeout(() => {

    editDraft()

  .then(e.target.innerHTML = "Edit Draft")  
// .then(window.location.href = "/dashboard/drafts")
}, 1000);

})
