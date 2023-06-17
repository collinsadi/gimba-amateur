
const username = localStorage.getItem('receiver')
const userid = localStorage.getItem('id')

console.log(userid)

const notificationsContainer = document.getElementById('all-notifications-array')

const getNotifications = async ()=>{

    try{

        const response = await fetch('/api/get_user_notification/'+username,{
            method: "POST",
            headers:{
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({id: userid})
        })

        const data = await response.json()
        const notifications = data.notifications

        console.log(data)

        notificationsContainer.innerHTML = notifications.map(x=>{

            const date = new Date(x.createdAt)

            return `
            
            <div class="single-notification ${x.status !== "seen" ? "unseen" : "seen"}">

            <div class="notification-title">
              <a href="/view-notification/?id=${x._id}">  <p>${x.notification_title}</p> </a>
            </div>
            <div class="sent-date">
                <p>${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>

        </div>
            
            `
        }).join('')


        console.log(data)

    }
    catch(error){

        console.log(error)
    }

}

getNotifications()