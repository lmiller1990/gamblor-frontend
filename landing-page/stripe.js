const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
const elements = stripe.elements()
const style = {
  base: {
    fontSize: '16px'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cardNumberElement = elements.create('cardNumber', { style })
  cardNumberElement.mount('#card-number-element')

  const cardExpiryElement = elements.create('cardExpiry', { style })
  cardExpiryElement.mount('#card-expiry-element')

  const cardCvcElement = elements.create('cardCvc', { style })
  cardCvcElement.mount('#card-cvc-element')

  cardNumberElement.addEventListener('change', (obj) => {
    if (obj.error) {
      error(obj.error.message, 'card-errors')
      return
    }

    clearError('card-errors')
  })

  const form = document.getElementById('signup-page-2')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const options = {
      address_zip: document.getElementById('card-postcode-element').value,
    }
    const { token, error } = await stripe.createToken(cardNumberElement)

    if (error) {
      console.log('error', error)
      return
    }

    stripeTokenHandler(token)
  })

  const stripeTokenHandler = async (result) => {
    const token = result.id

    try {
      const response = await fetch('http://localhost:5000/users/pay', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
        })
      })
    } catch (e) {
      console.log('Error paying', e)
    }
  }
})
