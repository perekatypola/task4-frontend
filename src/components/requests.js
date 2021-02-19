exports.blockUser = (id , block) => {
    fetch("http://localhost:3005/blockUser",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt') , 'Block' : block , 'Id' : id}
    }).then((response) => response.json()).then((res) => {console.log(res)})
}

exports.requestForDelete = (id) => {
    fetch("http://localhost:3005/deleteUser",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt') , 'Delete' : "delete" , 'Id' : id}
    }).then((response) => response.json()).then((res) => {console.log(res)})
}

exports. validateUser = (name , password , email) => {

    if(name === "" || password === "" || email === "") {
        document.getElementById("passwordHelp").classList.remove('hide-label')
    }
    document.getElementById("form").reset();
    fetch("http://localhost:3005/auth", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Auth': ""},
        body: JSON.stringify({name: name, password: password, email: email} )
    })
        .then(response => response.text())
        .then(result => {
            console.log(result)
            if(result !== "blocked" && result !== "invalid")
            {
                localStorage.setItem('jwt' , result)
                window.location = '/user'
            }
        })
}

exports.registerUser = (name , password , email) =>  {
    document.getElementById("form").reset();
    fetch("http://localhost:3005/reg", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Auth': ""},
        body: JSON.stringify({name: name, password: password, email: email} )
    })
        .then(response => response.text())
        .then(() => {})
}

exports.getIdFromJwt = () =>  {
    fetch("http://localhost:3005/getCurrentId", {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Auth': localStorage.getItem('jwt')}
    })
        .then(response => response.json())
        .then((result) => {localStorage.setItem('curId' , result.id);return result.id})
}