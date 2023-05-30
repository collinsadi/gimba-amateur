
// var options = {
//   placeholder: 'Blog Body Goes Here',
//   readOnly: false,
//   theme: 'snow'
// };


// var quill = new Quill('#editor', options);

// var htmlContent = quill.root.innerHTML;
// console.log(htmlContent);


ClassicEditor
.create(document.querySelector('#editor'))
.then(editor => {
  console.log('Editor initialized', editor);
})
.catch(error => {
  console.error('Error initializing editor', error);
});

console.log(document.querySelector('#editor').innerHTML)

// quill.on('text-change', function(delta, oldDelta, source) {
//     console.log('Content changed:', quill.root.innerHTML);
//   });





const createButton = document.getElementById('create-blog-btn');
const  blogTitle = document.getElementById('blog_title');
const blogSnippet = document.getElementById('blog_snippet');
const category = document.getElementById('blog_category');
const relatedCategory = document.getElementById('blog_related_category');
const imageUrl = document.getElementById('blog_image_url');


const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');
let isinvalid = false;



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
  .then(response => {
    if (response.ok) {
      errorMesage.style.display = 'block';
      errorMesage.style.borderLeft = '10px solid green';
      errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
      messageTitle.innerHTML = 'Success!';
      messageBody.innerHTML = 'Creating Blog';
      window.location.href = '/';
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
      messageBody.innerHTML = "Enter a Valid Data URL";
      isImageUrlValid = false;
      setTimeout(() => {
        errorMesage.classList.remove('show-error')
      }, 4000);
    }


  var bloglength = quill.getLength();

    if (bloglength < 60) {
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










  