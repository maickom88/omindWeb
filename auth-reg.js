//Listen for Auth staus changes

auth.onAuthStateChanged(user => {
  if(user!= null){
      window.location.href="index.php";
  }
});

//SignUp 

const signUpForm = document.querySelector('#regForm');
signUpForm.addEventListener('submit',(e) => {
  //get form values
  e.preventDefault();
  const username = signUpForm['nusername'].value;
  const email = signUpForm['nemail'].value;
  const password = signUpForm['npassword'].value;
  auth.createUserWithEmailAndPassword(email,password).then(cred =>{
    window.location.href="index.php";
  }).catch(function(err) {
    setTimeout(function(){
      var errorMsg = err.message;
      document.querySelector('.alert').style.display = 'block';
      document.querySelector('.alert').innerHTML = errorMsg;
    },3000).then(()=>{
      document.querySelector('.alert').style.display = 'none';
      signUpForm.reset();
    });

  })
});

