const userId = localStorage.getItem('id')

// Function to detect whether the developer tools are open
function detectDevTools() {
    const devtools = /./;
    devtools.toString = function() {
      this.opened = true;
      return ' ';
    };
    console.log('%c', devtools);
  }
  
  // Check if the developer tools are open
  detectDevTools();
  
  // Function to display alert message
  function displayAlert() {
    alert('Action is not permitted on this part of the website.');
  }
  
  // Disable right-click context menu
  window.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    displayAlert();
  });
  
  // Disable keyboard shortcuts
  window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === 'U' || event.key === 'C' || event.key === 'Shift' || event.key === 'I')) {
      event.preventDefault();
      displayAlert();
    }
  });
  
  // Disable inspect element
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
      event.preventDefault();
      displayAlert();
    }
  });
  



const getUserStatus = async ()=>{

    try{

        const response = await fetch('/api/get_block_status',{
            method: "POST",
            headers: {
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({id: userId})
        })

        const data = await response.json()

        if(data.details === "Your Account Have Been Blocked"){

            localStorage.clear()
            window.location.href = '/join'
        }

        console.log(data)



    }catch(error){

        console.log(error)
    }

}

window.addEventListener('load', ()=>{

    getUserStatus()
})

setInterval(() => {
  //  getUserStatus();
}, 2000);