const questions = [
	{
		question: 'Какой язык работает в браузере?',
		answers: ['Java', 'C', 'Python', 'JavaScript'],
		correct: 4,
	},
	{
		question: 'Что означает CSS?',
		answers: [
			'Central Style Sheets',
			'Cascading Style Sheets',
			'Cascading Simple Sheets',
			'Cars SUVs Sailboats',
		],
		correct: 2,
	},
	{
		question: 'Что означает HTML?',
		answers: [
			'Hypertext Markup Language',
			'Hypertext Markdown Language',
			'Hyperloop Machine Language',
			'Helicopters Terminals Motorboats Lamborginis',
		],
		correct: 1,
	},
	{
		question: 'В каком году был создан JavaScript?',
		answers: ['1996', '1995', '1994', 'все ответы неверные'],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listConrainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listConrainer.innerHTML = '';
}

function showQuestion() {
	// Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace(
		'%title%',
		questions[questionIndex]['question']
	);
	headerContainer.innerHTML = title;

	// Варианты ответов
	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = `
            <li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
        `;
		// let answerHTML = questionTemplate.replace('%answer%', answerText);
		// answerHTML = answerHTML.replace('%number%', index + 1)

		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', index + 1);
		listConrainer.innerHTML += answerHTML;
	}
}

function checkAnswer() {
	const checkedRadio = listConrainer.querySelector(
		'input[type="radio"]:checked'
	);

	// Если ответ не выбран - ничего не делаем, выходим из функции
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	// Узнаем номер ответа пользователя
	const userAnswer = +checkedRadio.value;

	// Если ответ верен - увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;
	let title, message;
	if (score === questions.length) {
		title = 'Поздравляем  👏';
		message = 'Вы ответили верно на все вопросы  👍';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постораться';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	// Результат
	let result = `${score} из ${questions.length}`;

    // Финальный ответ, подставляем данные в шаблон
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

    // Меняем кнопку на 'Начать заново'
    submitBtn.blur();
    submitBtn.innerHTML = 'Начать заново'
    submitBtn.onclick = () => history.go();
    console.log(history);
}
