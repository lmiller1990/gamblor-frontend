const API_HOST = '/api'

async function signin(evt) {
  evt.preventDefault()

  const form = document.getElementById('signin-form')

  if (!validateEmail(form, '#signin-email')) {
    return
  }

  const email = form.querySelector('#signin-email').value
  const password = form.querySelector('#signin-password').value

  try {
    const response = await fetch(`${API_HOST}/users/sign_in`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (response.status === 403) {
      // wrong
      return error('Email or password incorrect', 'signin-error')
    }

    if (response.status === 200) {
      // ok!
      clearError('signin-error')
      
    }
  } catch (e)  {
    console.log('e', e)
  }
}

function showSigninForm() {
  const page1 = document.getElementById('signup-page-1')
  const page2 = document.getElementById('signup-page-2')
  const signin = document.getElementById('signin-form')
  page1.style.display = "none"
  page2.style.display = "none"
  signin.style.display = "flex"
}

function showPaymentForm() {
  const page1 = document.getElementById('signup-page-1')
  const signin = document.getElementById('signin-form')
  page1.style.display = "none"
  signin.style.display = "none"

  const page2 = document.getElementById('signup-page-2')
  page2.style.display = "flex"
}

function error(err, selector) {
  const el = document.getElementById(selector)
  el.innerText = err
}

function clearError(selector) {
  const el = document.getElementById(selector)
  el.innerText = ''
}

function validateEmail(form, selector) {
  const email = form.querySelector(selector).value

  if (!email.includes('@')) {
    error('Email is invalid', 'error')
    return false
  }

  clearError('error')
  return true
}

function validatePassword(form, selector) {
  const password = form.querySelector(selector).value
  const confirmation = form.querySelector('#password-confirmation').value

  if (password !== confirmation) {
    error('Passwords do not match!', 'error')
    return false
  }

  clearError('error')
  return true
}

async function createAccount(evt) {
  evt.preventDefault()
  clearError('error')
  const form = document.getElementById('signup-page-1')
  if (!validateEmail(form, '#email') || !validatePassword(form, '#password')) {
    return
  }

  const email = form.querySelector('#email').value
  const password = form.querySelector('#password').value

  try {
    const response = await fetch(`${API_HOST}/users/sign_up`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    console.log(response)

    if (response.status === 409) {
      // duplicate
      return error('Email already in use', 'error')
    }

    if (response.status === 201) {
      // ok!
      showPaymentForm()
    }
  } catch (e)  {
    console.log('e', e)
  }
}

function handlePayment(evt) {
  evt.preventDefault()
}
