var name1=document.getElementsByTagName('h1')
var pic=document.getElementById('pic')
console.log(name1[0].innerHTML)
var uids=localStorage.getItem('uid')
firebase.database().ref('user/').child(uids).once('value',(snp)=>{
    console.log(snp.toJSON())
pic.src=`${snp.toJSON().img_url}`
    name1[1].innerHTML+=`       :${snp.toJSON().name}`
    name1[2].innerHTML+=`    :${snp.toJSON().email}`
    // name1[1].innerHTML+=snp.toJSON().name
})