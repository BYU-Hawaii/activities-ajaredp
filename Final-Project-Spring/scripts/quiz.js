document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-button');
    const resultContainer = document.getElementById('result-container');

    const quizQuestions = [
        {
            question: "What is the largest planet in our solar system?",
            answers: {
                a: "Earth",
                b: "Jupiter",
                c: "Saturn",
                d: "Mars"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the boiling point of water?",
            answers: {
                a: "50°C",
                b: "100°C",
                c: "150°C",
                d: "200°C"
            },
            correctAnswer: "b"
        },
        {
            question: "Which animal is known as the 'King of the Jungle'?",
            answers: {
                a: "Lion",
                b: "Elephant",
                c: "Tiger",
                d: "Giraffe"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        const output = [];

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length} correct`;
    }

    buildQuiz();
    submitButton.addEventListener('click', showResults);
});
