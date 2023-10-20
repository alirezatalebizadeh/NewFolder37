let sessionNameInput = document.querySelector('#session-name-input')
let sessionTimeInput = document.querySelector('#session-time-input')
let sessionPriceInput = document.querySelector('#session-price-input')
let addNewSession = document.querySelector('.add-new-session-btn')
let sessionSelectCourseBox = document.querySelector('.session-dropdown-box')
let mainCourseElem = document.querySelector('.session-dropdown-text')
let allCoursesListItem = document.querySelectorAll('.session-dropdown-menu-item')
let allPriceBadge = document.querySelectorAll('.session-price-badge')
let isFree = document.querySelector('#isFree')
let sessionContainer = document.querySelector('.sessions')
let isFreeValue = true;


//! add menu to dropDown
allCoursesListItem.forEach(course => {
    course.addEventListener('click', (e) => {
        mainCourseElem.innerHTML = e.target.innerHTML
    })
})

//! get all session from db
function getAllSessions() {
    sessionContainer.innerHTML = ''
    fetch('http://localhost:3000/api/sessions')
        .then(res => res.json())
        .then(sessions => {
            sessions.forEach(session => {
                sessionContainer.insertAdjacentHTML('beforeend', `
            <div class="session-box">
                  <div>
                    <h1 class="session-name-title">${session.title}</h1>
                    <span class="session-category">${session.course}</span>
                  </div>
                  <div>
                    <span class="session-price-badge">${session.isFree ? 'free' : 'not free'}</span>
                    <span class= "session-time" > ${session.time}</span >
                  </div >
                </div >
                `)
            })
        })
}



//! clear value of inputs
function clearInputs() {
    sessionNameInput.value = ''
    sessionTimeInput.value = ''
    sessionPriceInput.value = ''
    mainCourseElem.value = ''
}


//! add session to db
addNewSession.addEventListener('click', (e) => {
    e.preventDefault();

    let newSessionData = {
        title: sessionNameInput.value,
        time: sessionTimeInput.value,
        isFree: isFreeCourse(),
        course: mainCourseElem.innerHTML,
    }


    if (sessionNameInput.value.length > 5 && sessionTimeInput.value.length) {
        fetch(`http://localhost:3000/api/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSessionData)
        }).then(res => {
            clearInputs()
            alert('course added')
            getAllSessions()
        })
    } else {
        alert('please insert valid value')
    }

})


//! show drop down menu
sessionSelectCourseBox.addEventListener('click', (e) => {
    e.target.classList.add('active')
})


//! hiddon item of dropDown
window.addEventListener('click', (e) => {
    if (e.target.id !== 'dropDownCourse') {
        sessionSelectCourseBox.classList.remove('active')
    }
})



function isFreeCourse() {
    if (isFreeValue) {
        return true
    } else {
        return false
    }
}


//! is checkbox is checked then inputPrice is desabled
isFree.addEventListener("input", (e) => {

    if (isFree.checked) {
        isFreeValue = true
        sessionPriceInput.disabled = true
        sessionPriceInput.value = ''
    } else {
        isFreeValue = false
        sessionPriceInput.disabled = false
    }
    isFreeCourse()
})

window.addEventListener('load', getAllSessions)

