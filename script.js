import User from "./user.js";

document.getElementById("submitbtn").disabled = true;
var counter = [false, false, false, false, false, false, false]
var users = []

//Validering av textfälten
document.getElementById('fname').addEventListener('keyup', () => {
    let value = document.getElementById('fname').value
    if(validateinputlenght(2, value) == true){
        document.getElementById('fnameerror').innerText = ''
        changecolor(true, 'fname')
        counter[0]= true
        test()
    }    
    else {
        document.getElementById('fnameerror').innerText = 'Namnet måste innehålla minst 2 bokstäver'
        changecolor(false, 'fname')
        counter[0]= false
        test()
    }     
})
document.getElementById('lname').addEventListener('keyup', () => {
    let value = document.getElementById('lname').value
    if(validateinputlenght(2, value) == true){
        document.getElementById('lnameerror').innerText = ''
        changecolor(true, 'lname')
        counter[1]= true
        test()
    }    
    else {
        document.getElementById('lnameerror').innerText = 'Namnet måste innehålla minst 2 bokstäver'
        changecolor(false, 'lname')
        counter[1]= false
        test()
    }    
})
document.getElementById('email').addEventListener('keyup', () => {
    let values = document.getElementById('email').value
    if(validateEmail(values) == true && checkuserexists(values, users) == 'noexist'){
        document.getElementById('emailerror').innerText = ''
        changecolor(true, 'email')
        counter[2]= true
        test()
    }
    else {
        if(checkuserexists(values) == 'yesexist'){
            document.getElementById('emailerror').innerText = 'Emailadressen finns redan'
        }
        else{
            document.getElementById('emailerror').innerText = 'Emailadressen är felaktig'
        }
        changecolor(false, 'email')
        counter[2]= false
        test()
    }  
})
document.getElementById('phone').addEventListener('keyup', () => {
    let value = document.getElementById('phone').value
    if(allnumeric(value) == true && validateinputlenght(10, value) == true){
        
        document.getElementById('phoneerror').innerText = ''
        changecolor(true, 'phone')
        counter[3]= true
        test()
    }
    else {
        document.getElementById('phoneerror').innerText = 'Telefonnummret måste innehålla minst 8 siffror'
        changecolor(false, 'phone')
        counter[3]= false
        test()
    } 
})
document.getElementById('street').addEventListener('keyup', () => {
    let value = document.getElementById('street').value
    if(validateinputlenght(2, value) == true){
        document.getElementById('streeterror').innerText = ''
        changecolor(true, 'street')
        counter[4]= true
        test()
    }    
    else {
        document.getElementById('streeterror').innerText = 'Gatunamn måste innehålla minst 2 tecken'
        changecolor(false, 'street')
        counter[4]= false
        test()
    }      
})
document.getElementById('zip').addEventListener('keyup', () => {
    let value = document.getElementById('zip').value
    if(allnumeric(value) == true && validateinputlenght(5, value) == true){
        document.getElementById('ziperror').innerText = ''
        changecolor(true, 'zip')
        counter[5]= true
        test()
    }    
    else {
        document.getElementById('ziperror').innerText = 'Postnummer måste innehålla 5 siffror'
        changecolor(false, 'zip')
        counter[5]= false
        test()
    }      
})
document.getElementById('city').addEventListener('keyup', () => {
    let value = document.getElementById('city').value
    if(validateinputlenght(2, value) == true){
        document.getElementById('cityerror').innerText = ''
        changecolor(true, 'city')
        counter[6]= true
        test()
    }    
    else {
        document.getElementById('cityerror').innerText = 'Stad måste innehålla minst 2 bokstäver'
        changecolor(false, 'city')
        counter[6]= false
        test()
    }      
})

//skicka-knappen som genererar en användare och skriver ut på en lista
document.getElementById('regform').addEventListener('submit', (e) => {
    e.preventDefault()

      

        let test = false;
        if(users.length == 0 || wantToChange == false){

            let user = {
                id: create_UUID(),
                firstname: document.getElementById('fname').value,
                lastname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                street:  document.getElementById('street').value,
                zip:  document.getElementById('zip').value,
                city:  document.getElementById('city').value  
            }

            users.push(user)
            outputList()
        }
        else{  
            let user = {
                id : id,
                firstname: document.getElementById('fname').value,
                lastname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                street:  document.getElementById('street').value,
                zip:  document.getElementById('zip').value,
                city:  document.getElementById('city').value  
            }
            for(var i = 0; i < users.length; i++){
                if(users[i].email == user.email){
                    users.splice(i, 1, user);
                    document.getElementById('list').innerHTML = ''
                    outputList() 
                    test= true
                    break
                }
            }
            if(test != true){
                users.push(user)
                outputList()
            }
            wantToChange = false;
        }
        document.getElementById('fname').value = ''
        document.getElementById('lname').value = ''
        document.getElementById('email').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('street').value = ''
        document.getElementById('zip').value = ''
        document.getElementById('city').value = ''

        document.getElementById("email").disabled = false
})

//listobjekten skapas
let outputList = () => {
    document.getElementById('list').innerHTML = ''
    for(let displayuser of users){
        // umslutande div
        var column = document.createElement("DIV")
        column.className = "user";
        (document.getElementById('list')).appendChild(column)
      
        //  rubrik
        var header = document.createElement("H1")
        header.className = "header"
        header.innerHTML = displayuser.firstname + ' ' + displayuser.lastname
        $(header).click(function() {    
            $(this).next("div").toggleClass("displayGrid")
        })
        column.appendChild(header)
        
        // griden
        var grid = document.createElement("DIV")
        grid.className = "gridContainer displayGrid"
        column.appendChild(grid)
      
        // varje gridbox
        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = 'Id: '
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = displayuser.id
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = displayuser.street
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = 'Email: '
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = displayuser.email
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = displayuser.zip + ' ' + displayuser.city
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = 'phonenumber: '
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = displayuser.phone
        grid.appendChild(gridbox)

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = ''
        grid.appendChild(gridbox) 

        var gridbox = document.createElement("DIV")
        gridbox.className = "gridItem"
        gridbox.innerHTML = ''
        grid.appendChild(gridbox)

        //  delete button
          var deletebtn = document.createElement("BUTTON")
          deletebtn.className = "deletebtn"
          deletebtn.innerHTML = 'Delete user'
          $(deletebtn).click(function() {
            deleteUser(displayuser.email)
          })
          grid.appendChild(deletebtn)

        //  change button
        var changebtn = document.createElement("BUTTON")
        changebtn.className = "changebtn"
        changebtn.innerHTML = 'Change user'
        $(changebtn).click(function() {
            changeUser(displayuser)
          })
        grid.appendChild(changebtn)
    }
}
let deleteUser = (mail) =>{
    for(var i = 0; i < users.length; i++){
        if(users[i].email == mail){
            users.splice(i, 1)
            document.getElementById('list').innerHTML = ''
            outputList()
        }       
    }
}  
let wantToChange = false;
let id = '';
let changeUser = (user) =>{
    //OBS!! Hur gör man här för att inte ändra ID? plats i listan är kvar men ID kommer bytas ut
    document.getElementById('fname').value = user.firstname
    document.getElementById('lname').value = user.lastname
    document.getElementById('email').value = user.email
    document.getElementById('phone').value = user.phone
    document.getElementById('street').value = user.street  
    document.getElementById('zip').value = user.zip  
    document.getElementById('city').value = user.city  
    
    document.getElementById("email").disabled = true
    wantToChange = true
    id = user.id;
}
//visar/gömmer spara-knappen
let test = () =>{
    if(counter.includes(false)) document.getElementById("submitbtn").disabled = true
    else document.getElementById("submitbtn").disabled = false
}
const validateinputlenght = (refnr, input) => {
    if(input.length >= refnr){
        return true
    }
    else return false 
}
const validateEmail = (email)  => {
    var reEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    return reEmail.test(email.toLowerCase())
}
const allnumeric = (input) => {
    var numbers = /^[0-9]+$/
    if(input.match(numbers)) 
        return true;
        else return false
 } 
 let checkuserexists = (input) => {   
    let result = 'noexist'
    for(var i = 0; i < users.length; i++){
        if(users.length != 0 && input == users[i].email){
            result = 'yesexist'
            break
        }
        else result = 'noexist'
    }
    return result
}
let changecolor = (validate, id) => {
    if(validate == true)document.getElementById(id).style.backgroundColor =  "#FBFCFC";
    else document.getElementById(id).style.backgroundColor = "#FFB8BD"
}
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}