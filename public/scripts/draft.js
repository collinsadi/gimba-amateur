//alert('Connected')

const DraftContainer = document.getElementById('all-the-draft-array')

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

                    <button id=${x._id}>
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                    
                </div>
                
                <div class="read-more-button">

                    <button id=${x._id}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit

                    </button>

                   
                </div>
                

            </div>


        </div>
            
            
            
            `

        })


    } catch(error){

        console.log(error)
    }


}






getDrafts();