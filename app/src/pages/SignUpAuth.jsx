async function HandleSubmit(event){
    event.preventDefault();
    let email = event.target.email.value
    let fullName = event.target.fullName.value
    let phone = event.target.phone.value
    let password = event.target.password.value
    let role = event.target.userType.value
    let data = JSON.stringify ({ email, fullName, phone, password, role })
    let response = await fetch('http://localhost:3000/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data,
    })
    try{
        let result = await response.json()
        console.log(result)
        if(result.ok){
            window.location.href = '/'
        }
    } catch (error){
        console.log(error)
    }
}
export default HandleSubmit;
