
let firstnameInput = document.querySelector('.firstname')
let lastnameInput = document.querySelector('.lastname')
let usernameInput = document.querySelector('.username')
let submitBtn = document.querySelector('.submit-form-btn')

const firstNameMessage = document.querySelector('.firstname-message')
const lastNameMessage = document.querySelector('.lastname-message')
const userNameMessage = document.querySelector('.username-message')

let firstnameValid = null, lastnameValid = null, usernameValid = null;


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();


    let newUserInfo = {
        firstName: firstnameInput.value.trim(),
        lastName: lastnameInput.value.trim(),
        userName: usernameInput.value.trim(),
        profile: './content/img/profile.png'
    }

    console.log(newUserInfo);

    if (firstnameValid && lastnameValid && usernameValid) {
        fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
        clearInput()

        alert('you registered successfully')
        console.log('valid');
    } else {
        console.log('invalid');
        alert('please insert valid data')
    }

})


function clearInput() {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''
}


firstnameInput.addEventListener('input', (e) => {
    if (e.target.value.length < 3) {
        firstNameMessage.innerHTML = 'First name is not valid';
        firstNameMessage.classList.remove('valid-message')
        firstNameMessage.classList.add('invalid-message')
        firstnameValid = false
    } else {
        firstNameMessage.innerHTML = 'First name is  valid';
        firstNameMessage.classList.remove('invalid-message')
        firstNameMessage.classList.add('valid-message')
        firstnameValid = true
    }
})


lastnameInput.addEventListener('input', (e) => {
    if (e.target.value.length < 3) {
        lastNameMessage.innerHTML = 'Last name is not valid';
        lastNameMessage.classList.remove('valid-message')
        lastNameMessage.classList.add('invalid-message')
        lastnameValid = false
    } else {
        lastNameMessage.innerHTML = 'Last name is  valid';
        lastNameMessage.classList.add('valid-message')
        lastNameMessage.classList.remove('invalid-message')
        lastnameValid = true
    }
})


usernameInput.addEventListener('input', (e) => {
    if (e.target.value.length < 8) {
        userNameMessage.innerHTML = 'User name is not valid';
        userNameMessage.classList.remove('valid-message')
        userNameMessage.classList.add('invalid-message')
        usernameValid = false
    } else {
        userNameMessage.innerHTML = 'User name is  valid';
        userNameMessage.classList.add('valid-message')
        userNameMessage.classList.remove('invalid-message')
        usernameValid = true
    }
})
