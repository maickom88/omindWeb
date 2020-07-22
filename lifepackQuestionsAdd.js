//Listen for Auth staus changes
auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in: ',user);

    }else{
        console.log('User logged out ');
        window.location.href="auth_login.php";
    }
});


//Logout
const logoutbtn = document.querySelector('#logout');

logoutbtn.addEventListener('click',(e)=>{
  e.preventDefault();
    auth.signOut();

});


let next = document.querySelector('#lifepack-btn');
next.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "lifepackquestionAdd1.php";
});
//Dynamically Generate Question Components
const ul = document.querySelector('#lifepackQuestionForm1');
//function to create a dopdown 
