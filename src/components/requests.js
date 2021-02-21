exports.blockUser = (id , block) => {
    fetch("https://task4-backend.herokuapp.com/blockUser",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt') , 'Block' : block , 'Id' : id}
    }).then((response) => response.json()).then((res) => {console.log(res)})
}

exports.requestForDelete = (id) => {
    fetch("https://task4-backend.herokuapp.com/deleteUser",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt') , 'Delete' : "delete" , 'Id' : id}
    }).then((response) => response.json()).then((res) => {console.log(res)})
}

exports.validateUser = (name , password , email) => {

    if(name === "" || password === "" || email === "") {
        document.getElementById("passwordHelp").classList.remove('hide-label')
    }
    document.getElementById("form").reset();
    fetch("https://task4-backend.herokuapp.com/auth", {
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

exports.registerUser = async (name , password , email) =>  {
    document.getElementById("form").reset();
    let result = await fetch("https://task4-backend.herokuapp.com/reg", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Auth': ""},
        body: JSON.stringify({name: name, password: password, email: email} )
    })
    return result
        // .then(response => response.text())
        // .then((res) => {return res})
}

exports.getIdFromJwt = () =>  {
    fetch("https://task4-backend.herokuapp.com/getCurrentId", {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Auth': localStorage.getItem('jwt')}
    })
        .then(response => response.json())
        .then((result) => {localStorage.setItem('curId' , result.id);return result.id})
}