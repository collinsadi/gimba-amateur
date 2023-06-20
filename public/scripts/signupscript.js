    const switchtologin = document.querySelector("#switch-to-login");
    const switchtosignup = document.querySelector("#switch-to-signup");
    const signuppage = document.querySelector("#sign-up-form");
    const loginpage = document.getElementById("log-in-form");
    // Signup button
    const signUpBtn = document.querySelector("#signup-btn")
    const errormessage = document.getElementById('error-message');

    switchtologin.addEventListener("click", (e)=>{
        e.preventDefault();
        signuppage.style.display = "none"
        loginpage.style.display = "block"
    })

    switchtosignup.addEventListener("click", (e)=>{
        e.preventDefault();
        signuppage.style.display = "block"
        loginpage.style.display = "none"
    })

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const bioInfo = document.getElementById("bio_info");
    const userName = document.getElementById("username");
 

    // let users switch modes with short key

    window.addEventListener('keydown', (event)=>{

        if(event.altKey && event.key ==="l"){

            // alert('Working')

            signuppage.style.display = "none"
            loginpage.style.display = "block"
        }

         if(event.altKey && event.key ==="s"){

            // alert('Working')

            signuppage.style.display = "block"
            loginpage.style.display = "none"
        }

    })

// Fetch the api to create users
const CreateUsers = async () => {

    
    try {

        const response = await fetch('/api/create_user', {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json"
            },
            body: JSON.stringify({
               full_name: fullname.value.trim(),
               email: email.value.toLowerCase().trim(),
               password: password.value.trim(),
               bio: bioInfo.value.trim(),
               useridname: userName.value.toLowerCase().trim(),

            })
        })

        const data = await response.json()

        errormessage.innerHTML = data.message

        if(data.message === "Sign Up Sucessful"){
            errormessage.style.color = "green"
            errormessage.innerHTML = data.message
            location.reload()
        }
        
        
        console.log(data.message)
        
    } catch (error) {
        console.log(error)
    }

};


signUpBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    const sampleusername  = "oooooooooooooo"

   

    if(fullname.value === "" || password.value === "" || email.value === "" || bioInfo.value === "" || userName.value === ""){
        errormessage.innerHTML = "All Fields are Required"
        return;
    }

    if(fullname.value.length < 3) {
        errormessage.innerHTML = "Your Full Name is Required"
        return;
    }
    if(userName.value.length <= 3) {
        errormessage.innerHTML = "username too short"
        return;
    }
    if(userName.value.length > sampleusername.length) {
        errormessage.innerHTML = "username too long"
        return;
    }
    if(userName.value.trim().indexOf(' ') !== -1) {
        errormessage.innerHTML = "use Url Friendly Username (eg, collins-adi, collinsadi, collins)"
        return;
    }

    if(email.value.indexOf("@") === -1){
        errormessage.innerHTML = "Please Enter a Valid Email"
        return;
    }

    if(password.value.length <= 6){
        errormessage.innerHTML = "Password must be more than 6 Characters"
        return;
    }
 e.target.innerHTML = "Working..."

    setTimeout(() => {

        CreateUsers()
     
    .then(e.target.innerHTML = "Become an Author")
    }, 2000);

})



// Log Users In

const loginBtn = document.getElementById('login-btn');
const loginPassword = document.getElementById('loginpassword');
const loginemail = document.getElementById('loginemail');
const loginError = document.getElementById('login-error');



const getUsers = async ()=>{

    const response = await fetch('/api/get_user', {

        method: "POST",
        headers: {
            "Content-Type": "Application/Json"
        },
        body: JSON.stringify({

            email: loginemail.value.toLowerCase(),
            password: loginPassword.value


        })

    })

    const data = await response.json()
    console.log(data)
    console.log(data.redirectUrl)
    console.log(data.author)


    if(data.message === "Invalid Credentials" ){

        loginError.innerHTML = data.message
        return;
    }
    if(data.message === "Account is Temporary Disabled" ){

        const username = data.blockedUser

        localStorage.setItem('blockedUser', username)

        window.location.href ="/disabled"

        return;
        
        loginError.innerHTML = "@"+ username + " Your " + data.message
       
    }

    if(data.message === "Log In Sucessful"){
        const author =  data.author.full_name
        const authorId = data.author._id
        const receiver = data.author.useridname


        loginError.style.color = "green"
        loginError.innerHTML = data.message

        if(author){

             localStorage.setItem('fullName', author)
        }

        if(authorId){

            localStorage.setItem('id', authorId)
        }
        if(receiver){

            localStorage.setItem('receiver', receiver)
        }
       
        window.location.href = data.redirectUrl

    }

}


loginBtn.addEventListener('click', (e)=>{

    e.preventDefault();
    // alert('working bro')

    e.target.innerHTML = "Logging in..."

    setTimeout(() => {
 getUsers()
.then( e.target.innerHTML = "Login")
        
    }, 2000);

   

    



})


