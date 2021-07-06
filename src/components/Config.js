import { html } from '../services/render'
import { useState } from 'preact/hooks'
import { useConfig } from '../services/options'

const emptyState = {
    imageUrl: '',
    url: '',
    text: ''
}

const truncateAt = length => string => string.length > length ? `${string.slice(0, length - 3)}...` : string

const OptionForm = ({ onSave }) => {
    const [state, setState] = useState(emptyState)

    const _onSave = (e) => {
        e.preventDefault()
        onSave(state)
        setState(emptyState)
    }

    const mergeWithState = name => ({ target }) => {
        setState({
            ...state,
            [name]: target.value
        })
    }

    return html`
            <form class="card-form" onSubmit=${_onSave}>
                <input
                    type="text"
                    onChange=${mergeWithState('imageUrl')}
                    placeholder="URL de Imagen"
size="50"
                    value=${state.imageUrl}
                />
                <input
                    type="text"
                    onChange=${mergeWithState('url')}
                    placeholder="URL"
                    value=${state.url}
                />
                <input
                    type="text"
                    onChange=${mergeWithState('text')}
                    placeholder="Texto"
                    value=${state.text}
                />
                <button type="submit">agregar</button>
            </form>
            `
}

const Config = ({ onBack }) => {
    const { addOption, options, removeOption, timeout, setTimeout }  = useConfig()

    return html `<div>
                    <h2>Opciones</h2>
                    ${options.length < 4 && html `<${OptionForm} onSave=${addOption}/>`}
                    <table class="card-table">
                        <thead>
                            <tr>
                                <th>URL de Imagen</th>
                                <th>Texto</th>
                                <th></th>
                            </tr>
                        </thead>
                        ${options.map((option, index) => html`
                                <tr>
                                    <td>
                                        ${truncateAt (50) (option.imageUrl)}
                                    </td>
                                    <td>
                                        ${option.text}
                                    </td>
                                    <td>
                                        <button onClick=${() => removeOption(index)}>eliminar</button>
                                    </td>
                                </tr>`)}
                    </table>
                    <b>Tiempo</b> <i style="margin-right: 3px;">(seg.)</i>
                    <input
                        type="text"
                        onChange=${({ target }) => setTimeout(target.value)} value=${timeout}
                        size="3"
                    />
                    <hr/>
                    <button onClick=${onBack}>mostrar</button>
                </div>`
}

Config.propTypes = {}

export default Config
