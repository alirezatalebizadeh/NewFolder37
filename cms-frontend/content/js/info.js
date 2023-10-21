let firstNameInput = document.querySelector('#first-name-input')
let lastNameInput = document.querySelector('#last-name-input')
let currentPasswordInput = document.querySelector('#current-password-input')
let confirmPasswordInput = document.querySelector('#confirm-password-input')
let userNameInput = document.querySelector('#user-name-input')
let newPasswordInput = document.querySelector('#new-password-input')
let emailInput = document.querySelector('#email-input')
let editInfoBtn = document.querySelector('.submit-change-info-btn')







//! show admin's info in dom
function showInfoAdmin() {
    let mainAdminID = localStorage.getItem('adminID')

    fetch(`http://localhost:3000/api/admins/${mainAdminID}`)
        .then(res => res.json())
        .then(mainAdmin => {
            console.log(mainAdmin);
            firstNameInput.value = mainAdmin.firstName;
            lastNameInput.value = mainAdmin.lastName;
            userNameInput.value = mainAdmin.userName;
            emailInput.value = mainAdmin.email;
        })
}


//! edit user's Info
editInfoBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let mainAdminID = localStorage.getItem('adminID')

    if (currentPasswordInput.value === confirmPasswordInput.value) {

        let editInfoAdmin = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            userName: userNameInput.value,
            password: newPasswordInput.value,
            email: emailInput.value,
        }


        fetch(`http://localhost:3000/api/admins/${mainAdminID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editInfoAdmin)
        }).then(res => {
            console.log(res);
            showInfoAdmin()
            alert('users"s info successfully')
        })
    } else {
        alert('please check current Password and confirm password')
    }
})



window.addEventListener('load', showInfoAdmin)