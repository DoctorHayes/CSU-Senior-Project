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

/** @typedef  {typeof DEFAULT_SETTINGS} SETTINGS_CONFIG */
const DEFAULT_SETTINGS = {
    theme: 'user-mode',
    bibleVersion: 'ESV',
    // bibleLanguage: 'en',
    backgroundColor: '#e4e5f1',
    backgroundImage: "url(../assets/backgrounds/default10.jpg)",
    // windowPosition: 'center',
    usingImgBg: 'using_img',
    //
    windowColor: '#FFFFFF',
    windowImage: "url(../assets/backgrounds/default8.jpg)",
    usingImgWin: 'using_colorw',
    //
    windowOpacity: '1',
    borderColor: '#DDDDDD',
    borderOpacity: '1',
    //
    headUnderlineColor: '#DDDDDD',
    headUnderlineOpacity: '1',
    headerDisplay: true,
    //
    // headerToggle: 'true', // checkboxes don't work this way (?)
    //
    headerColor: '#333333',
    verseColor: '#001824',
    //
    borderSize: '2',
    //
    headerSize: '17',
    verseSize: '15',
    //
    windowWidth: 80,
    /**@type {`string,string`} */
    windowVertical: 'auto,auto',

    headerFont: 'Merriweather',
    verseFont: 'Assistant',

    customImg: null

    // headerState: 'block'

    // ADD THE REST HERE
}

/** @template T */
function Deferred() {

    /**
     * @type {(value)=> void}
     * call resolve to return from the promise with a valid value
     */
    let resolve;

    /** @type {(value)=>void} */
    let reject

    const promise = /** @type {Promise<T>} */ (new Promise((res, rej) => {
        resolve = res;
        reject = rej
    }))

    return { promise, resolve, reject }
}

function getSettings() {
    const deferred =/**@type {typeof Deferred<SETTINGS_CONFIG>} */(Deferred())

    chrome.storage.sync.get([APP_STORAGE_KEY]).then((result) => {
        console.log("Value currently is ", result);

        const settings_as_string = result[APP_STORAGE_KEY]

        if (!settings_as_string) {
            console.log('no saved settings found, returning defaults')
            return deferred.resolve(DEFAULT_SETTINGS)

        }

        /** @type {SETTINGS_CONFIG} */
        const _result = JSON.parse(settings_as_string)

        deferred.resolve(_result)


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
    /** @type {{name:keyof SETTINGS_CONFIG}}*/
    let { name, value, checked, type } = e.target

    let tempSettings = await getSettings()

    const unsetField = (field) => { tempSettings[field] = null }

    const imgColorCustom = ['customImg', 'backgroundImage', 'backgroundColor']

    // if (imgColorCustom.includes(name)) {
    //     imgColorCustom.forEach(unsetField)
    // }

    if (name === 'customImg') {
        value = await getCustomImgInput(e.target);
    }

    console.log('change triggered by', { name, value, checked, type })

    if (type === 'checkbox' && name === 'headerDisplay') {
        value = checked
    }
    // update settings
    tempSettings = { ...tempSettings, [name]: value }
    console.log({ tempSettings })

    // save settings 
    writeSettings(tempSettings).then(() =>
        refreshOtherOpenChromeTabs()
    ).catch(console.error)

    initializeSettingsForm(tempSettings, false)
    // remove using class on body and set to new using
    // document.body.classList.remove('using_img', 'using_color')
    // document.body.classList.add(tempSettings.usingImgBg)
}

/** @type {(File) => Promise<FileReader['result']>} */
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

async function getCustomImgInput(customImgInput) {
    /** @type {HTMLInputElement} */
    // const customImgInput = document.getElementById('#customImg');

    const tempFile = customImgInput.files[0];
    if (!tempFile) {
        return;
    }


    const fileAsB64Uri = await toBase64(tempFile)

    if (!fileAsB64Uri) {
        return;
    }

    return fileAsB64Uri

    // return customImgInput.onchange = async () => {

    //     console.log(tempFile);
    // }
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
    // const /** @type {HTMLSelectElement} */ select = option.closest('select')
    // if (!option || !select) {
    //     return
    // }

    // select.querySelectorAll('option').forEach(opt => {
    //     // un select all options that are different from option
    //     if (opt !== option) {
    //         return opt.removeAttribute('selected')
    //     }
    //     // for the option we want, select it
    //     opt.setAttribute('selected', '')
    // })

    // if (setValue) {
    //     select.value = option.value
    // }


    // new method when "disabled" selection options prevented option.closest
    if (!option || !option.parentNode) {
        return;
    }

    const select = option.parentNode; // Get the parent select element

    if (!option || !select || !select.options) {
        return;
    }

    // Iterate through the options manually
    for (let i = 0; i < select.options.length; i++) {
        const opt = select.options[i];

        if (opt === option) {
            // Select the desired option
            opt.setAttribute('selected', '');
        } else {
            // Deselect other options
            opt.removeAttribute('selected');
        }
    }

    if (setValue) {
        // Update the value property if needed
        select.value = option.value;
    }
}

// ???
// let selectedBibleVersion = '';

function initializeSettingsForm(/** @type {typeof DEFAULT_SETTINGS} */ settings, setValue = false) {
    // assuming input name matches settings key
    activateSelectOption(document.querySelector(`select#bibleVersion>option[value=${settings.bibleVersion}]`), setValue)
    // activateSelectOption(document.querySelector(`select#bibleLang >option[value=${settings.bibleLanguage}]`), setValue)
    activateSelectOption(document.querySelector(`[name=theme]>option[value=${settings.theme}]`), setValue)
    //(???)
    console.log('settings.bibleVersion: ', settings.bibleVersion);
    // document.querySelector('#selectedBibleVersion').value = settings.bibleVersion // ???
    // console.log('test: ', document.querySelector('#selectedBibleVersion').value);
    // selectedBibleVersion = settings.bibleVersion;
    loadVerseOfTheDay(settings);
    //
    ['light-mode', 'dark-mode'].forEach((mode) => document.body.classList.remove(mode))

    // if (settings.theme !== 'user-mode') {
    //     document.body.classList.add(settings.theme)
    // }

    console.log(settings.theme);

    document.querySelector('#backgroundColor').value = settings.backgroundColor
    document.querySelector('#backgroundImage').value = settings.backgroundImage //
    // document.querySelector('#windowPosition').value = settings.windowPosition
    document.querySelectorAll('input[name=usingImgBg]').forEach(inp => inp.removeAttribute('checked'))
    document.querySelector(`input[name=usingImgBg][value=${settings.usingImgBg}]`).setAttribute('checked', '')
    document.body.classList.remove('using_img', 'using_color')
    document.body.style.setProperty('--bg-image', ![undefined, null, ''].includes(settings.customImg) ? `url(${settings.customImg})` : settings.backgroundImage)
    
    if (settings.theme !== 'user-mode') {
        // NF - IS THERE A BETTER WAY TO DO THIS??? (LIGHT/DARK MODE)
        document.body.style.setProperty('--bg-color', (settings.theme === 'light-mode') ? '#e4e5f1' : '#26252c');
        document.body.classList.add(settings.theme)
    } else {
        document.body.style.setProperty('--bg-color', settings.backgroundColor)
    }
    document.body.classList.add(settings.usingImgBg)
    //
    document.querySelector('#windowColor').value = settings.windowColor
    document.querySelector('#windowImage').value = settings.windowImage
    document.querySelectorAll('input[name=usingImgWin]').forEach(inp => inp.removeAttribute('checked'))
    document.querySelector(`input[name=usingImgWin][value=${settings.usingImgWin}]`).setAttribute('checked', '')
    document.body.classList.remove('using_imgw', 'using_colorw')
    document.body.style.setProperty('--win-image', settings.windowImage)
    document.body.style.setProperty('--win-color', settings.windowColor)
    document.body.classList.add(settings.usingImgWin)
    //
    document.querySelector('#windowOpacity').value = settings.windowOpacity
    document.body.style.setProperty('--win-opacity', settings.windowOpacity)
    document.body.classList.add(settings.windowOpacity)

    document.querySelector('#borderColor').value = settings.borderColor
    // document.body.style.setProperty('--b-color', settings.borderColor)
    // document.body.classList.add(settings.borderColor)

    document.querySelector('#borderOpacity').value = settings.borderOpacity
    // document.body.style.setProperty('--b-opacity', settings.borderOpacity) // space saved
    // document.body.classList.add(settings.borderOpacity)

    /*TEST 2 - combine color and opacity*/
    document.body.style.setProperty('--b-color-rgba', hexToRGB(settings.borderColor, settings.borderOpacity));
    //
    /*waste of space bc doesn't address image opacity - needs div to do so*/
    // document.body.style.setProperty('--win-color-rgba', hexToRGB(settings.windowColor, settings.windowOpacity));
    //

    document.querySelector('#headUnderlineColor').value = settings.headUnderlineColor
    document.querySelector('#headUnderlineOpacity').value = settings.headUnderlineOpacity
    document.body.style.setProperty('--hul-color-rgba', hexToRGB(settings.headUnderlineColor, settings.headUnderlineOpacity));
    //

    document.querySelector('#headerColor').value = settings.headerColor
    document.body.style.setProperty('--h-color', settings.headerColor)
    // document.body.style.setProperty('--h-color-rgba', hexToRGB(settings.headerColor, + document.querySelector('#headerToggle').checked))
    document.querySelector('#verseColor').value = settings.verseColor
    document.body.style.setProperty('--v-color', settings.verseColor)
    // document.body.style.setProperty('--vlink-color', settings.verseColor)
    //

    document.querySelector('#borderSize').value = settings.borderSize
    document.body.style.setProperty('--b-size', settings.borderSize + 'px')
    console.log(settings.borderSize);
    document.body.style.setProperty('--b-radius', settings.borderSize * 2 + 'px')
    //

    document.querySelector('#headerSize').value = settings.headerSize
    console.log(settings.headerSize);
    document.body.style.setProperty('--h-size', settings.headerSize + 'px')
    document.querySelector('#verseSize').value = settings.verseSize
    document.body.style.setProperty('--v-size', settings.verseSize + 'px')
    //

    document.querySelector('#windowWidth').value = settings.windowWidth
    document.body.style.setProperty('--window-width', settings.windowWidth + '%')

    document.querySelector('#windowVertical').value = settings.windowVertical
    const [marginTop, marginBottom] = (settings.windowVertical ?? 'auto,auto').split(',')
    document.body.style.setProperty('--window-m-top', marginTop === 'auto' ? 'auto' : marginTop + 'px')
    document.body.style.setProperty('--window-m-bottom', marginBottom === 'auto' ? 'auto' : marginBottom + 'px')
    console.log(marginTop, ' + ', marginBottom)

    document.querySelector('#headerFont').value = settings.headerFont
    document.body.style.setProperty('--h-font', settings.headerFont)
    document.querySelector('#verseFont').value = settings.verseFont
    document.body.style.setProperty('--v-font', settings.verseFont)

    console.log(settings.headerSize, settings.verseSize)
    console.log(settings.headerDisplay)

    const headerDisplay = (settings.headerDisplay) ? 'block' : 'none'
    document.body.style.setProperty('--headerDisplay', headerDisplay)
    document.getElementById('headerDisplay').checked = (headerDisplay === 'block')

    // ADD THE REST HERE
}


/*TEST HEX -> RGB*/
function hexToRGB(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

    // attach customImageInputHandler after form has been initialized
    // getCustomImgInputChangeHandler()

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


function loadVerseOfTheDay(/** @type {SETTINGS_CONFIG} */ settings) {

    // guard clause: stop if settings value is not valid
    if (!settings) {
        return
    }
    // Your code to load the Bible Gateway VOTD here
    // Example: fetch and display the VOTD from the external source

    // const selectedBibleVersion = document.querySelector('#selectedBibleVersion').value;
    // console.log('THIS IS IT HERE');
    // const selectedBibleVersion = window.selectedBibleVersion;
    // console.log('selected: ', selectedBibleVersion);

    fetch(`https://www.biblegateway.com/votd/get/?format=html&version=${settings?.bibleVersion ?? 'ESV'}`)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("votdContainer").innerHTML = data;
        })
        .catch((error) => {
            console.error("Error loading VOTD:", error);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
}
)