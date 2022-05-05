const btnsNumbers = document.querySelectorAll('button')
const input = document.querySelector('input')


const funct = () => {
    btnsNumbers.forEach(element => {
        element.addEventListener('click', () => {
            let btn = element.innerHTML
            input.value += btn
        })

    });
}

funct()