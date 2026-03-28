async function HandleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = JSON.stringify({ email, password })
    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: auth
    })
    try{
        let data = await response.json()
        console.log(data)
    } catch (error){
        console.log(error)
    }
}
export default HandleSubmit;