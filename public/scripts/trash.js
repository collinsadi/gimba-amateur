// alert('Connected')

const TrashArray = document.getElementById('all-the-trash-array')



const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');



window.addEventListener('load', async ()=>{

        try {
            
            const response = await fetch('/dashboard/trash', {
                method: 'POST',
                headers:{
                    'Content-Type': "Application/Json"
                },
                body: JSON.stringify({author: localStorage.getItem('id')})
            })

            const data = await response.json()
            const TrashedItems = data.TrashItems


            TrashArray.innerHTML = TrashedItems.map(x=>{

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
    
                        <button id=${x._id} onclick="permanentlyDeleteBlog(this.id)">
                            <i class="fa-solid fa-trash"></i>
                           Delete
                        </button>
    
                        
                    </div>
                    
                    <div class="read-more-button">
    
                        <button id=${x._id} onclick="restoreBlog(this.id)">
                        <i class="fa-solid fa-pen-to-square"></i>
                        Restore
    
                        </button>
    
                       
                    </div>
                    
    
                </div>
    
    
            </div>
                
                
                `



            }).join('')



            
if(TrashedItems.length === 0){

    return TrashArray.innerHTML = `
    
    <div class="empty-state">

        <h3> OOPS!, Trash Is Empty</h3>


        </div>
    
    
    `
}


            console.log(TrashedItems)

        } catch (error) {

            console.log(error)
            
        }
})



const permanentlyDeleteBlog = async (id)=>{

    const response = await fetch('/dashboard/trash/'+id, {
        method: 'DELETE',
        headers:{
            'Content-Type':'Application/Json'
        },
        body: JSON.stringify({action : 'delete'})
    })

    const data = await response.json()

    if(data.details === "Trash Item Deleted"){
        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = data.details;
        location.reload()
    }else{

        alert('Error Deleting Blog')
    }

    console.log(data)


}

const restoreBlog = async (id)=>{

    const response = await fetch('/dashboard/trash/'+id, {
        method: 'DELETE',
        headers:{
            'Content-Type':'Application/Json'
        },
        body: JSON.stringify({action : 'restore'})
    })

    const data = await response.json()

    if(data.details === "Blog Post Restored"){
        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = data.details;
        location.reload()
    }else{

        alert('Error Restoring Blog')
    }

    console.log(data)

}
