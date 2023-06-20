// alert('working')
const totalUsers = document.getElementById('total-users');
const notificationSent = document.getElementById('notification-sent');
const blockedUsers = document.getElementById('blockedUsers');
const totalBlogs = document.getElementById('total-blogs');
const verifiedUsers = document.getElementById('verified-users');
const loggedUsers = document.getElementById('logged-users');
const verificationRequests = document.getElementById('verification-requests');


const analyticsHolder = document.getElementById('analytics-holder');




const getAnalytics = async ()=>{


    try{

            const response = await fetch('/api/superadmin/get_analytics', {
                method: "GET",
                headers:{
                    "Content-Type":"Application/Json"
                }
            })

            const data = await response.json()

            analyticsHolder.innerHTML = data.map(x=>{

                return `
                
                
        <div class="user-analytics">
            
        <div class="user-analytics-inner">

       

        <div class="user-analytic-top">
            <i class="fa-solid fa-users"></i>
        </div>

        <div class="user-analytics-section-title">
            <h3>Total Users</h3>
        </div>

        <div class="number">
            <p id="total-users">${x.totalUsers.length}</p>
        </div>

        </div>

    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-bell"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Notifications Sent</h3>
            </div>

            <div class="number">
                <p id="notification-sent">${x.notificationSent.length}</p>
            </div>

            </div>


    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Blocked Users</h3>
            </div>

            <div class="number">
                <p id="blockedUsers">${x.blockedUsers.length}</p>
            </div>

            </div>

    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-newspaper"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Total Blogs</h3>
            </div>

            <div class="number">
                <p id="total-blogs">${x.totalBlogs.length}</p>
            </div>

            </div>

    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-user-check"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Verified Users</h3>
            </div>

            <div class="number">
                <p id="verified-users">${x.verifiedUsers.length}</p>
            </div>

            </div>

    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-person-shelter"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Loged In Users</h3>
            </div>

            <div class="number">
                <p id="logged-users">${x.loggedInUsers.length}</p>
            </div>

            </div>

    </div>
    <div class="user-analytics">

        <div class="user-analytics-inner">

       

            <div class="user-analytic-top">
                <i class="fa-solid fa-file-import"></i>
            </div>

            <div class="user-analytics-section-title">
                <h3>Verification Requests</h3>
            </div>

            <div class="number">
                <p id="verification-requests">${x.verificationRequests.length}</p>
            </div>

            </div>

    </div>
                
                
                `



            }).join('')

            //totalUsers.innerHTML = data.totalUsers.length;
            //notificationSent.innerHTML = data.notificationSent.length;
           // blockedUsers.innerHTML = data.blockedUsers.length;
           // totalBlogs.innerHTML = data.totalBlogs.length;
            //verifiedUsers.innerHTML = data.verifiedUsers.length;
           // loggedUsers.innerHTML = data.loggedInUsers.length;
            // verificationRequests.innerHTML = data.verificationRequests.length;
            //console.log(data)


    }
    catch(error){

        //console.log(error)
    }

}

getAnalytics()