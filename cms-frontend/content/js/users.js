import './utils/shared.js'
import showDataAdmin from './utils/shared.js'
let usersContainer = document.querySelector('.users-wrap')
let removeModalContainer = document.querySelector('.remove_modal')
let removeUserBtn = document.querySelector('.accept-btn')
let cancelDeleteBtn = document.querySelector('.unaccept-btn')
let editBtn = document.querySelector('.edit_btn')
let userNameInput = document.querySelector('#username-input')
let firstNameInput = document.querySelector('#first-name-input')
let lastNameInput = document.querySelector('#last-name-input')
let logOutBtn = document.querySelector('.sign-out-btn')
let mainUserID = null;


function changeBackground() {
  document.body.classList.toggle('black')
}




//! fetch all user from db
function getAllUsers() {
  usersContainer.innerHTML = ''
  fetch('http://localhost:3000/api/users/')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      data.forEach(user => {
        usersContainer.insertAdjacentHTML('beforeend', `
              <div class="user-box">
              <div class="user-box_left">
                <img src="${user.profile}" class="user-profile-box" alt="">
                <div class="user-detail">
                  <h1 class="user-id">
                    <span>
                    ${user.userName}
                    </span>
                    <span class="user-history">
                      ${user.created_AT}
                    </span>
                  </h1>
                  <h3 class="user-name">
                    ${user.firstName} ${user.lastName}
                  </h3>
                </div>
              </div>

              <div class="user-btns-group">
                <!--  --- edit btn ---- ! -->
                <button class="user-edit-btn" onclick='showEditModal("${user._id}")'>edit</button>
                <!--  -- remove btn --- ! -->
                <button class="user-remove-btn" onclick='showRemoveModal("${user._id}")'>remove</button>
              </div>
            </div>
              `)
      });
    })
}

//! show remove modal
function showRemoveModal(userID) {
  mainUserID = userID;
  removeModalContainer.classList.add('visible')
  document.querySelector('.deleteModal').style.display = 'block';
  document.querySelector('.editModal').style.display = 'none';
}

//! show edit modal
function showEditModal(userID) {
  mainUserID = userID;
  removeModalContainer.classList.add('visible')
  document.querySelector('.deleteModal').style.display = 'none';
  document.querySelector('.editModal').style.display = 'block';
}

//! close  modal
function closeModal() {
  removeModalContainer.classList.remove('visible')
}



//! remove user from db
removeUserBtn.addEventListener('click', () => {
  fetch(`http://localhost:3000/api/users/${mainUserID}`, {
    method: 'DELETE'
  })
    .then(res => {
      console.log(res)
      closeModal()
      getAllUsers()
    })
})


window.addEventListener('load', () => {
  getAllUsers()
  showDataAdmin()
})


cancelDeleteBtn.addEventListener('click', closeModal)


//!Edit User Info
editBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let userUpdateInfo = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    userName: userNameInput.value.trim(),
    profile: 'content/img/profile/banana.png',
  }
  console.log(userUpdateInfo);


  fetch(`http://localhost:3000/api/users/${mainUserID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userUpdateInfo)
  })
    .then(res => {
      console.log(res);
      closeModal()
      clearInputsEdit()
      getAllUsers()
    })

})

function clearInputsEdit() {
  firstNameInput.value = ''
  lastNameInput.value = ''
  userNameInput.value = ''
}


window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    closeModal()
  }
})

logOutBtn.addEventListener('click', () => {
  localStorage.clear();
  location.href = 'http://127.0.0.1:5501/cms-frontend/login.html'
})


