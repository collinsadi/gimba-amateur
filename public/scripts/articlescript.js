

// Fetch the Blog Posts

window.addEventListener('load', async ()=>{

    const AuthorId = localStorage.getItem('id')
    const blogContainer = document.getElementById('all-the-blogs-array');
const response = await fetch(`/api/get_user_articles`, {
    method: 'POST',
    headers: {
        'Content-Type': "Application/Json"
    },
    body: JSON.stringify({authorid: AuthorId})
})
const data = await response.json()
//console.log(data)
const blogs = data.blogpost
blogContainer.innerHTML = blogs.map((x) =>{

    const {_id} = x

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


            <button data-blogid = ${x._id} data-blogid=${x._id} onclick="trashBlog(this)">
                <i class="fa-solid fa-trash"></i>
                Trash
            </button>

            
        </div>
        
        <div class="read-more-button">

    <a href="/dashboard/edit-blog?id=${_id}">

            <button data-blogid = ${x._id}>
            <i class="fa-solid fa-pen-to-square"></i>
            Edit

            </button>

      </a>     
        </div>
        

    </div>


</div>
    
    
    
    `  

}).join('')


if(blogs.length === 0){

    return blogContainer.innerHTML = `
    
    <div class="empty-state">

        <h3> OOPS!, No Article was Found </h3>
        <p> Seems Like you havent created any Article </p>


        </div>
    
    
    `
}


})


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




const trashButton = document.querySelectorAll('#trash-can')

const trashBlog = async (button)=>{
    // id.target.disabled = true

    button.disabled = true
    const id = button.dataset.blogid
    ////console.log('Working' + id)

    try {

        const response = await fetch('/api/trash_blog_post/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': "Application/Json"
            }
        })

        const data = await response.json()
        //console.log(data)

        if(data.details === "Blog Moved to Trash"){
            errorMesage.style.display = 'block';
            errorMesage.style.borderLeft = '10px solid green';
            errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
            messageTitle.innerHTML = 'Success!';
            messageBody.innerHTML = data.details;
            location.reload()
        } else{

            alert('Error Trashing Blog')
        }

    } catch (error) {
        //console.eror(error)
    }

}

// trashButton.forEach(button => {

//     button.addEventListener('click', ()=>{

//         //console.log('Clicked')
//     })

// })