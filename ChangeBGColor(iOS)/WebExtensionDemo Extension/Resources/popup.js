/*
 Abstract:
 Script that runs after clicking the extension's toolbar button.
 Code here runs a popup accessible from the Safari search bar extensions menu
 */

const colors = [
    { name: "Pink", code: '#FA96A7'},
    { name: "Orange", code: '#F28500'},
    { name: "Yellow", code: '#fc3'},
    { name: "Grey", code: '#A2A9B1'}
]

const sendColor = async (color) => {
    const [tab] = await browser.tabs.query({currentWindow: true, active: true})
    browser.tabs.sendMessage(tab.id, { color })
}

colors.forEach (color => {
    const button = document.createElement('button')
    button.style.background = color.code
    button.innerText = color.name
    document.querySelector('#color-container').appendChild(button)
    button.addEventListener('click', e => {
        sendColor(color.code)
    })
})
