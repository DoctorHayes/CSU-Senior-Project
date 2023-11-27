const APP_STORAGE_KEY = 'APP_STORAGE_KEY'
let g_settings = null

function getSidebar() {
    return /** @type {HTMLElement} */ (document.querySelector('#sidebar'))
}
function getToggle() { /* */
    return /** @type {HTMLElement} */ (document.querySelector('.toggle-btn'))
}

function toggleSidebar() {
    getSidebar().classList.toggle('show-left-300')
    getToggle().classList.toggle('show-left-300') /* */
    console.log('show fired')
}


function attachHandler(/** @type {HTMLElement} */ element,/** @type {HTMLElementEventMap} */ eventTitle, handler) {
    if (!element) {//element must be a valid html element or return 
        console.log('attachHandler to element failed', { element })
        return
    }

    element.addEventListener(eventTitle, handler)
    console.log('registered', { eventTitle, handler })

}



console.log('settings loaded')

const DEFAULT_SETTINGS = {
    theme: 'light',
    bibleVersion: 'niv',
    bibleLanguage: 'en',
    backgroundColor: 'gray',
    backgroundImage: "url(../assets/backgrounds/default1.jpg)",
    windowPosition: 'center',
    usingImgBg: 'using_img'
    // ADD THE REST HERE
}

function Deferred() {

    /**
     * @type {(value)=> void}
     * call resolve to return from the promise with a valid value
     */
    let resolve;

    /** @type {(value)=>void} */
    let reject

    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej
    })

    return { promise, resolve, reject }
}

function getSettings() {
    const deferred = Deferred()

    chrome.storage.sync.get([APP_STORAGE_KEY]).then((result) => {
        console.log("Value currently is ", result);

        const settings_as_string = result[APP_STORAGE_KEY]

        if (!settings_as_string) {
            console.log('no saved settings found, returning defaults')
            return deferred.resolve(DEFAULT_SETTINGS)

        }


        //return the settings found in storage
        deferred.resolve(JSON.parse(settings_as_string))


    });

    return /** @type {Promise<typeof DEFAULT_SETTINGS>}*/ (deferred.promise)
}

function writeSettings(/** @type {typeof DEFAULT_SETTINGS} */ settings) {
    const deferred = Deferred()

    const settings_as_string = JSON.stringify(settings)

    chrome.storage.sync.set({ [APP_STORAGE_KEY]: settings_as_string }, () => {
        if (chrome.runtime.lastError) {
            console.log('failed to save settings', chrome.runtime.lastError)
            deferred.reject(chrome.runtime.lastError)
        }
        else {
            console.log('settings updated', settings)
            deferred.resolve()
        }
    })

    return deferred.promise
}

function saveDefaultSettingsOnInstall() {
    // check if settings exist
    // if settting exist,return
    // else write defaults to settings
}

async function settingsFormChangeHandler(/**@type {FormDataEvent} */ e) {
    // e.target.preventDefault
    console.log(e)
    // get the changed field
    const { name, value } = e.target
    console.log('change triggered by', { name, value })
    // update settings
    const tempSettings = { ...await getSettings(), [name]: value }
    console.log({ tempSettings })

    // save settings 
    writeSettings(tempSettings).then(() =>
        refreshOtherOpenChromeTabs()
    )

    initializeSettingsForm(tempSettings, false)
    // remove using class on body and set to new using
    // document.body.classList.remove('using_img', 'using_color')
    // document.body.classList.add(tempSettings.usingImgBg)
}

// NF - FINISH TOM
function refreshOtherOpenChromeTabs() {
    // get list of open tabs that are on the extension newtab.html page
    // for each tab, reload it
    return chrome.tabs.query({}, (tabs) => {
        console.log(tabs)
        return Promise.all(tabs.map(tab => {
            return chrome.tabs.sendMessage(tab.id, { path: 'post/reload_settings' })
        })).then(() => 'all tabs instructed to reload_settings')

    });
}

function activateSelectOption(/** @type {HTMLOptionElement} */ option, setValue = false) {
    const /** @type {HTMLSelectElement} */ select = option.closest('select')
    if (!option || !select) {
        return
    }

    select.querySelectorAll('option').forEach(opt => {
        // un select all options that are different from option
        if (opt !== option) {
            return opt.removeAttribute('selected')
        }
        // for the option we want, select it
        opt.setAttribute('selected', '')
    })

    if (setValue) {
        select.value = option.value
    }
}

function initializeSettingsForm(/** @type {typeof DEFAULT_SETTINGS} */ settings, setValue = false) {
    // assuming input name matches settings key
    activateSelectOption(document.querySelector(`select#bibleVersion>option[value=${settings.bibleVersion}]`), setValue)
    activateSelectOption(document.querySelector(`select#bibleLang >option[value=${settings.bibleLanguage}]`), setValue)
    activateSelectOption(document.querySelector(`[name=theme]>option[value=${settings.theme}]`), setValue)
    document.querySelector('#backgroundColor').value = settings.backgroundColor
    document.querySelector('#backgroundImage').value = settings.backgroundImage //
    document.querySelector('#windowPosition').value = settings.windowPosition
    document.querySelectorAll('input[name=usingImgBg]').forEach(inp => inp.removeAttribute('checked'))
    document.querySelector(`input[name=usingImgBg][value=${settings.usingImgBg}]`).setAttribute('checked', '')
    document.body.classList.remove('using_img', 'using_color')
    document.body.style.setProperty('--bg-image', settings.backgroundImage)
    document.body.style.setProperty('--bg-color', settings.backgroundColor)
    document.body.classList.add(settings.usingImgBg)

    // ADD THE REST HERE

}

async function initializeApp() {
    // load settings
    const settings = await getSettings()
    g_settings = settings
    console.log({ settings })
    attachHandler(document.querySelector('.toggle-btn'), 'click', () => toggleSidebar())
    attachHandler(document.querySelector('#closeSidebar'), 'click', () => toggleSidebar())
    attachHandler(document.querySelector('button#save'), 'click', () => writeSettings(DEFAULT_SETTINGS))
    initializeSettingsForm(settings)
    attachHandler(document.querySelector('#settings_form'), 'change', settingsFormChangeHandler)
    registerRoutes()
}



function registerRoutes() {
    console.log('listening for routers')
    chrome.runtime.onMessage.addListener(async (req, sender, res) => {
        const path = req?.path
        const data = req?.data
        const deferred = Deferred()
        switch (req?.path) {
            case 'post/reload_settings':
                initializeSettingsForm(await getSettings(), true)
                res('responding')
                break;
            default: {
                console.log('invalid path called', { req, sender })
                deferred.rej(['invalid path called', { req, sender }])
            }

        }
        return deferred.promise

    })
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp()
}
)