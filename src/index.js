const keyboard = document.querySelector('#keyboard');
const keyboardLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
];

const listElements = [];
const myAnswer = [];
const secretWord = ['p','l','a','t','z','i'];
const alerta = document.querySelector('#alert');
let positions = [];

const pressLetter = () => {
    const button = event.target;
    if (myAnswer.length < 6) {
        myAnswer.push(button.id);
    } else {
        alerta.textContent = "Ya elegiste 6 letras";
    }
};

const checkWord = () => {
    if (myAnswer.length < 6) {
        alerta.textContent = "Debes completar una palabra";
    } else if (myAnswer.join('') === secretWord.join('')) {
        alerta.textContent = "Haz completado la palabra!";
    } else {
        for(let i = 0; i < 6; i++) {
            switch (true) {
                case myAnswer[i] === secretWord[i]:
                    positions.push('green');
                    break;
                case secretWord.includes(myAnswer[i]):
                    positions.push('yellow');
                    break;
                default:
                    positions.push('gray');
            }
        }
    }
};

const deleteLetter = () => {
    if (myAnswer.length > 0) {
        myAnswer.pop();
    } else {
        alerta.textContent = "No tienes nada escrito";
    }
};

keyboardLetters.map((letters => {
    const list = document.createElement('ul');
    list.classList.add('keyboard__list');
    letters.map((letter) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.id = letter;
        button.textContent = letter;
        switch (letter) {
            case "enter":
                button.onclick = checkWord;
                break;
            case "del":
                button.onclick = deleteLetter;
                break;
            default:
                button.onclick = pressLetter;
        }
        button.classList.add('keyboard__button');
        listItem.appendChild(button);
        list.appendChild(listItem);
    });
    listElements.push(list);
}));

keyboard.append(...listElements);