import { render } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { html } from './services/render'
import { splitEvery } from './utils'
import Box from './components/Box'
import useCycleClick from './hooks/useCycleClick'
import options from './options.json'

const ROWS = 2

const App = () => {
    const [boxes, setBoxes] = useState(options)
    const history = useRef([])
    const hasBack = boxes !== options

    const { active } = useCycleClick((index) => {
        if (!boxes[index]) {
            const head = history.current.pop()
            setBoxes(head ? head : options)
            return
        }

        console.log('Escogió:', boxes[index].text)

        if (boxes[index].options){
            history.current.push(boxes)
            setBoxes(boxes[index].options)
        }
    }, hasBack ? boxes.length + 1 : boxes.length, 0.9)

    return html `<div class="container">
                    ${splitEvery(ROWS, boxes).map(row => html `
                        <div class="row">
                            ${row.map(box => {
                                return html `<${Box}
                                               active="${box.index === active}"
                                               image="${box.image}">
                                                 ${box.text}
                                             </${Box}>` })}
                        </div>
                    `)}
                    ${
                    hasBack && html`
                                    <div class="row">
                                        <${Box} active="${boxes.length === active}">
                                        Volver
                                        </${Box}>
                                    </div>
                        `
                    }
                 </div>`
}

render(html `<${App} />`, document.querySelector('#app'))
