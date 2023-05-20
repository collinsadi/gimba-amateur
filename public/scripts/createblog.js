//alert('hello')

//const { json } = require("express");

var options = {
  placeholder: 'Blog Body Goes Here',
  readOnly: false,
  theme: 'snow'
};


var quill = new Quill('#editor', options);

var htmlContent = quill.root.innerHTML;
console.log(htmlContent);


// quill.on('text-change', function(delta, oldDelta, source) {
//     console.log('Content changed:', quill.root.innerHTML);
//   });





const createButton = document.getElementById('create-blog-btn');
const  blogTitle = document.getElementById('blog_title');
const blogSnippet = document.getElementById('blog_snippet');
const category = document.getElementById('blog_category');
const relatedCategory = document.getElementById('blog_related_category');
const imageUrl = document.getElementById('blog_image_url');







const craeteBlog = async()=>{

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
      blog_body: quill.root.innerHTML,
      blog_body_image_url: imageUrl.value,

    })


    
  })




if(response.ok){

console.log("Blog Created Sucessfully")

}


}


const errorMesage = document.getElementById('error-message');

const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');
let isinvalid = false;

createButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.innerHTML = "Creating...";

  setTimeout(() => {
    let isinvalid = false;
    let isImageUrlValid = true;

    if (blogTitle.value.length > 64 || blogTitle.value.length < 2) {
      errorMesage.style.display = "block";
      messageBody.innerHTML = blogTitle.value.length > 64 ? "Blog Title too long" : "Invalid Blog Title";
      isinvalid = true;
    }

    if (blogSnippet.value.length < 2) {
      errorMesage.style.display = "block";
      messageBody.innerHTML = "Invalid Blog Snippet";
      isinvalid = true;
    }

    if (category.value.length < 2) {
      errorMesage.style.display = "block";
      messageBody.innerHTML = "Invalid Blog Category";
      isinvalid = true;
    }

    if (imageUrl.value.length < 3000) {
      errorMesage.style.display = "block";
      messageBody.innerHTML = "Enter a Valid Data URL";
      isImageUrlValid = false;
    } else {
      errorMesage.style.display = "none";
    }



  var bloglength = quill.getLength();

    if (bloglength < 60) {
      errorMesage.style.display = "block";
      messageBody.innerHTML = "Invalid Blog Content";
      isinvalid = true;
    }




    
   


    if (!isinvalid && isImageUrlValid) {
      createBlog();
      window.location.href = '/';
    } else{

      errorMesage.style.display ="block"
    }

    e.target.innerHTML = "CREATE BLOG";
  }, 1000);
});










  