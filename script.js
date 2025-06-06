document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Quiz Logic
    const questions = [
        {
            question: "Choose the correct tense: 'She _______ to school every day.'",
            options: [
                "go",
                "goes",
                "is going",
                "went"
            ],
            answer: "goes",
            explanation: "This is Present Simple for a regular habit. 'She' takes 'goes'."
        },
        {
            question: "Identify the tense: 'They are playing football now.'",
            options: [
                "Present Simple",
                "Present Continuous",
                "Present Perfect",
                "Past Simple"
            ],
            answer: "Present Continuous",
            explanation: "The structure 'are + verb-ing' indicates an action happening now."
        },
        {
            question: "Which tense describes an action that started in the past and is still continuing now?",
            options: [
                "Past Simple",
                "Present Perfect",
                "Present Perfect Continuous",
                "Future Simple"
            ],
            answer: "Present Perfect Continuous",
            explanation: "Present Perfect Continuous (e.g., 'I have been studying for hours') emphasizes duration up to now."
        },
        {
            question: "Choose the correct tense: 'I _______ my homework last night.'",
            options: [
                "do",
                "did",
                "have done",
                "will do"
            ],
            answer: "did",
            explanation: "The phrase 'last night' indicates a completed action in the past, so Past Simple is correct."
        },
        {
            question: "Identify the tense: 'By next year, I will have finished my degree.'",
            options: [
                "Future Simple",
                "Future Continuous",
                "Future Perfect",
                "Future Perfect Continuous"
            ],
            answer: "Future Perfect",
            explanation: "Future Perfect ('will have + past participle') describes an action that will be completed by a certain time in the future."
        },
        {
            question: "Which tense is used for general truths and facts?",
            options: [
                "Present Continuous",
                "Present Simple",
                "Past Simple",
                "Future Simple"
            ],
            answer: "Present Simple",
            explanation: "Present Simple is used for facts, habits, and general truths (e.g., 'The sun rises in the east')."
        },
        {
            question: "Choose the correct tense: 'While she _______, her phone rang.'",
            options: [
                "was cooking",
                "cooked",
                "is cooking",
                "will cook"
            ],
            answer: "was cooking",
            explanation: "Past Continuous ('was/were + verb-ing') describes an ongoing action in the past that was interrupted by another past action."
        },
        {
            question: "Identify the tense: 'He had already left when I arrived.'",
            options: [
                "Past Simple",
                "Past Continuous",
                "Past Perfect",
                "Present Perfect"
            ],
            answer: "Past Perfect",
            explanation: "Past Perfect ('had + past participle') describes an action that was completed before another action in the past."
        },
        {
            question: "Which tense describes an action that will be in progress at a specific time in the future?",
            options: [
                "Future Simple",
                "Future Continuous",
                "Future Perfect",
                "Present Continuous"
            ],
            answer: "Future Continuous",
            explanation: "Future Continuous ('will be + verb-ing') focuses on an action that will be ongoing at a future point."
        },
        {
            question: "Choose the correct tense: 'They _______ to Vientiane tomorrow.'",
            options: [
                "go",
                "went",
                "are going",
                "have gone"
            ],
            answer: "are going",
            explanation: "Present Continuous can be used for future plans, especially when scheduled or arranged ('be going to' is also common, but 'are going' works here for a definite plan)."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizResults.style.display = 'none';
        quizContainer.style.display = 'block';
        totalQuestionsSpan.textContent = questions.length; // Set total questions display
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <ul class="quiz-options">
                        ${q.options.map(option => `<button>${option}</button>`).join('')}
                    </ul>
                    <div class="feedback"></div>
                    <button id="next-question-btn" style="display:none;">ຄຳຖາມຕໍ່ໄປ</button>
                </div>
            `;
            const optionButtons = quizContainer.querySelectorAll('.quiz-options button');
            optionButtons.forEach(button => {
                button.addEventListener('click', selectAnswer);
            });
        } else {
            showResults();
        }
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const userAnswer = selectedButton.textContent;
        const currentQuestion = questions[currentQuestionIndex];
        const feedbackDiv = quizContainer.querySelector('.feedback');
        const nextBtn = document.getElementById('next-question-btn');
        const optionButtons = quizContainer.querySelectorAll('.quiz-options button');

        // Disable all option buttons after an answer is selected
        optionButtons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuestion.answer) {
                button.classList.add('correct'); // Highlight correct answer
            } else {
                button.classList.add('wrong'); // Highlight wrong answers
            }
        });

        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackDiv.textContent = "ຖືກຕ້ອງ! 👍";
            feedbackDiv.classList.remove('wrong');
            feedbackDiv.classList.add('correct');
        } else {
            feedbackDiv.textContent = `ຜິດ! ຄຳຕອບທີ່ຖືກຕ້ອງແມ່ນ: "${currentQuestion.answer}". ${currentQuestion.explanation}`;
            feedbackDiv.classList.remove('correct');
            feedbackDiv.classList.add('wrong');
        }
        nextBtn.style.display = 'block'; // Show next question button
        nextBtn.addEventListener('click', nextQuestion);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function showResults() {
        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
        scoreSpan.textContent = score;
    }

    // Initial load: show start button
    quizContainer.innerHTML = `
        <p>ກົດປຸ່ມ "ເລີ່ມທົດສອບ" ເພື່ອເລີ່ມຕົ້ນ!</p>
        <button id="start-quiz-btn">ເລີ່ມທົດສອບ</button>
    `;
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
});
