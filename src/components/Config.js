import { html } from '../services/render'
import { useState } from 'preact/hooks'
import { useOptions } from '../services/options'

const emptyState = {
    imageUrl: '',
    text: ''
}

const truncate = (length, string) => string.length > length ? `${string.slice(0, length - 3)}...` : string

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
                    onChange=${mergeWithState('text')}
                    placeholder="Texto"
                    value=${state.text}
                />
                <button type="submit">agregar</button>
            </form>
            `
}

const Config = ({ onBack }) => {
    const { add, options, remove }  = useOptions()
    console.log(options)

    return html `<div>
                    <h1>Opciones</h1>
                    <${OptionForm} onSave=${add}/>
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
                                        ${truncate(30, option.imageUrl)}
                                    </td>
                                    <td>
                                        ${option.text}
                                    </td>
                                    <td>
                                        <button onClick=${() => remove(index)}>eliminar</button>
                                    </td>
                                </tr>`)}
                    </table>
                    <button onClick=${onBack}>mostrar</button>
                </div>`
}

Config.propTypes = {}

export default Config
