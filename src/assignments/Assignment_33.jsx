import { button } from 'framer-motion/client';
import { useEffect, useRef, useState } from 'react';
import './Assignment_33.css'
import cardData from './Assignment_33.json';

export default function Assignment_33() {
    const [options, setOptions] = useState([]);
    const [cards, setCards] = useState([]);
    const [flip, setFlip] = useState([]);
    const [selected, setSelected] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matched, setMatched] = useState([]);


    useEffect(() => {
        setOptions([
            '☘️ Nature', '🍔 Foods', '🐹 Animals', '🍧 Dessert'
        ]);
        handleOptions('☘️ Nature');
    }, []);


    const handleOptions = (option) => {
        setSelected(option);

        const cleanLabel = option.replace(/^[^\w]+/, '').trim();
        const filtered = cardData.find(card => card.label.toLowerCase() === cleanLabel.toLowerCase());

        if (!filtered) return;

        const repeat = Array(2).fill(filtered.items).flat();
        
        const shuffled = repeat
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        setCards(shuffled);
        setFlip(Array(shuffled.length).fill(false));

    }

    const handleClick = (index) => {
        if (flip[index] || flippedIndices.includes(index)) return;

        const newFlipped = [...flippedIndices, index];

        setFlip(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first] === cards[second]) {
                setMatched(prev => [...prev, cards[first]]);
                setFlippedIndices([]);
            } else {
                setTimeout(() => {
                    setFlip(prev => {
                        const updated = [...prev];
                        updated[first] = false;
                        updated[second] = false;
                        return updated;
                    })
                    setFlippedIndices([]);
                }, 700);
            }
        }
    }


    return (
        <div>
            <div className="container">

                <div
                    className="options"
                >
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={'option'}
                            onClick={() => handleOptions(option)}
                            data-selected={selected === option ? "true" : "false"}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="board">
                    {cards.map((card, index) => (
                        <div
                            className={`card ${flip[index] ? 'flip' : ''}`}
                            onClick={() => handleClick(index)}
                            key={index}
                            style={{ pointerEvents: matched.includes(cards[index]) ? 'none' : 'auto' }}
                        >
                            <div className="card-inner">
                                <div className='card-back' data-flip="false"></div>
                                <div
                                    className='card-front'
                                    data-flip="true"
                                    data-matched={matched.includes(cards[index]) ? "true" : "false"}
                                >{card}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}