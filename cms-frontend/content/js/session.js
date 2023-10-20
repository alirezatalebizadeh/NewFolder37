let sessionNameInput = document.querySelector('#session-name-input')
let sessionTimeInput = document.querySelector('#session-time-input')
let sessionPriceInput = document.querySelector('#session-price-input')
let addNewSession = document.querySelector('.add-new-session-btn')
let sessionSelectCourseBox = document.querySelector('.session-dropdown-box')
let mainCourseElem = document.querySelector('.session-dropdown-text')
let allCoursesListItem = document.querySelectorAll('.session-dropdown-menu-item')
let isFree = document.querySelector('#isFree')
let isFreeValue = true;


//! add menu to dropDown
allCoursesListItem.forEach(course => {
    course.addEventListener('click', (e) => {
        mainCourseElem.innerHTML = e.target.innerHTML
    })
})

//! clear value of inputs
function clearInputs() {
    sessionNameInput.value = ''
    sessionTimeInput.value = ''
    sessionPriceInput.value = ''
    mainCourseElem.value = ''
}

//! add session
addNewSession.addEventListener('click', (e) => {
    e.preventDefault();

    let newSessionData = {
        title: sessionNameInput.value,
        time: sessionTimeInput.value,
        // isFree: Boolean(Number(sessionPriceInput.value)),
        isFree: isFreeCourse(sessionPriceInput.value),
        course: mainCourseElem.innerHTML,
    }


    fetch(`http://localhost:3000/api/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSessionData)
    }).then(res => {
        clearInputs()
        alert('course added')
    })
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

function isFreeCourse(value) {
    if (value) {
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

})    
