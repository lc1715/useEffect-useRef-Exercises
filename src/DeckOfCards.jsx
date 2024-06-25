import { useState, useEffect } from 'react'

import axios from 'axios'


const DeckOfCards = () => {
    const [deckDataID, setDeckDataID] = useState(null)
    const [cardImage, setCardImage] = useState(null)
    const [isShuffling, setIsShuffling] = useState(false)

    const API_BASE_URL = 'https://deckofcardsapi.com/api/deck'


    useEffect(() => {
        try {
            async function getDeck() {
                const resp = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`)
                setDeckDataID(resp.data.deck_id)
            }
            getDeck()
        } catch (err) {
            console.log('error', err)
        }
    }, [])

    const drawCard = async () => {
        try {
            const resp = await axios.get(`${API_BASE_URL}/${deckDataID}/draw/?count=1`)
            if (resp.data.remaining === 0) alert('Error, no cards remaining!')
            setCardImage(resp.data.cards[0].image)
        }
        catch (err) {
            alert(err)
        } finally {
            setIsShuffling(false)
        }
    }

    const shuffleCards = async () => {
        setIsShuffling(true)
        try {
            await axios.get(`${API_BASE_URL}/${deckDataID}/shuffle/`)
        } catch (err) {
            alert(err)
        }
    }


    return (
        <div>
            <button onClick={drawCard}>Give me a Card!</button>
            {!isShuffling && <img src={cardImage} />}
            {!isShuffling && <button onClick={shuffleCards}>Shuffle Cards</button>}
        </div>
    )

}

export default DeckOfCards;
