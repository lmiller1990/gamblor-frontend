function showPaymentForm() {
  const page1 = document.getElementById('signup-page-1')
  page1.style.display = "none"

  const page2 = document.getElementById('signup-page-2')
  page2.style.display = "block"
}

function error(err) {
  const el = document.getElementById('error')
  el.innerText = err
}

function clearError() {
  const el = document.getElementById('error')
  el.innerText = ''
}

function validateEmail(form) {
  const email = form.querySelector('#email').value

  if (!email.includes('@')) {
    error('Email is invalid')
    return false
  }

  clearError()
  return true
}

function validatePassword(form) {
  const password = form.querySelector('#password').value
  const confirmation = form.querySelector('#password-confirmation').value

  if (password !== confirmation) {
    error('Passwords do not match!')
    return false
  }

  clearError()
  return true
}

async function createAccount(evt) {
  evt.preventDefault()
  clearError()
  const form = document.getElementById('signup-page-1')
  if (!validateEmail(form) || !validatePassword(form)) {
    return
  }

  const email = form.querySelector('#email').value
  const password = form.querySelector('#password').value

  try {
    const response = await fetch('http://localhost:5000/users/sign_up', {
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
      return error('Email already in use')
    }

    if (response.status === 201) {
      // ok!
      showPaymentForm()
    }
  } catch (e)  {
    console.log('e', e)
  }
}
