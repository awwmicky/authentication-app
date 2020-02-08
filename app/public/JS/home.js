$(() => {
/*  */
console.log('home page')

const $loginBtn = $('.sign-in-btn');
const $registerBtn = $('.sign-up-btn');
const $dashboardBtn = $('.dashboard-btn');

$loginBtn.on('click', e => {
    window.location.replace('/login')
})

$registerBtn.on('click', e => {
    window.location.replace('/register')
})

$dashboardBtn.on('click', e => {
    window.location.replace('/dashboard')
})
/*  */
})