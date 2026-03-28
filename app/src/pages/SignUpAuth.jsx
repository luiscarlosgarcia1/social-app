async function HandleSubmit(event){
    event.preventDefault();
    let email = event.target.email.value
    let fullName = event.target.fullName.value
    let phone = event.target.phone.value
    let password = event.target.password.value
    let data = JSON.stringify ({ email, fullName, phone, password })
    let response = await fetch('http://localhost:3000/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data,
    })
    try{
        let result = await response.json()
        console.log(result)
    } catch (error){
        console.log(error)
    }
}
export default HandleSubmit;
