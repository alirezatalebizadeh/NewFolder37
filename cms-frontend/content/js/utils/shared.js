let namesAdmin = document.querySelectorAll('.admin-id')
let emailsAdmin = document.querySelectorAll('.admin-email')
let firstNamesElem = document.querySelectorAll('.firstName')
let lastNamesElem = document.querySelectorAll('.lastName')

console.log(namesAdmin);

function showDataAdmin() {
    let mainAdminID = localStorage.getItem('adminID')

    fetch(`http://localhost:3000/api/admins/${mainAdminID}`)
        .then(res => res.json())
        .then(mainAdmin => {
            namesAdmin.forEach(name => {
                name.innerHTML = `${mainAdmin.firstName} ${mainAdmin.lastName}`
            })

            emailsAdmin.forEach(email => {
                email.innerHTML = `${mainAdmin.email}`
            })

            firstNamesElem.forEach(firstNameElem => {
                firstNameElem.innerHTML = `${mainAdmin.firstName}`
            })
            lastNamesElem.forEach(lastNameElem => {
                lastNameElem.innerHTML = `${mainAdmin.lastName}`
            })
        })

}



//! show detail of admin 
window.addEventListener('load', () => {

    let adminID = localStorage.getItem('adminID')

    if (!adminID) {
        location.href = 'http://127.0.0.1:5501/cms-frontend/login.html'
    }


    fetch(`http://localhost:3000/api/admins/${adminID}`)
        .then(res => res.json())
        .then(admin => {
            document.title = `${admin.userName}`
        })

})


export default showDataAdmin