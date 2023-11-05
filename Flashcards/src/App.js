import { useEffect, useState } from 'react';

export default function App() {
    const [totalFlashcards, setTotalFlashcards] = useState([0, 0]);
    // number of total flashcards, number of clicks to check answers
    const [flashcards, setFlashcards] = useState([]);

    function handleFlashcards(newFlashcard) {
        setTotalFlashcards([totalFlashcards[0] + 1, totalFlashcards[1]]);
        setFlashcards((flashcards) => [...flashcards, newFlashcard]);
        // old flashcards are kept in the same order, the new one being added at the end
    }

    function handleDeleteFlashcard(id) {
        setFlashcards((flashcards) =>
            flashcards.filter((flashcard) => flashcard.id !== id)
        );
        setTotalFlashcards([totalFlashcards[0] - 1, totalFlashcards[1]]);
    }

    function handleClick(id) {
        flashcards.forEach((flashcard) => {
            if (flashcard.id !== id && flashcard.showAnswer) {
                flashcard.showAnswer = false;
            } else if (flashcard.id === id) {
                console.log('Schimb valoarea' + Date.now());
                flashcard.showAnswer = !flashcard.showAnswer;
                if (flashcard.showAnswer)
                    setTotalFlashcards([
                        totalFlashcards[0],
                        totalFlashcards[1] + 1,
                    ]);
                else
                    setTotalFlashcards([
                        totalFlashcards[0],
                        totalFlashcards[1],
                    ]);
            }
        });
    }
    // function for increasing number of answers shown as well as unflipping previous flashcard if necessary

    return (
        <div className="main-div">
            <div className="header-div">
                <div className="logo-form-div">
                    <Logo />
                    <Form onAddFlashcard={handleFlashcards} />
                </div>
                <Stopwatch />
            </div>
            <div className="body-div">
                <FlashcardsList
                    flashcards={flashcards}
                    onDeleteFlashcard={handleDeleteFlashcard}
                    handleClick={handleClick}
                />
            </div>
            <Stats totalFlashcards={totalFlashcards} />
        </div>
    );
}

function Form({ onAddFlashcard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // prevents the page from reloading on submitting form
        if (!answer || !question) return;
        const newFlashcard = {
            question,
            answer,
            showAnswer: false,
            id: Date.now(),
        };
        onAddFlashcard(newFlashcard);
        setAnswer('');
        setQuestion('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <p className="input-emoji">❔</p>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                ></input>
            </div>
            <div className="input-group">
                <p className="input-emoji">🗣</p>
                <input
                    type="text"
                    placeholder="Answer "
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></input>
            </div>
            <button className="add-button">Add</button>
        </form>
    );
}

function Logo() {
    return <p className="logo-p">📚 HARD WORK MATTERS 📚</p>;
}

function Stopwatch() {
    const [time, setTime] = useState([0, 0, 0]);
    const [buttonText, setButtonText] = useState('Start');
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerActive) {
                let seconds = time[2] + 1;
                let minutes = time[1];
                let hours = time[0];
                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }
                if (minutes === 60) {
                    hours++;
                    minutes = 0;
                }
                setTime([hours, minutes, seconds]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive, time]);

    function handleResetButton() {
        setTime([0, 0, 0]);
        setButtonText('Start');
        setTimerActive(false);
    }

    function handleStartButton() {
        if (buttonText === 'Start' || buttonText === 'Resume') {
            setButtonText('Pause');
            setTimerActive(true);
        } else if (buttonText === 'Pause') {
            setButtonText('Resume');
            setTimerActive(false);
        }
    }

    return (
        <div className="timer-div">
            <p>
                {time[0] < 10 ? `0${time[0]}` : `${time[0]}`}:
                {time[1] < 10 ? `0${time[1]}` : `${time[1]}`}:
                {time[2] < 10 ? `0${time[2]}` : `${time[2]}`}
            </p>
            <div className="timer-buttons-div">
                <button className="add-button" onClick={handleStartButton}>
                    {buttonText}
                </button>
                <button
                    className="add-button button-margin"
                    onClick={handleResetButton}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

function FlashcardsList({ flashcards, onDeleteFlashcard, handleClick }) {
    return (
        <div className="list">
            <ul>
                {flashcards.map((flashcard) => (
                    <Flashcard
                        flashcard={flashcard}
                        onDeleteFlashcard={onDeleteFlashcard}
                        handleClick={handleClick}
                        key={flashcard.id}
                    />
                ))}
            </ul>
        </div>
    );
}

function Flashcard({ flashcard, onDeleteFlashcard, handleClick }) {
    function flipFlashcard() {
        handleClick(flashcard.id);
    }

    return (
        <li>
            <div
                className={`flascard-div ${
                    flashcard.showAnswer ? 'flipped-flashcard' : ''
                }`}
                onClick={flipFlashcard}
            >
                {flashcard.showAnswer ? flashcard.answer : flashcard.question}
            </div>
            <button
                className="delete-button"
                onClick={() => onDeleteFlashcard(flashcard.id)}
            >
                X
            </button>
        </li>
    );
}

function Stats({ totalFlashcards }) {
    return (
        <footer className="stats">
            <p>
                You have a total of {totalFlashcards[0]}{' '}
                {totalFlashcards[0] === 1 ? 'flashcard' : 'flashcards'} and you
                have checked the answer
                {` ${totalFlashcards[1]}`}{' '}
                {totalFlashcards[1] === 1 ? 'time' : 'times'}
            </p>
        </footer>
    );
}
