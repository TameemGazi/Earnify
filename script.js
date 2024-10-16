document.getElementById('startBtn').addEventListener('click', () => {
    window.scrollTo({
        top: document.getElementById('questions').offsetTop,
        behavior: 'smooth'
    });
});

let totalEarned = 0;
let currentQuestionIndex = 0;

// Array of questions and answers
const questions = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the square root of 144?', answer: '12' },
    { question: 'Who wrote "Hamlet"?', answer: 'Shakespeare' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'How many continents are there?', answer: '7' },
    { question: 'What is the boiling point of water?', answer: '100' },
    { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
    { question: 'What is the chemical symbol for gold?', answer: 'Au' },
    { question: 'What year did World War II end?', answer: '1945' },
    { question: 'What is the smallest prime number?', answer: '2' },
    { question: 'What is the capital of Japan?', answer: 'Tokyo' }
];

// Function to display the next question
function displayQuestion() {
    const questionContainer = document.getElementById('questionsContainer');
    questionContainer.innerHTML = '';  // Clear the container for the new question

    if (currentQuestionIndex < questions.length) {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';

        const questionText = document.createElement('p');
        questionText.textContent = questions[currentQuestionIndex].question;
        questionCard.appendChild(questionText);

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Your Answer';
        inputField.id = 'answerInput';
        questionCard.appendChild(inputField);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-answer';
        submitBtn.textContent = 'Submit Answer';
        submitBtn.addEventListener('click', checkAnswer);
        questionCard.appendChild(submitBtn);

        questionContainer.appendChild(questionCard);
    } else {
        displayThankYouMessage();
    }
}

// Function to check the answer and move to the next question
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;
    const feedback = document.createElement('p');
    feedback.style.marginTop = '10px';

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.textContent = 'Correct! You earned 10 tokens.';
        feedback.style.color = 'green';
        totalEarned += 10;
        document.getElementById('totalEarned').textContent = totalEarned;
    } else {
        feedback.textContent = 'Incorrect answer. Try again!';
        feedback.style.color = 'red';
        document.querySelector('.question-card').appendChild(feedback);
        return;  // Don't move to the next question if the answer is incorrect
    }

    // Move to the next question after a delay
    currentQuestionIndex++;
    setTimeout(displayQuestion, 1000);  // Display next question after 1 second
}

// Function to display the thank you message after all questions are answered
function displayThankYouMessage() {
    const questionContainer = document.getElementById('questionsContainer');
    questionContainer.innerHTML = '';  // Clear the container

    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'thank-you-card';
    thankYouMessage.innerHTML = `
        <h2>Thank You!</h2>
        <p>You have completed all the questions. Your total earnings: ${totalEarned} Tokens.</p>
    `;

    questionContainer.appendChild(thankYouMessage);
}

// Start by displaying the first question
displayQuestion();
