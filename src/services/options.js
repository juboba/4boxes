import { createContext } from 'preact'
import { html } from './render'
import { useContext, useReducer } from 'preact/hooks'

const OptionsContext = createContext()

const removeAtIndex = (index, list) => list.reduce((total, current, i) => i === index ? total : total.concat([current]), [])

const optionReducer = (state, action) => {
    console.log({ action, state })

    switch (action.type) {
            case 'add':
            return state.concat([action.payload])
            case 'remove':
            return removeAtIndex(action.index, state)
            default:
    }

    return state
}

export const OptionProvider = ({ children }) => (
    html `<${OptionsContext.Provider} value=${useReducer(optionReducer, [])}>
      ${ children }
    </${OptionsContext.Provider}>`
)

export const useOptions = () => {
    const [state, dispatch] = useContext(OptionsContext)

    const add = (payload) => {
        dispatch({ type: 'add', payload })
    }

    const remove = (index) => {
        dispatch({ type: 'remove', index })
    }

    return { add, remove, options: state }
}
