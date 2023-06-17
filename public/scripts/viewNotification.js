
const urlparams = new URLSearchParams(location.search) 
const notifiId = urlparams.get('id')
const receiverId = localStorage.getItem('id')


const notificationTitle = document.getElementById('message_title');

const notificationBody = document.getElementById('message_body')

console.log(notifiId)

const getNotification = async ()=>{

    try{

    const response = await fetch('/api/view_user_notification', {
        method: 'POST',
        headers: {
            "Content-Type":"Application/Json"
        },
        body: JSON.stringify({
            notificationid: notifiId,
            receiverid: receiverId
        })
    })


    const data = await response.json()
    const notification = data.notification

    console.log(data)

    notificationTitle.innerHTML = notification.notification_title
    notificationBody.innerHTML = notification.notification_body

    }
    catch(error){

        console.log(error)
    }

}

getNotification();