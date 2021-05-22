import { useRef, useState } from 'preact/hooks'
import { html } from '../services/render'
import { splitEvery } from '../utils'
import Card from './Card'
import useCycleClick from '../hooks/useCycleClick'
import { useConfig } from '../services/options'

const Cards = () => {
    const { options: cards, timeout } = useConfig()
    const history = useRef([])

    const { active } = useCycleClick((index) => {
        if (cards[index]) {
            alert(`Escogió: ${cards[index].text}`)
        }

    }, cards.length, timeout)

    return html `<div class="container">
                     ${cards.map((card, index) => {
                                return html `<${Card}
                                               active="${index === active}"
                                               image="${card.imageUrl}">
                                                 ${card.text}
                                             </${Card}>` })}
                    </div>`
}

export default Cards
