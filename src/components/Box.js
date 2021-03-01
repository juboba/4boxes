import { html } from '../services/render'

const Box = ({ active, image, children }) => {
    const classes = active ? "active box" : "box"

    return html `<div class="${classes}">
                   ${image && html `<img width="250" src="${image}" />`}
                   ${children}
                 </div>`
}

Box.propTypes = {}

export default Box
