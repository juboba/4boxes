import { createContext } from 'preact'
import { html } from './render'
import { useContext, useReducer } from 'preact/hooks'
import { append, evolve, remove } from 'ramda';

const OptionsContext = createContext()

const removeAtIndex = index => list => remove(index, 1, list)

const optionReducer = (state, action) => {
    switch (action.type) {
            case 'addOption':
            return evolve({
                options: append(action.payload)
            }, state)
            case 'removeOption':
            return evolve({
                options: removeAtIndex(action.index)
            }, state)
            case 'setTimeout':
            return {
                ...state,
                timeout: action.timeout
            }
            default:
            return state
    }
}

const emptyConfig = {
    options: [],
    timeout: 1
}

export const OptionProvider = ({ children }) => (
    html `<${OptionsContext.Provider} value=${useReducer(optionReducer, emptyConfig)}>
      ${ children }
    </${OptionsContext.Provider}>`
)

export const useConfig = () => {
    const [state, dispatch] = useContext(OptionsContext)

    const addOption = payload => {
        dispatch({ type: 'addOption', payload })
    }

    const removeOption = index => {
        dispatch({ type: 'removeOption', index })
    }

    const setTimeout = timeout => {
        dispatch({ type: 'setTimeout', timeout })
    }

    return {
        addOption,
        options: state.options,
        removeOption,
        setTimeout,
        timeout: state.timeout
    }
}
