let usersContainer = document.querySelector('.users-wrap')
let removeModalContainer = document.querySelector('.remove_modal')
let removeUserBtn = document.querySelector('.accept-btn')
let cancelDeleteBtn = document.querySelector('.unaccept-btn')
let mainUserID = null;





function getAllUsers() {
  usersContainer.innerHTML = ''
  fetch('http://localhost:3000/api/users/')
    .then(res => res.json())
    .then(data => {
      console.log(data);
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
                <button class="user-edit-btn">edit</button>
                <!--  -- remove btn --- ! -->
                <button class="user-remove-btn" onclick='showModal("${user._id}")'>remove</button>
              </div>
            </div>
              `)
      });
    })
}

//! show remove modal
function showModal(userID) {
  mainUserID = userID;
  removeModalContainer.classList.add('visible')
}

//! close remove modal
function closeRemoveModal() {
  removeModalContainer.classList.remove('visible')

}




removeUserBtn.addEventListener('click', () => {
  fetch(`http://localhost:3000/api/users/${mainUserID}`, {
    method: 'DELETE'
  })
    .then(res => {
      console.log(res)
      closeRemoveModal()
      getAllUsers()
    })
})

window.addEventListener('load', getAllUsers)
cancelDeleteBtn.addEventListener('click', closeRemoveModal)