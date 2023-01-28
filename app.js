var name1=document.getElementById("name")
var email=document.getElementById("email")
var password=document.getElementById("password")
var role=document.getElementById("role")
var file=document.getElementById('file')
var submit=document.getElementById("submit")
var login=document.getElementById("login")
var upload=document.getElementById('btn')
var files=''
var progress1=document.getElementById('progress')
var img_url=""

submit.addEventListener("click",async function(){
    console.log(name1.value)
    console.log(email.value)
    console.log(password.value)
    console.log(role.value)
   await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((user) => {
    console.log("ok")
   


  })
  .catch((error) => {
alert(error.message)
    // ..
  });
    
})

file.addEventListener("click",function(){
  file.onchange=e=>{
    files=e.target.files
    console.log(files)
  }
})

upload.addEventListener('click',()=>{

  var storageRef = firebase.storage().ref();
// console.log(files[0].name)
  var uploadTask = storageRef.child(`images/${files[0].name}`)
  .put(files[0])

  uploadTask.on('state_changed', 
    (snapshot) => {
    
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress1.style.display="inline"
      progress1.innerText=`Progress : ${progress}`
      // console.log('Upload is ' + progress + '% done');

      if(progress==0){
          progress1.innerText="Start upload"
      //   alert("Upload Process Star\n Plz Wait For Upload Image In Data Base")
      }
      if(progress<25){
          progress1.innerText=`Progress : ${progress}`
      }
      if(progress<50){
          progress1.innerText=`Progress : ${progress}`
      }
      if(progress<75){
          progress1.innerText=`Progress : ${progress}`
      }

      if(progress==100){
          progress1.innerText="complete"
      //   alert("Upload Process Finish \n Successfully Upload Image In Data Base")
      }
      
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          img_url =   downloadURL;
        console.log('File available at', downloadURL);
      document.getElementById('submit').removeAttribute('disabled')
      });
    }
  );
console.log('ok')
})

login.addEventListener('click',function(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(async(user) => {
console.log(role.value)
    localStorage.setItem('uid',user.user.uid)
if(role.value=='user'){
  obj={
    name:name1.value,
    email:email.value,
    password: password.value,
    role:role.value,
    img_url:img_url,
    current_key:user.user.uid
  }

   await firebase.database().ref('user/').child(user.user.uid).set(obj);
   window.location.href='user.html'
}else if(role.value=='admin'){
  obj={ 
    name:name1.value,
    email:email.value,
    password: password.value,
    role:role.value,
    img_url:img_url,

  }
    await firebase.database().ref('admin/').child(user.user.uid).set(obj);
    window.location.href='admin.html'

}

  })
  .catch((error) => {
// console.log(error.message)
console.log('error')
  });
})



