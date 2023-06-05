//alert('Connected')

const DraftContainer = document.getElementById('all-the-draft-array')


const errorMesage = document.getElementById('error-message');


const messageTitle = document.getElementById('msg-title');

const messageBody = document.getElementById('msg-body');




const getDrafts = async ()=>{


    try{


        const response = await fetch('/dashboard/drafts', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/Json'
            }, 
            body: JSON.stringify({author: localStorage.getItem('id')})

        })

        const data = await response.json()
        console.log(data)
        const gottenDrafts = data.drafts

        DraftContainer.innerHTML = gottenDrafts.map(x=>{

            return `
            
            
            <div class="single-blog">

            <div class="single-blog-image">

                <img src=${x.blog_body_image_url} alt="Blog Image">

            </div>
            <div class="single-blog-title">

                <h3>${x.blog_title}</h3>

            </div>

            <div class="single-blog-snippet">

                <p>${x.blog_snippet}</p>
            </div>

            <div class="single-blog-controls">

                <div class="trash-button">

                   
                    <button data-blogid=${x._id} onclick="deleteDraft(this)">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                   
                    
                </div>
                
                <div class="read-more-button">

                <a href="/dashboard/edit-draft?id=${x._id}">
                    <button id=${x._id}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit

                    </button>
                    </a>
                   
                </div>
                

            </div>


        </div>
            
            
            
            `

        })



                   
if(gottenDrafts.length === 0){

    return DraftContainer.innerHTML = `
    
    <div class="empty-state">

        <h3> OOPS!, Draft Is Empty</h3>


        </div>
    
    
    `
}


    } catch(error){

        console.log(error)
    }


}


getDrafts();


const deleteDraft = async (button) =>{
    button.disabled = true
    const id = button.dataset.blogid

    const response = await fetch('/dashboard/drafts/'+id, {
        method: "DELETE",
        headers:{
            'Content-Type': 'Application/Json'
        }
    })

    const data = await response.json()

    console.log(data)

    if(data.details === 'Item Deleted From Draft'){
        errorMesage.style.display = 'block';
        errorMesage.style.borderLeft = '10px solid green';
        errorMesage.style.backgroundColor = 'rgba(41, 224, 41, 0.397)';
        messageTitle.innerHTML = 'Success!';
        messageBody.innerHTML = data.details;
        location.reload()

    } else{

        alert('Error Deleting Draft Item')
    }


}
