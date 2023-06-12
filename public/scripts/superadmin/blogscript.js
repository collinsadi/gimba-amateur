const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');





window.addEventListener('load', async ()=>{

    // const AuthorId = localStorage.getItem('id')

    //console.log(AuthorId)
    
    const blogContainer = document.getElementById('all-the-blogs-array');

const response = await fetch(`/api/superadmin/get_all_blogs`, {
    method: 'POST',
    headers: {
        'Content-Type': "Application/Json"
    }
})

const data = await response.json()
console.log(data)
const blogs = data.allBlogs




blogContainer.innerHTML = blogs.map((x) =>{

    const {_id} = x

    return `
    
    <div class="single-blog">

    <div class="single-blog-image">

        <img src=${x.blog_body_image_url} alt="">

    </div>
    <div class="single-blog-title">

        <a href="/blog-post/${_id}" style="text-decoration:none; color: black;">
        <h3>${x.blog_title}</h3>
        </a>
    </div>

    <div class="single-blog-snippet">

        <p>${x.blog_snippet}</p>
    </div>

    <div class="single-blog-controls">

        <div class="trash-button">


        <button data-blogid=${x._id}>
        <i class="fa-solid fa-trash"></i>
        Delete
        </button>

            
        </div>
        
       
        

    </div>


    

</div>
    
    
    
    `  

}).join('')


if(blogs.length === 0){

    return blogContainer.innerHTML = `
    
    <div class="empty-state">

        <h3> OOPS!, No Blog was Found </h3>
        <p> Seems Like your Users havent created any Article </p>


        </div>
    
    
    `
}


const deleteButtons = document.querySelectorAll('[data-blogid]');
deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        deleteItem(button);
    });
});


})




 async function deleteItem(button) {
    // id.target.disabled = true

    button.disabled = true
    const id = button.dataset.blogid
    //console.log('Working' + id)

    try {

        const response = await fetch('/api/superadmin/delete_blog/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': "Application/Json"
            }
        })

        const data = await response.json()
        console.log(data)

        if(data.details === "BlogPost Deleted"){
            errorMesage.style.display = 'block';
            errorMesage.style.borderLeft = '10px solid green';
            errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
            messageTitle.innerHTML = 'Success!';
            messageBody.innerHTML = data.details;
            location.reload()
        } else{

            alert('Error Deleting Blog')
        }

    } catch (error) {
        console.eror(error)
    }

}
