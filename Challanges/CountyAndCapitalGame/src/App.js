import { gameData } from './gameData';
import { useState } from 'react';

export default function App() {
    return <CountryCapitalGame data={gameData} />;
}

function CountryCapitalGame({ data }) {
    let nrOfButtons = Object.keys(data).length * 2;
    let arr = [];
    for (let i = 0; i < nrOfButtons; i++) arr.push(i);
    let shuffledArr = [];
    while (nrOfButtons > 0) {
        const randomPosition = Math.floor(Math.random() * nrOfButtons);
        shuffledArr.push(arr[randomPosition]);
        let arrCopy = arr;
        arr = arr.filter((number) => number !== arrCopy[randomPosition]);
        nrOfButtons--;
    }
    // Adapted Fisher–Yates shuffle algorithm for a random order of countries and capitals

    let items = [];
    let j = 0;
    const countries = Object.keys(data);
    const capitals = Object.values(data);
    for (let i = 0; i < countries.length * 2; i++) {
        let value = '';
        if (i % 2 === 0) {
            value = countries[j];
        } else {
            value = capitals[j];
        }
        const newItem = {
            value: value,
            isVisible: true,
            isSelected: 0,
            id: shuffledArr[i],
            pairId: j,
        };
        items = [...items, newItem];
        if (i % 2 === 1) j++;
    }

    items.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
    const [gameButton, setGameButton] = useState(items);
    const [showMessage, setShowMessage] = useState(false);

    function handleClick(id) {
        let buttonOne = false;
        let buttonOneId = -1;
        let buttonOnePairId = -1;
        gameButton.forEach((item) => {
            if (item.isSelected === 1) {
                buttonOne = true;
                buttonOneId = item.id;
                buttonOnePairId = item.pairId;
            }
        });

        if (buttonOne) {
            if (buttonOneId === id) {
                setGameButton(
                    gameButton.map((item) =>
                        item.id === id ? { ...item, isSelected: 0 } : item
                    )
                );
                // pressing the same button twice
            } else {
                let correctPair = true;
                gameButton.forEach((item) => {
                    if (item.id === id && item.pairId !== buttonOnePairId)
                        correctPair = false;
                });

                if (correctPair) {
                    setGameButton(
                        gameButton.map((item) =>
                            item.id === id || item.id === buttonOneId
                                ? { ...item, isVisible: false, isSelected: 0 }
                                : item
                        )
                    );
                    // correct pair was selected and therefor it won't get rendered anymore
                    let visButtons = 0;
                    gameButton.forEach((item) => {
                        if (item.isVisible) visButtons++;
                    });
                    console.log(visButtons);
                    if (visButtons === 2) setShowMessage(true);
                    // sets the congratulation message to true
                } else {
                    setGameButton(
                        gameButton.map((item) =>
                            item.id === id || item.id === buttonOneId
                                ? { ...item, isSelected: 2 }
                                : item
                        )
                    );
                    // incorrect pair was selected so the background color gets changed to red
                }
            }
        } else {
            setGameButton(
                gameButton.map((item) =>
                    item.id === id
                        ? { ...item, isSelected: 1 }
                        : item.isSelected === 2
                        ? { ...item, isSelected: 0 }
                        : item
                )
            );
            // changes the style of current and previously selected buttons
        }
    }

    return (
        <div className="main-div">
            <div className="header-div">
                <Header showMessage={showMessage} />
            </div>
            <div className="buttons-div">
                <ul>
                    {gameButton.map((item) => (
                        <Button
                            data={item}
                            handleClick={handleClick}
                            key={item.id}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Header({ showMessage }) {
    if (showMessage) return <p>Congratulations! You have finished the game.</p>;
    return (
        <>
            <p>Welcome to the country game!</p>
            <p>
                It's time to test your geography skills. Click the countries and
                capitals.
            </p>
        </>
    );
}

function Button({ data, handleClick }) {
    if (data.isVisible)
        return (
            <li>
                <button
                    className={`${
                        data.isSelected === 1
                            ? 'button-selected'
                            : data.isSelected === 2
                            ? 'button-incorrect'
                            : 'button-unselected'
                    }`}
                    onClick={() => handleClick(data.id)}
                >
                    {data.value}
                </button>
            </li>
        );
    else return;
}
