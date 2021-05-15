import { html } from '../services/render'

const Card = ({ active, image, children }) => {
    const classes = active ? "active card" : "card"

    return html `<div class="${classes}">
                   ${image && html `<img width="250" src="${image}" />`}
                   ${children}
                 </div>`
}

Card.propTypes = {}

export default Card
