import { useEffect, useRef, useState } from 'preact/hooks'

const DEFAULT_TIMEOUT = 2
const DEFAULT_OPTIONS = 4

const useCycleClick = (onClick, options = DEFAULT_OPTIONS,  timeout = DEFAULT_TIMEOUT) => {
    const activeRef = useRef(0);
    const [active, setActive] = useState(activeRef.current);

    const activate = index => {
        activeRef.current = index % options
        setActive(activeRef.current)
    }

    useEffect(() => {
        const handle = setTimeout(() => {
            activate(activeRef.current + 1)
        }, timeout * 1000 )

        return () => {
            clearTimeout(handle)
        }
    }, [activate])

    useEffect(() => {
        const clickListener = () => onClick(activeRef.current)

        document.addEventListener('click', clickListener)
        document.addEventListener('keypress', clickListener)

        return () => {
          document.removeEventListener('click', clickListener)
          document.removeEventListener('keypress', clickListener)
        }
    }, [onClick])

    return { active }
}

export default useCycleClick
