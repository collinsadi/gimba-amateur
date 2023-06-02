// alert('Article Script')


// const searchInput = document.getElementById('searchblogs');

// const SearchItems = document.querySelectorAll('single-blog');

// SearchItems.forEach( searched => {

//     searched.addEventListener('click', alert('Hello'))

// })

  
  



const searchInput = document.getElementById('searchblogs');
const searchItems = document.querySelectorAll('.single-blog');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();

  searchItems.forEach((searched) => {
    if (searched.textContent.toLowerCase().includes(searchTerm) ) {
      searched.style.display = 'inline-block';
    } else {
      searched.style.display = 'none';
    }
  });
});


// Fetch the Blog Posts

window.addEventListener('load', async ()=>{

    const AuthorId = localStorage.getItem('id')

    //console.log(AuthorId)
    
    const blogContainer = document.getElementById('all-the-blogs-array');

const response = await fetch(`/dashboard/articles`, {
    method: 'POST',
    headers: {
        'Content-Type': "Application/Json"
    },
    body: JSON.stringify({authorid: AuthorId})
})

const data = await response.json()
console.log(data)
const blogs = data.blogpost

blogContainer.innerHTML = blogs.map((x) =>{

    return `
    
    <div class="single-blog">

    <div class="single-blog-image">

        <img src=${x.blog_body_image_url} alt="">

    </div>
    <div class="single-blog-title">

        <h3>${x.blog_title}</h3>

    </div>

    <div class="single-blog-snippet">

        <p>${x.blog_snippet}</p>
    </div>

    <div class="single-blog-controls">

        <div class="trash-button">

            <button data-blogid = ${x._id}>
                <i class="fa-solid fa-trash"></i>
                Trash
            </button>

            
        </div>
        
        <div class="read-more-button">

            <button data-blogid = ${x._id}>
            <i class="fa-solid fa-pen-to-square"></i>
            Edit

            </button>

           
        </div>
        

    </div>


</div>
    
    
    
    `  

}).join('')

})
