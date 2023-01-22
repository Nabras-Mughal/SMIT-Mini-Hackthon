var name1 = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var role = document.getElementById("role");

var submit = document.getElementById("submit");
var login = document.getElementById("login");

submit.addEventListener("click", async function () {
  console.log(name1.value);
  console.log(email.value);
  console.log(password.value);
  console.log(role.value);
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {
      console.log("ok");
    })
    .catch((error) => {
      alert(error.message);
      // ..
    });
});

login.addEventListener("click", function () {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(async (user) => {
      localStorage.setItem("uid", user.user.uid);
      if (role.value == "user") {
        await firebase.database().ref("user/").child(user.user.uid).set();
        window.location.href = "user.html";
      } else if (role.value == "admin") {
        await firebase.database().ref("admin/").child(user.user.uid).set();
        window.location.href = "admin.html";
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
