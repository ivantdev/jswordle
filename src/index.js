const keyboard = document.querySelector('#keyboard');
const grid = document.querySelector('#grid');
const keyboardLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
];

const listElements = [];
let myAnswer = [];
const secretWord = ['p','l','a','t','z','i'];
const divAlert = document.querySelector('#alert');
let positions = [];
let attemps = 0;

const pressLetter = () => {
    const button = event.target;
    if (myAnswer.length < 6) {
        const currentItem = document.getElementById(`${attemps}-${myAnswer.length}`);
        myAnswer.push(button.id);
        currentItem.textContent = button.textContent;
    } else {
        divAlert.textContent = "Ya elegiste 6 letras";
    }
};

const rows = []
for(let row = 0; row < 5; row++) {
    const list = document.createElement('ul');
    list.classList.add('grid__row');
    for(let column = 0; column < 6; column++) {
        const listItem = document.createElement('li');
        listItem.classList.add('row__item');
        listItem.id = `${row}-${column}`;
        list.appendChild(listItem);
        rows.push(list);
    }
}

grid.append(...rows);

const checkWord = () => {
    if(positions.every((item) => item === "green") && positions.length > 0) {
        divAlert.textContent = "YA GANASTE!";
        return;
    }
    if (attemps === 5) {
        divAlert.textContent = "Ya no tienes intentos";
        return;
    }
    if (myAnswer.length < 6) {
        divAlert.textContent = "Debes completar una palabra";
    } else {
        attemps++;
        for(let i = 0; i < 6; i++) {
            const letter = document.getElementById(`${myAnswer[i]}`);
            switch (true) {
                case myAnswer[i] === secretWord[i]:
                    positions.push('green');
                    letter.classList.add('green');
                    break;
                case secretWord.includes(myAnswer[i]):
                    positions.push('yellow');
                    letter.classList.add('yellow');
                    break;
                default:
                    positions.push('gray');
                    letter.classList.add('key-gray');
            }
        }
        positions.map((color, id) => {
            const item = document.getElementById(`${attemps - 1}-${id}`);
            item.classList.add(color);
        });
        if (positions.every((position) => position === "green")) {
            divAlert.textContent = "Completaste la palabra!";
        }else {
            myAnswer = [];
            positions = [];
        }
    }
};

const deleteLetter = () => {
    if (myAnswer.length > 0) {
        const item = document.getElementById(`${attemps}-${myAnswer.length - 1}`);
        item.textContent = "";
        myAnswer.pop();
    } else {
        divAlert.textContent = "No tienes nada escrito";
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