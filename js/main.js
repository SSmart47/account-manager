const firebaseConfig={apiKey:"AIzaSyCodGBYdwn382QLxw5JLeHV3BXsua2ekGM",authDomain:"ssaccountmanager.firebaseapp.com",databaseURL:"https://ssaccountmanager-default-rtdb.firebaseio.com",projectId:"ssaccountmanager",storageBucket:"ssaccountmanager.appspot.com",messagingSenderId:"466168946177",appId:"1:466168946177:web:9eac116d7ad70a8c19aa00"};var User;firebase.initializeApp(firebaseConfig);var wrongSymbol="\\/| '\"`~.#$[](){}";function PyArrayed(e){var a="";0<e.length&&(a+="'"+e[0]+"'");for(var n=1;n<e.length;n++)a+="  '"+e[n]+"'";return a}function Exist(e,a){for(var n=0;n<a.length;n++)if(a[n]==e)return!0;return!1}function NameMistake(e){for(var a=0;a<e.length;a++)if(!("a"<=e[a]&&e[a]<="z"||"A"<=e[a]&&e[a]<="Z"||"0"<=e[a]&&e[a]<="9"||"_"==e[a]))return!0;return!1}function PassMistake(e){for(var a=0;a<e.length;a++)if(Exist(e[a],wrongSymbol))return!0;return!1}async function GetUserID(){var n=-1;return await firebase.database().ref().child("_data_").get().then(e=>{var a;e.exists()?(a=e.val(),n=0,e=1,e+=n+=parseInt(a._user_id_),firebase.database().ref("_data_").set({_user_id_:e})):console.log("User_ID: -")}).catch(e=>{console.error(e)}),n}function GenerateProfile(){document.getElementById("menu_profile_name").innerHTML=User.name}function FromMainToProfile(){GenerateProfile(),document.getElementById("id_menu_main").hidden="hidden",document.getElementById("id_menu_profile").removeAttribute("hidden")}function Profile_ChangeNickname(){var a=document.getElementById("changenick_name").value,n=document.getElementById("changenick_pass").value;a.length<1?alert("Account Name should not be empty!"):n.length<1?alert("Password should not be empty!"):NameMistake(a)?alert("Account Name can only contain letters, numbers and '_'"):PassMistake(n)?alert("Password can't contain "+PyArrayed(wrongSymbol)):firebase.database().ref().child("users").child(a).get().then(e=>{e.exists()?alert("Account Name is already taken!"):n==User.password?(firebase.database().ref("users/"+User.name).remove(),User.name=a,firebase.database().ref("users/"+a).set({name:User.name,password:User.password,id:User.id}),alert("Account Name was changed successfully!"),GenerateProfile()):alert("Wrong Password!")}).catch(e=>{console.error(e)})}function Profile_ChangePassword(){var e=document.getElementById("changepass_old").value,a=document.getElementById("changepass_new").value;e.length<1||a.length<1?alert("Password should not be empty!"):PassMistake(e)||PassMistake(a)?alert("Password can't contain "+PyArrayed(wrongSymbol)):e==User.password?(User.password=a,firebase.database().ref("users/"+User.name).set({name:User.name,password:User.password,id:User.id}),alert("Password was changed successfully!")):alert("Wrong Password!")}document.getElementById("id_btn_sup").onclick=async function(){var a,n=document.getElementById("id_sup_name").value,t=document.getElementById("id_sup_pass").value;n.length<1?alert("Account Name should not be empty!"):t.length<1?alert("Password should not be empty!"):NameMistake(n)?alert("Account Name can only contain letters, numbers and '_'"):PassMistake(t)?alert("Password can't contain "+PyArrayed(wrongSymbol)):-1!=(a=await GetUserID())?firebase.database().ref().child("users").child(n).get().then(e=>{e.exists()?alert("This Account Name is already taken!"):(firebase.database().ref("users/"+n).set({name:n,password:t,id:a}),alert("Account was registered successfully!"))}).catch(e=>{console.error(e)}):console.log("No Connection..")},document.getElementById("id_btn_sin").onclick=function(){var e=document.getElementById("id_sin_name").value,n=document.getElementById("id_sin_pass").value;e.length<1?alert("Account Name should not be empty!"):n.length<1?alert("Password should not be empty!"):NameMistake(e)?alert("Account Name can only contain letters, numbers and '_'"):PassMistake(n)?alert("Password can't contain "+PyArrayed(wrongSymbol)):firebase.database().ref().child("users").child(e).get().then(e=>{var a;e.exists()?(a=e.val(),n==a.password?(User=e.val(),FromMainToProfile()):alert("Wrong Password!")):alert("Account does not exist!")}).catch(e=>{console.error(e)})},document.getElementById("id_btn_change_nick").onclick=function(){Profile_ChangeNickname()},document.getElementById("id_btn_change_pass").onclick=function(){Profile_ChangePassword()};