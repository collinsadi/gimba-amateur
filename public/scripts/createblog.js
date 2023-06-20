



  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }
  });








const createButton = document.getElementById('create-blog-btn');
const draftButton = document.getElementById('draft-blog-btn');
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
let isinvalid = false;



const craeteBlog = async()=>{

  var htmlContent = quill.root.innerHTML;

  var content = quill.getContents(); // Get the Delta content
    console.log(content);
    
    var text = quill.root.innerHTML; // Get the plain text content
    console.log(text);



  const response = await fetch('/api/create_blog',{

    method: 'POST', 
    headers: {

      'Content-Type': 'Application/Json'
    },
    body: JSON.stringify({

      blog_title: blogTitle.value,
      blog_snippet: blogSnippet.value,
      blog_category: category.value,
      blog_related_category: relatedCategory.value,
      blog_body: text,
      blog_body_image_url: blogImageUrl,
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
      location.reload()
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

    if (blogImageUrl.length < 5) {
      errorMesage.classList.add('show-error');
      messageBody.innerHTML = "Enter a Valid Image URL";
      isImageUrlValid = false;
      setTimeout(() => {
        errorMesage.classList.remove('show-error')
      }, 4000);
    }


  // var bloglength = quill.getLength();

    // if (blogBody.value.length < 60) {
    //   errorMesage.classList.add('show-error');
    //   messageBody.innerHTML = "Invalid Blog Content";
    //   isinvalid = true;
    //   setTimeout(() => {
    //     errorMesage.classList.remove('show-error')
    //   }, 4000);
      
    // }




    
   


    if (!isinvalid && isImageUrlValid) {
      craeteBlog();
    } else{

      errorMesage.classList.add('show-error')
    }

    e.target.innerHTML = "CREATE BLOG";
  }, 1000);
});

const createDraft = async()=>{

  var text = quill.root.innerHTML; // Get the plain text content
    console.log(text);


  
  const response = await fetch('/api/create_draft',{

    method: 'POST', 
    headers: {

      'Content-Type': 'Application/Json'
    },
    body: JSON.stringify({

      blog_title: blogTitle.value,
      blog_snippet: blogSnippet.value,
      blog_category: category.value,
      blog_related_category: relatedCategory.value,
      blog_body: text,
      blog_body_image_url: blogImageUrl,
      authorId: localStorage.getItem('id')

    })


    
  })
  .then(response => {
    if (response.ok) {
      errorMesage.style.display = 'block';
      errorMesage.style.borderLeft = '10px solid green';
      errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
      messageTitle.innerHTML = 'Success!';
      messageBody.innerHTML = 'Creating Draft';
      location.reload();
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


draftButton.addEventListener('click', (e)=>{

  e.preventDefault();
  e.target.innerHTML = "Creating...";
  console.log(document.querySelector('#editor').innerHTML)

  setTimeout(() => {
    let isinvalid = false;
    let isImageUrlValid = true;

    if (blogTitle.value.length > 64 || blogTitle.value.length < 2) {
      errorMesage.classList.add('show-error');
      messageBody.innerHTML = blogTitle.value.length > 64 ? "Blog Title too long" : "Drafts Should have Title";
      isinvalid = true;
      setTimeout(() => {
        errorMesage.classList.remove('show-error')
      }, 4000);
    }

   




  // var bloglength = quill.getLength();

    // if (blogBody.value.length < 10) {
    //   errorMesage.classList.add('show-error');
    //   messageBody.innerHTML = "Drafts Should have a brief body";
    //   isinvalid = true;
    //   setTimeout(() => {
    //     errorMesage.classList.remove('show-error')
    //   }, 4000);
      
    // }




    
   


    if (!isinvalid && isImageUrlValid) {
      createDraft();
    } else{

      errorMesage.classList.add('show-error')
    }

    e.target.innerHTML = "Save to Draft";
  }, 1000);
})





  