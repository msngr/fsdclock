// app functions

loadLocalStorage()
showTime()
refreshTime()

// onclick event listeners

document.getElementById('clock').addEventListener('click', function () {
    openMenu()
})

document.getElementById('menu').addEventListener('click', function () {
    closeMenu()
})

document
    .querySelector('[data-formatHours]')
    .addEventListener('click', function () {
        formatHours()
    })

document
    .querySelector('[data-switchTheme]')
    .addEventListener('click', function () {
        switchTheme()
    })

document
    .querySelector('[data-toggleSeconds]')
    .addEventListener('click', function () {
        toggleSeconds()
    })

// function definitions

function loadLocalStorage() {
    // load time-format from localStorage
    if (localStorage.getItem('fsdcTimeFormat')) {
        formatHours()
    } else {
        document.querySelector('[data-formatHours]').innerText = '12hFormat'
    }
    // load seconds-setting from localStorage
    if (localStorage.getItem('fsdcSeconds')) {
        document.getElementById('clock').classList.add('no-seconds')
        document.querySelector('[data-toggleSeconds]').innerText = 'showSeconds'
    } else {
        document.querySelector('[data-toggleSeconds]').innerText = 'hideSeconds'
    }
    // load theme from localStorage
    if (localStorage.getItem('fsdcTheme')) {
        switchTheme()
    }
}

function showTime() {
    // get current time
    const time = new Date()
    // get hours, minutes, seconds in 2 digits
    const hours = time.getHours().toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
    // show hours, minutes, seconds in span elements
    document.querySelector('[data-hours]').innerHTML = hours
    document.querySelector('[data-minutes]').innerHTML = minutes
    document.querySelector('[data-seconds]').innerHTML = seconds
    // switch to 12 hour format if chosen
    const timeFormat = document.getElementById('time-format')
    if (timeFormat.classList.contains('am-pm-active')) {
        switchFormat()
    }
}

function refreshTime() {
    // refresh time every second
    setInterval(showTime, 1000)
}

// open menu when clicking on time div
function openMenu() {
    const body = document.body
    const menu = document.getElementById('menu')
    const clock = document.getElementById('clock')
    menu.style.display = 'flex'
    clock.style.filter = 'blur(4px)'
    if (body.classList.contains('theme-dark')) {
        clock.style.color = 'darkgrey'
    } else {
        clock.style.color = 'lightgrey'
    }
}

// close menu when clicking on menu div
function closeMenu() {
    const menu = document.getElementById('menu')
    const clock = document.getElementById('clock')
    menu.style.display = 'none'
    clock.style.filter = 'blur(0px)'
    clock.style.color = ''
}

// show/hide am/pm
function formatHours() {
    const timeFormat = document.getElementById('time-format')
    const formatHours = document.querySelector('[data-formatHours]')
    timeFormat.classList.toggle('am-pm-active')
    // save in local storage if class am-pm-active is applied to timeFormat
    if (timeFormat.classList.contains('am-pm-active')) {
        formatHours.innerText = '24hFormat'
        localStorage.setItem('fsdcTimeFormat', 'am-pm-active')
    } else {
        formatHours.innerText = '12hFormat'
        localStorage.removeItem('fsdcTimeFormat')
    }
    switchFormat()
}

function switchFormat() {
    const hours = document.querySelector('[data-hours]')
    const amPM = document.querySelector('[data-amPM]')
    if (hours.innerHTML > '12') {
        hours.innerHTML = hours.innerHTML - 12
        hours.innerHTML = hours.innerHTML.padStart(2, '0')
        amPM.innerHTML = 'p'
    } else {
        amPM.innerHTML = 'a'
        // instant refresh hours
        hours.innerHTML = new Date().getHours().toString().padStart(2, '0')
    }
}

// switch theme when clicking on switchTheme span
function switchTheme() {
    const body = document.body
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark')
        body.classList.add('theme-light')
        localStorage.removeItem('fsdcTheme')
    } else {
        body.classList.remove('theme-light')
        body.classList.add('theme-dark')
        localStorage.setItem('fsdcTheme', 'theme-dark')
    }
}

// show/hide seconds
function toggleSeconds() {
    const spanToggleSeconds = document.querySelector('[data-toggleSeconds]')
    clock.classList.toggle('no-seconds')
    spanToggleSeconds.innerText === 'hideSeconds'
        ? (spanToggleSeconds.innerText = 'showSeconds')
        : (spanToggleSeconds.innerText = 'hideSeconds')
    if (clock.classList.contains('no-seconds')) {
        localStorage.setItem('fsdcSeconds', 'no-seconds')
    } else {
        localStorage.removeItem('fsdcSeconds')
    }
}
