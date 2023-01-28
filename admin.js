var name1=document.getElementsByTagName('h1')
var table= document.getElementsByTagName('table')
console.log(name1[0].innerHTML)
var uids=localStorage.getItem('uid')
firebase.database().ref('admin/').child(uids).once('value',(snp)=>{
    console.log(snp.toJSON())
    name1[1].innerHTML+=`       :${snp.toJSON().name}`
    name1[2].innerHTML+=`    :${snp.toJSON().email}`
    // name1[1].innerHTML+=snp.toJSON().name
})


firebase.database().ref('user/').once('value',(snp)=>{
    var data=snp.toJSON()
    var data1=Object.values(data)
    console.log(data1)
    data1.map((v,i)=>{
table[0].innerHTML+=`
<tr>
 <td>${i+1}</td>
 <td>${v.name}</td>
 <td>${v.email}</td>
 <td><img width='100px' src="${v.img_url}"></td>

 <td>
 <button id='${v.current_key}' onclick='edit(this)'> edit</button>
 <button id='${v.current_key}' onclick='del(this)'> del</button>
 </td>
   </tr>`
    })
})

function edit(e){
localStorage.setItem('current_data',e.id)
window.location.href='edit.html'
}


function del(e){

    firebase.database().ref('user/').child(e.id).remove()
    window.location.reload();
   
    }
    