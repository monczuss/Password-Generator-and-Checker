const checkButton = document.querySelector('[data-check]')
const generateButton = document.querySelector('[data-generate]')
const copyButton = document.querySelector('[data-copy]')
const numberInput = document.querySelector('input[type="number"]')
const checkInput = document.querySelector('input[type="checkbox"]')
const passInput = document.querySelector('input[type="password"]')
const infoPass = document.querySelector('[data-infoPass]')
const infoGenerate = document.querySelector('[data-infoGenerate]')

const errorMessage = 'Brak hasła, wpisz coś!'
const minMessage = 'Hasło powinno mieć przynajmniej 8 znaków!'
const noCharactersMessage = 'Dobre hasło, ale dopisz jakiś znak specjalny'
const goodMessage = 'Bardzo dobre hasło, jesteś bezpieczny!'
const regex = '[!@#$%^&*().<>?/]'

let generatePassword = ''

const checkPassword = () => {
	if (passInput.value.length > 7 && passInput.value.match(regex)) {
		infoPass.textContent = `${goodMessage}`
		infoPass.style.color = 'rgb(34 197 94)'
	} else if (passInput.value.length > 7) {
		infoPass.textContent = `${noCharactersMessage} ${regex} `
		infoPass.style.color = 'rgb(250 204 21)'
	} else if (passInput.value.length <= 7 && passInput.value.length > 0) {
		infoPass.textContent = `${minMessage}`
		infoPass.style.color = 'rgb(251 146 60)'
	} else {
		infoPass.textContent = `${errorMessage}`
		infoPass.style.color = 'rgb(239 68 68)'
	}
}

const randomPassword = () => {
	if (numberInput.value >= 5 && numberInput.value <= 40) {
		const regexAlpaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const regexSpecial = '!.?@#$%<>^&*()'
		let regex = ''
		let passwordLength = numberInput.value
		let genPassword = ''
		if (checkInput.checked) {
			regex = regexAlpaNumeric + regexSpecial
		} else {
			regex = regexAlpaNumeric
		}
		for (let i = 0; i <= passwordLength; i++) {
			let randomNumber = Math.floor(Math.random() * regex.length)
			genPassword += regex.substring(randomNumber, randomNumber + 1)
		}
		infoGenerate.style.color = 'rgb(250 250 250)'
		infoGenerate.textContent = genPassword
		generatePassword = genPassword
	} else {
		infoGenerate.style.color = 'rgb(251 146 60)'
		infoGenerate.textContent = 'Wpisz minimalna długość hasła 5, maksymalna 40.'
	}
	return generatePassword
}

const copyFunction = () => {
	if (numberInput.value >= 5 && numberInput.value <= 40) {
		if (generatePassword == 0) {
			infoGenerate.style.color = 'rgb(251 146 60)'
			infoGenerate.textContent = 'Wygeneruj hasło!'
		} else {
			let range = document.createRange()
			range.selectNode(infoGenerate)
			window.getSelection().removeAllRanges()
			window.getSelection().addRange(range)
			document.execCommand('copy')
			window.getSelection().removeAllRanges()
			infoGenerate.textContent = 'Skopiowano!'
		}
	} else {
		infoGenerate.textContent = 'Nie wygenerowano jeszcze hasła!'
	}
}

checkButton.addEventListener('click', checkPassword)
generateButton.addEventListener('click', randomPassword)
copyButton.addEventListener('click', copyFunction)
