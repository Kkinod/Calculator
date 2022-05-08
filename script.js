const numbers = document.querySelectorAll('.calculator__numbers-btn')
const operators = document.querySelectorAll('.calculator__operators-btn')
const backspace = document.querySelector('.calculator__backspace-btn')
const deleteLastNumber = document.querySelector('.calculator__del-last-btn')
const deleteAll = document.querySelector('.calculator__del-all-btn')
const equals = document.querySelector('.calculator__equals-btn')
const negativePositive = document.querySelector('.calculator__negative-btn')
const previousAction = document.querySelector('.calculator__action-previous')
const currentAction = document.querySelector('.calculator__action-current')

let currentResult = ''
let previousResult = ''
let action = undefined

const calculate = () => {
	let currentOperation
	if (!previousResult || !currentResult) {
		return
	}

	const previous = parseFloat(previousResult)
	const current = parseFloat(currentResult)

	if (isNaN(previous) || isNaN(current)) {
		return
	}

	switch (action) {
		case '+':
			currentOperation = previous + current
			break
		case '-':
			currentOperation = previous - current
			break
		case '×':
			currentOperation = previous * current
			break
		case '/':
			if (current === 0) {
				allDelete()
				return
			}
			currentOperation = previous / current
			break
		case '√':
			currentOperation = Math.pow(previous, 1 / current)
			break
		case '%':
			currentOperation = (previous / 100) * current
			break
		case 'x²':
			currentOperation = Math.pow(previous, current)
			break
		case 'log':
			currentOperation = Math.log(previous) / Math.log(current)
			break

		default:
			return
	}
	currentResult = currentOperation
	action = undefined
	previousResult = ''
}

const result = () => {
	currentAction.innerText = currentResult
	if (action != undefined) {
		previousAction.innerText = previousResult + action
	} else {
		previousAction.innerText = ''
	}
}

const actions = operation => {
    const resultPrevious = previousAction.innerText
	if (currentResult === '') {
		return
	// } else if (currentResult.toString() === '0' && resultPrevious[resultPrevious.length-1] === '/') {
	// 	allDelete()
    //     console.log(resultPrevious);
	// 	return
	} else if (previousResult !== '') {
		calculate()
        
	} else {
		action = operation
		previousResult = currentResult
		currentResult = ''
	}
}

const addNumber = number => {
	// zabezpieczenie by nie dodawać kolejnej kropki
	if (number === '.') {
		if (currentResult.includes('.')) {
			return
		}
		// ---------------------------------------------
	}
	currentResult = currentResult.toString() + number.toString()
}

numbers.forEach(number => {
	number.addEventListener('click', () => {
		addNumber(number.innerText)
		result()
	})
})

// usuwanie ostatniej cyfry
const LastNumberDelete = () => {
	currentResult = currentResult.toString().slice(0, -1)
	result()
}

// usuwanie wszystkiego
const allDelete = () => {
	currentResult = ''
	previousResult = ''
	action = undefined
	result()
}

equals.addEventListener('click', () => {
	calculate()
	result()
})

operators.forEach(operator => {
	operator.addEventListener('click', () => {
		actions(operator.innerText)
		result()
	})
})

backspace.addEventListener('click', LastNumberDelete)
deleteAll.addEventListener('click', allDelete)

// TEST with drag & drop

const root = document.querySelector("#element");

document.addEventListener("drop", (event)=>{
    root.style.left = event.pageX + "px";
    root.style.top = event.pageY + "px";
})

  document.addEventListener("dragover", function( event ) {
 
      event.preventDefault();
  }, false);

// add to html: ID, and class: mover and dropzone
// add to CSS: .calculator -> position: absolute
// --------------

/* Wciąż do zrobienia:
- zmienić tak by wszystko ładowało się dopiero po załadowaniu całego DOM
- naprawić sytację: jeśli dzielimy 0 przez cokolwiek to na wyniku nie da się pracować, tzn. jeśli na wyniku spróbujemy zrobić jakiekolwiek działanie, np. +3, to po wpisaniu +3 wszelkie działania będa zablokowane
- pierwsze zero można wielokrotnie wpisywać
- do wyniku można dopisywać cyfry
- i kilka innycch
*/
