let LoginForm = document.querySelector('.form-login')
let password_input = document.querySelector('.password_input')
let userNameInput = document.querySelector('.userNameInput')
let submitBtn = document.querySelector('.submit-form-btn')







submitBtn.addEventListener('click', (e) => {
    let AdminID = null;
    e.preventDefault()

    if (userNameInput.value.length > 5 && password_input.value.length > 8) {

        fetch(`http://localhost:3000/api/admins`)
            .then(res => res.json())
            .then(admins => {
                console.log(admins)
                let isAdmin = admins.some(admin => {
                    if (admin.userName === userNameInput.value && admin.password === password_input.value)
                        AdminID = admin._id
                    return admin.userName === userNameInput.value && admin.password === password_input.value
                })

                if (isAdmin) {
                    console.log(AdminID);
                    localStorage.setItem('adminID', `${AdminID}`)
                    location.href = 'http://127.0.0.1:5501/cms-frontend/panel-users.html'
                } else {
                    alert('Admin not found')
                    location.href = 'http://127.0.0.1:5501/cms-frontend/register.html'
                }
                clearInputs()
            })
    } else {
        alert('please insert valid data ')
        clearInputs()
    }

})

function clearInputs() {
    password_input.value = ''
    userNameInput.value = ''
}


