const form = document.getElementById("form")

function User(username, password){
    this.username = username
    this.password = password
}

const sendData = (e) => {
    e.preventDefault()
    // PayLoad
    const info = new User(e.target.username.value, e.target.pass.value)


    fetch('https://posgtresql-production.up.railway.app/login', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(info) 
    }).then(res => res.text())
        .then(data => {
            data = JSON.parse(data)
            console.log(data.status)
            alert(data.message)
        })
}

form.addEventListener('submit', sendData)