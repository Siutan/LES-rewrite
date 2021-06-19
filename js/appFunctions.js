const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

//CLOSE APP
closeAppBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})

//MINIMIZE APP
minimizeBtn.addEventListener('click', () => {
    ipc.send('min')
})
//MAXIMIZE APP
maximizeBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})