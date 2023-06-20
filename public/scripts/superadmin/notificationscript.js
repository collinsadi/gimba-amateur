const droptoggle = document.querySelectorAll("#drop-toggle")
const id = localStorage.getItem('id')

const requestVerificationBtn = document.getElementById('request-verification');


droptoggle.forEach(button =>{

    button.addEventListener("click", ()=>{

        const panel = button.nextElementSibling;

       
        if(panel.classList.contains('removepanel')){
        panel.classList.remove('removepanel')
        panel.classList.add('showpanel')
    } else if(panel.classList.contains('showpanel')){
        panel.classList.remove('showpanel')
        panel.classList.add('removepanel')
    } else{
        panel.style.display = 'none'
    }

    })

})


const getSentNotifications = async ()=>{

    const notificationArray = document.getElementById('notification-array')

    try{

        const response = await fetch('/api/superadmin/get_notifications', {
            method: "POST",
            headers: {
                "Content-Type":"Application/Json"
            }
        })

        const data = await response.json()
        const notifications = data.notifications

        notificationArray.innerHTML = notifications.map(x=>{

            const date = new Date(x.createdAt)

            return `
            
            <div class="single-notification">

            <div class="notification-title">
                <p>${x.notification_title.lenght > 40 ? x.notification_title.substring(0,40) +"..." :  x.notification_title}</p>
            </div>
            <div class="notification-receiver">
                <p>${x.receiver}</p>
            </div>
            <div class="notification-createdat">
                <p>${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div class="notification-status">
               ${x.status === "seen" ? `<p class="seen-status">Seen</p>` :
                ` <p class="active-status" id="notification-status">Delivered</p>`} 
                <!--  -->
            </div>


        </div>
            
            `
        }).join('')

        //console.log(data)

    } catch(error) {

        //console.log(error)
    }


}


getSentNotifications()






const notificationTitle = document.querySelector("#notification_title")
const receiver = document.getElementById("receiver")
const messageBody = document.getElementById("message-body")
const sendBtn = document.querySelector('#send-notification')
const errorTracker = document.querySelector("#error-tracker")

const sendNotification = async ()=>{

    try{

            const response = await fetch('/api/superadmin/send_notification', {
                method: "POST",
                headers: {
                    "Content-Type":"Application/Json"
                },
                body: JSON.stringify({
                    notification_title: notificationTitle.value.trim(),
                    receiver: receiver.value.toLowerCase().trim(),
                    notification_body: messageBody.value.trim()
                })
            })

            const data = await response.json()
            

            if(data.details === "Notification Sent Sucessfully"){
                    errorTracker.innerHTML = data.details
                    errorTracker.style.color ="green"
                    location.reload()
                    return;
                }
                
            errorTracker.innerHTML = data.details
            errorTracker.style.color ="red"
            
            //console.log(data)
    }
    catch(error){
        //console.log(error)
    }
}

sendBtn.addEventListener("click", (e)=>{

    e.disabled = true
    e.target.innerHTML = "Sending..."

    setTimeout(() => {
        sendNotification()
        .then(e.target.innerHTML = "Send")
    }, 1000);

    
})


// Fetch all Sent Notifications

