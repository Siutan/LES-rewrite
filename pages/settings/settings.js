const { webContents } = require('electron')
const config = require('../../config.js')

fullscreen.addEventListener('change', (e) => {
    if (e.target.checked) {
        config.set('fullscreen', 'true')
        console.log(config.get('fullscreen'))
    } else {
        config.set('fullscreen', 'false')
        console.log(config.get('fullscreen'))
    }
})