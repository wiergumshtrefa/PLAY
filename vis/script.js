const words = {
    animals: ["слон", "тигр", "бегемот", "крокодил"],
    cities: ["Москва", "Париж", "Токио", "Нью-Йорк"],
    movies: ["Аватар", "Титаник", "Бэтмен", "Интерстеллар"]
};

let selectedCategory = 'animals';
let randomWord = '';
let attemptsLeft = 6;
let guessedLetters = [];
let displayWord = [];

// Функция для выбора случайного слова
function selectRandomWord() {
    const wordList = words[selectedCategory];
    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    displayWord = Array(randomWord.length).fill('_');
    updateDisplay();
}

// Функция для обновления отображения
function updateDisplay() {
    document.getElementById('word-container').innerText = displayWord.join(' ');
    document.getElementById('remaining-attempts').innerText = `осталось попыток: ${attemptsLeft}`;
    document.getElementById('hangman-display').innerText = drawHangman(attemptsLeft);
}

// Функция отрисовки виселицы
function drawHangman(attempts) {
    const stages = [
        "  O  \n /|\\ \n / \\ ",
        "  O  \n /|\\ \n /   ",
        "  O  \n /|\\ ",
        "  O  \n /|  ",
        "  O  \n  |  ",
        "  O  ",
        "     "
    ];
    return stages[attempts];
}

// Обработка нажатия на кнопку
document.getElementById('guess-button').addEventListener('click', function() {
    const letterInput = document.getElementById('letter-input');
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (guessedLetters.includes(letter) || letter.length !== 1) return;

    guessedLetters.push(letter);

    if (randomWord.includes(letter)) {
        randomWord.split('').forEach((char, index) => {
            if (char === letter) displayWord[index] = letter;
        });
    } else {
        attemptsLeft--;
    }

    updateDisplay();

    if (displayWord.join('') === randomWord) {
        alert("Вы выиграли!");
    } else if (attemptsLeft === 0) {
        alert(`Вы проиграли! Загаданное слово: ${randomWord}`);
    }
});

// Обработка выбора категории
document.getElementById('category').addEventListener('change', function() {
    selectedCategory = this.value;
    attemptsLeft = 6;
    guessedLetters = [];
    selectRandomWord();
});

// Начальная инициализация
selectRandomWord();