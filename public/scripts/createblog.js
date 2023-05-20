//alert('hello')

//const { json } = require("express");


var quill = new Quill('#editor', {
  theme: 'snow' // 'snow' is one of the available themes
});

var htmlContent = quill.root.innerHTML;
console.log(htmlContent);


quill.on('text-change', function(delta, oldDelta, source) {
    console.log('Content changed:', quill.root.innerHTML);
  });





const createButton = document.getElementById('create-blog-btn');
const  blogTitle = document.getElementById('blog_title');
const blogSnippet = document.getElementById('blog_snippet');
const category = document.getElementById('blog_category');
const relatedCategory = document.getElementById('blog_related_category');
const imageUrl = document.getElementById('blog_image_url');


createButton.addEventListener('click', async(e)=>{

  e.preventDefault();

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


})








  