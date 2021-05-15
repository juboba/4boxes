import { render } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { html } from './services/render'
import { splitEvery } from './utils'
import Card from './components/Card'
import options from './options.json'
import { OptionProvider } from './services/options'
import Config from './components/Config'
import Cards from './components/Cards'

const ROWS = 2

const App = () => {
    const [page, setPage] = useState('config')

    const goToCards = (e) => {
        e.stopPropagation()
        setPage('cards')
    }

    const goToConfig = (e) => {
        e.stopPropagation()
        setPage('config')
    }

    if (page === 'config') {
        return html `
                <${OptionProvider}>
                    <${Config} onBack=${goToCards}/>
                </${OptionProvider}>
                `
    }

    return html `<${OptionProvider}>
                    <button class="button" onClick=${goToConfig}>Opciones</button>
                    <${Cards}/>
                 </${OptionProvider}>`
}

render(html `<${App} />`, document.querySelector('#app'))
