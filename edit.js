var name1=document.getElementById("name")
var email=document.getElementById("email")
var password=document.getElementById("password")
// var role=document.getElementById("role")
var upload=document.getElementById('btn')
var files=''
var progress1=document.getElementById('progress')
var img_url=""

var submit=document.getElementById("submit")
var edit_uid=localStorage.getItem('current_data')

firebase.database().ref('user/').child(edit_uid).once('value',(snp)=>{
name1.value=snp.toJSON().name
email.value=snp.toJSON().email
password.value=snp.toJSON().password
})
// var uidss=edit_uid
submit.addEventListener('click',()=>{
    Obj={
        name:name1.value,
    email:email.value,
    password: password.value,
    // role:role.value,
    current_key:edit_uid

    }
    firebase.database().ref('user/').child(edit_uid).update(Obj)
    console.log('ok')
    window.location.href='admin.html'
})





file.addEventListener("click",function(){
    file.onchange=e=>{
      files=e.target.files
      console.log(files)
    }
  })
  
  upload.addEventListener('click',()=>{
  
    var storageRef = firebase.storage().ref();
  console.log(files[0].name)
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