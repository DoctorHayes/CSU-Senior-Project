const APP_STORAGE_KEY = 'APP_STORAGE_KEY';
const USER_SETTINGS_SAVE_POINT_STORAGE_KEY = 'USER_SETTINGS_SAVE_POINT_STORAGE_KEY';
/** @type {SETTINGS_CONFIG|null} */
let g_settings = null;

function getSidebar() {
    return /** @type {HTMLElement} */ (document.querySelector('#sidebar'));
}
function getToggle() { /* */
    return /** @type {HTMLElement} */ (document.querySelector('.toggle-btn'));
}

function toggleSidebar() {
    getSidebar().classList.toggle('show-left-300');
    getToggle().classList.toggle('show-left-300'); /* */
    console.log('show fired');
}

function attachHandler(/** @type {HTMLElement} */ element,/** @type {HTMLElementEventMap} */ eventTitle, handler) {
    if (!element) {//element must be a valid html element or return 
        console.log('attachHandler to element failed', { element });
        return;
    }

    element.addEventListener(eventTitle, handler);
    console.log('registered', { eventTitle, handler });
}

console.log('settings loaded');

/** @typedef  {typeof DEFAULT_SETTINGS} SETTINGS_CONFIG */
const DEFAULT_SETTINGS = {
    theme: 'user-mode',
    bibleVersion: 'ESV',

    usingVerse: 'using_auto',
    bibleBook: '',
    bibleChapter: '',
    bibleVerse: '',
    
    backgroundColor: '#e4e5f1',
    backgroundImage: "url(../assets/backgrounds/default10.png)",

    usingImgBg: 'using_img',
    
    windowColor: '#FFFFFF',
    windowImage: "url(../assets/backgrounds/default8.png)",
    usingImgWin: 'using_colorw',
    
    windowOpacity: '1',
    borderColor: '#DDDDDD',
    borderOpacity: '1',
    
    headUnderlineColor: '#DDDDDD',
    headUnderlineOpacity: '1',
    headerDisplay: true,

    headerColor: '#333333',
    verseColor: '#001824',
    
    borderSize: '2',
    
    headerSize: '17',
    verseSize: '15',

    windowWidth: 80,
    /**@type {`string,string`} */
    windowVertical: 'auto,auto',

    headerFont: 'Merriweather',
    verseFont: 'Assistant',

    settingsColor: '#FFFFFF',
    settingsOpacity: 1,

    sHeadColor: '#333333',
    sHeadFont: 'Arial, sans-serif',
    sHeadSize: '19',

    sTextColor: '#001824',
    sTextFont: 'Arial, sans-serif',
    sTextSize: '12',

    userDisplay: true,

    // customImg: null

    // (future defaults here)
};

/** @template T */
function Deferred() {
    /**
     * @type {(value)=> void}
     * call resolve to return from the promise with a valid value
     */
    let resolve;

    /** @type {(value)=>void} */
    let reject;

    const promise = /** @type {Promise<T>} */ (new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    }));

    return { promise, resolve, reject };
}

function getSettings(key = APP_STORAGE_KEY) {
    const deferred =/**@type {typeof Deferred<SETTINGS_CONFIG>} */(Deferred());

    chrome.storage.sync.get([key]).then((result) => {
        console.log("Value currently is ", result);

        const settings_as_string = result[key];

        if (!settings_as_string) {
            const msg = 'No saved settings found, returning defaults';
            console.log(msg);
            if (key === USER_SETTINGS_SAVE_POINT_STORAGE_KEY) {
                alert('No user settings found');
            }
            return deferred.resolve(DEFAULT_SETTINGS);
        }

        /** @type {SETTINGS_CONFIG} */
        const _result = JSON.parse(settings_as_string);

        deferred.resolve(_result);
    });

    return /** @type {Promise<typeof DEFAULT_SETTINGS>}*/ (deferred.promise);
}

function writeSettings(/** @type {typeof DEFAULT_SETTINGS} */ settings, key = APP_STORAGE_KEY) {
    const deferred = Deferred();

    const settings_as_string = JSON.stringify(settings);

    chrome.storage.sync.set({ [key]: settings_as_string }, () => {
        if (chrome.runtime.lastError) {
            console.log('failed to save settings', chrome.runtime.lastError);
            deferred.reject(chrome.runtime.lastError);
            alert('Error: Failed to save settings, ' + chrome.runtime.lastError + '\n');
        }
        else {
            console.log('settings updated', settings);
            deferred.resolve();

        }
    });

    return deferred.promise;
}

async function settingsFormChangeHandler(/**@type {FormDataEvent} */ e) {
    // e.target.preventDefault
    console.log(e);
    // get the changed field
    /** @type {{name:keyof SETTINGS_CONFIG}}*/
    let { name, value, checked, type } = e.target;

    let tempSettings = await getSettings();

    const unsetField = (field) => { tempSettings[field] = null; };

    const imgColorCustom = ['customImg', 'backgroundImage', 'backgroundColor'];

    // if (imgColorCustom.includes(name)) {
    //     imgColorCustom.forEach(unsetField)
    // }

    if (name === 'customImg') {
        value = await getCustomImgInput(e.target);
    }

    console.log('change triggered by', { name, value, checked, type });

    if (type === 'checkbox' && name === 'headerDisplay') {
        value = checked;
    }

    // update settings
    tempSettings = { ...tempSettings, [name]: value };
    console.log('temp', { tempSettings });

    if (type === 'text') {
        return;
    }

    initializeSettingsForm(tempSettings, false);
    writeSettings(tempSettings).then(() =>
        refreshOtherOpenChromeTabs()
    ).catch(console.error)

    g_settings = tempSettings;
    // remove using class on body and set to new using
}

function refreshOtherOpenChromeTabs() {
    // get list of open tabs that are on the extension newtab.html page
    // for each tab, reload it
    return chrome.tabs.query({}, (tabs) => {
        console.log(tabs);
        return Promise.all(tabs.map(tab => {
            return chrome.tabs.sendMessage(tab.id, { path: 'post/reload_settings' });
        })).then(() => 'all tabs instructed to reload_settings');
    });
}

function activateSelectOption(/** @type {HTMLOptionElement} */ option, setValue = false) {
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

function initializeSettingsForm(/** @type {typeof DEFAULT_SETTINGS} */ settings, setValue = false) {
    // assuming input name matches settings key
    activateSelectOption(document.querySelector(`select#bibleVersion>option[value=${settings.bibleVersion}]`), setValue);
    // console.log('settings.bibleVersion: ', settings.bibleVersion);
    // console.log('test: ', document.querySelector('#selectedBibleVersion').value);
    activateSelectOption(document.querySelector(`[name=theme]>option[value=${settings.theme}]`), setValue);

    document.querySelectorAll('input[name=usingVerse]').forEach(inp => inp.removeAttribute('checked'));
    document.querySelector(`input[name=usingVerse][value=${settings.usingVerse}]`).setAttribute('checked', '');
    document.body.classList.remove('using_auto', 'using_manual');

    if (document.getElementById('manual').checked) {
        document.getElementById('inputBoxes').classList.remove('hidden');
    } else {
        document.getElementById('inputBoxes').classList.add('hidden');
    }
    
    console.log('verse type: ', settings.usingVerse);
    loadVerseOfTheDay(settings, false);
    
    ['light-mode', 'dark-mode'].forEach((mode) => document.body.classList.remove(mode));

    console.log(settings.theme);

    document.querySelector('#backgroundColor').value = settings.backgroundColor;
    document.querySelector('#backgroundImage').value = settings.backgroundImage;
    document.querySelectorAll('input[name=usingImgBg]').forEach(inp => inp.removeAttribute('checked'));
    document.querySelector(`input[name=usingImgBg][value=${settings.usingImgBg}]`).setAttribute('checked', 'true');
    document.body.classList.remove('using_img', 'using_color');
    document.body.style.setProperty('--bg-image', ![undefined, null, ''].includes(settings.customImg) ? `url(${settings.customImg})` : settings.backgroundImage);

    if (settings.theme !== 'user-mode') {
        document.body.style.setProperty('--bg-color', (settings.theme === 'light-mode') ? '#e4e5f1' : '#26252c');
        document.body.classList.add(settings.theme);
    } else {
        document.body.style.setProperty('--bg-color', settings.backgroundColor);
    }
    document.body.classList.add(settings.usingImgBg);

    document.querySelector('#windowColor').value = settings.windowColor;
    document.querySelector('#windowImage').value = settings.windowImage;
    document.querySelectorAll('input[name=usingImgWin]').forEach(inp => inp.removeAttribute('checked'));
    document.querySelector(`input[name=usingImgWin][value=${settings.usingImgWin}]`).setAttribute('checked', '');
    document.body.classList.remove('using_imgw', 'using_colorw');
    document.body.style.setProperty('--win-image', settings.windowImage);
    document.body.style.setProperty('--win-color', settings.windowColor);
    document.body.classList.add(settings.usingImgWin);

    document.querySelector('#windowOpacity').value = settings.windowOpacity;
    document.body.style.setProperty('--win-opacity', settings.windowOpacity);
    document.body.classList.add(settings.windowOpacity);

    document.querySelector('#borderColor').value = settings.borderColor;

    document.querySelector('#borderOpacity').value = settings.borderOpacity;

    // combine color and opacity
    document.body.style.setProperty('--b-color-rgba', hexToRGB(settings.borderColor, settings.borderOpacity));

    document.querySelector('#headUnderlineColor').value = settings.headUnderlineColor;
    document.querySelector('#headUnderlineOpacity').value = settings.headUnderlineOpacity;
    document.body.style.setProperty('--hul-color-rgba', hexToRGB(settings.headUnderlineColor, settings.headUnderlineOpacity));

    document.querySelector('#headerColor').value = settings.headerColor;
    document.body.style.setProperty('--h-color', settings.headerColor);

    document.querySelector('#verseColor').value = settings.verseColor;
    document.body.style.setProperty('--v-color', settings.verseColor);

    document.querySelector('#borderSize').value = settings.borderSize;
    document.body.style.setProperty('--b-size', settings.borderSize + 'px');
    console.log(settings.borderSize);
    document.body.style.setProperty('--b-radius', settings.borderSize * 2 + 'px');

    document.querySelector('#headerSize').value = settings.headerSize;
    console.log(settings.headerSize);
    document.body.style.setProperty('--h-size', settings.headerSize + 'px');
    document.querySelector('#verseSize').value = settings.verseSize;
    document.body.style.setProperty('--v-size', settings.verseSize + 'px');

    document.querySelector('#windowWidth').value = settings.windowWidth;
    document.body.style.setProperty('--window-width', settings.windowWidth + '%');

    document.querySelector('#windowVertical').value = settings.windowVertical;
    const [marginTop, marginBottom] = (settings.windowVertical ?? 'auto,auto').split(',');
    document.body.style.setProperty('--window-m-top', marginTop === 'auto' ? 'auto' : marginTop + 'px');
    document.body.style.setProperty('--window-m-bottom', marginBottom === 'auto' ? 'auto' : marginBottom + 'px');
    console.log(marginTop, ' + ', marginBottom);

    document.querySelector('#headerFont').value = settings.headerFont;
    document.body.style.setProperty('--h-font', settings.headerFont);
    document.querySelector('#verseFont').value = settings.verseFont;
    document.body.style.setProperty('--v-font', settings.verseFont);

    console.log(settings.headerSize, settings.verseSize);
    console.log(settings.headerDisplay);

    const headerDisplay = (settings.headerDisplay) ? 'block' : 'none';
    document.body.style.setProperty('--headerDisplay', headerDisplay);
    document.getElementById('headerDisplay').checked = (headerDisplay === 'block');

    document.querySelector('#settingsColor').value = settings.settingsColor;
    document.body.style.setProperty('--s-color', settings.settingsColor);
    console.log(settings.settingsColor);
    document.querySelector('#settingsOpacity').value = settings.settingsOpacity;
    document.body.style.setProperty('--s-opacity', settings.settingsOpacity);
    document.body.classList.add(settings.settingsOpacity);

    document.querySelector('#sHeadColor').value = settings.sHeadColor;
    document.body.style.setProperty('--s-head-color', settings.sHeadColor);
    document.querySelector('#sTextColor').value = settings.sTextColor;
    document.body.style.setProperty('--s-text-color', settings.sTextColor);

    document.querySelector('#sHeadFont').value = settings.sHeadFont;
    document.body.style.setProperty('--s-head-font', settings.sHeadFont);
    document.querySelector('#sTextFont').value = settings.sTextFont;
    document.body.style.setProperty('--s-text-font', settings.sTextFont);

    document.querySelector('#sHeadSize').value = settings.sHeadSize;
    document.body.style.setProperty('--s-head-size', settings.sHeadSize + 'px');
    const headish = parseInt(settings.sHeadSize, 10);
    const medHead = headish + 5;
    const bigHead = headish + 10;
    console.log("big: ", bigHead);
    document.body.style.setProperty('--s-med-size', medHead + 'px');
    document.body.style.setProperty('--s-top-size', bigHead + 'px');
    document.querySelector('#sTextSize').value = settings.sTextSize;
    document.body.style.setProperty('--s-text-size', settings.sTextSize + 'px');

    console.log(settings.sHeadSize, settings.sTextSize);

    const userDisplay = (settings.theme === 'user-mode') ? 'inline-block' : 'none';
    document.body.style.setProperty('--user-display', userDisplay);
    const userLabel = (userDisplay === 'inline-block') ? 'Color:' : 'Color: (theme must be in User Mode)';
    console.log("userLabel is " + userLabel)
    // document.getElementById('user-option').textContent = userLabel;
    const userLabels = document.getElementsByClassName('user-option-l');
    for (i = 0; i < userLabels.length; i++) { userLabels[i].textContent = userLabel; }

    // future ones here
}

// hex -> rgb, for rgba
function hexToRGB(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

async function loadPreferredSettings(/** @type {SETTINGS_CONFIG} */ _settings) {
    await writeSettings(_settings);
    initializeSettingsForm(_settings, true);
    refreshOtherOpenChromeTabs();

    document.location.reload(); // **change if you want cleaner settings sync
}

async function initializeApp() {
    // load settings
    const settings = await getSettings();
    g_settings = settings;
    console.log({ settings });
    attachHandler(document.querySelector('.toggle-btn'), 'click', () => toggleSidebar());
    attachHandler(document.querySelector('#closeSidebar'), 'click', () => toggleSidebar());
    attachHandler(document.querySelector('button#save'), 'click', async () => writeSettings(
        await getSettings(), USER_SETTINGS_SAVE_POINT_STORAGE_KEY));
    attachHandler(document.querySelector('#load'), 'click', async (e) => {
        e.preventDefault();
        loadPreferredSettings(await getSettings(USER_SETTINGS_SAVE_POINT_STORAGE_KEY));
    });

    attachHandler(document.querySelector('#default'), 'click', (e) => {
        e.preventDefault();
        loadPreferredSettings(DEFAULT_SETTINGS);
    });
    initializeSettingsForm(settings);

    attachHandler(document.querySelector('#settings_form'), 'change', settingsFormChangeHandler);

    attachHandler(document.querySelector('#settings_form'), 'onsubmit', (e) => {
        e.preventDefault();
        //write current settings
        writeSettings(g_settings);
    });
    registerRoutes();

    attachHandler(document.querySelector('#manualVerse'), 'click', async (e) => {
        e.preventDefault();
        manualVerseSearch(await getSettings());
    });

    attachHandler(document.querySelector('#customImg'), 'change', () => {
        customBackground();
    });
}

function registerRoutes() {
    console.log('listening for routers');
    chrome.runtime.onMessage.addListener(async (req, sender, res) => {
        const path = req?.path;
        const data = req?.data;
        const deferred = Deferred();
        switch (req?.path) {
            case 'post/reload_settings':
                initializeSettingsForm(await getSettings(), true);
                res('responding');
                break;
            default: {
                console.log('invalid path called', { req, sender });
                deferred.rej(['invalid path called', { req, sender }]);
            }

        }
        return deferred.promise;

    });
}

function loadVerseOfTheDay(/** @type {SETTINGS_CONFIG} */ settings, manualButton = false) {
    // guard clause: stop if settings value is not valid
    if (!settings) {
        return;
    }

    if (settings.usingVerse == 'using_manual') {
        const url = `https://www.biblegateway.com/passage/?search=${settings?.bibleBook ?? 'John'}+${settings?.bibleChapter ?? '3'}%3A${settings?.bibleVerse ?? '16'}&version=${settings?.bibleVersion ?? 'ESV'}`;
        console.log('manual: ', url);
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // Parse the HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract content based on a specific class (replace 'example-class' with your target class)
            const elementsWithClass = doc.querySelectorAll('.passage-text p');

            if (manualButton == true && elementsWithClass.length == 0) {
                alert("Error: Invalid input.\nPlease make sure to check your spelling!\nAlso ensure that the book, chapter, and verse you are looking for exists!");
                return;
            }

            const bookUrl = new Map ([
                ['Genesis', 'Gen'], 
                ['Exodus', 'Exod'], 
                ['Leviticus', 'Lev'], 
                ['Numbers', 'Num'], 
                ['Deuteronomy', 'Deut'],
                ['Joshua', 'Josh'], 
                ['Judges', 'Judg'], 
                ['Ruth', 'Ruth'],
                ['1 Samuel', '1Sam'],
                ['2 Samuel', '2Sam'],
                ['1 Kings', '1Kgs'],
                ['2 Kings', '2Kgs'],
                ['1 Chronicles', '1Chr'],
                ['2 Chronicles', '2Chr'],
                ['Ezra', 'Ezra'],
                ['Nehemiah', 'Neh'], 
                ['Esther', 'Esth'],
                ['Job', 'Job'],
                ['Psalms', 'Ps'],
                ['Proverbs', 'Prov'],
                ['Ecclesiastes', 'Eccl'],
                ['Song of Solomon', 'Song'],
                ['Isaiah', 'Isa'],
                ['Jeremiah', 'Jer'],
                ['Lamentations', 'Lam'],
                ['Ezekiel', 'Ezek'],
                ['Daniel', 'Dan'],
                ['Hosea', 'Hos'],
                ['Joel', 'Joel'],
                ['Amos', 'Amos'],
                ['Obadiah', 'Obad'],
                ['Jonah', 'Jonah'],
                ['Micah', 'Mic'],
                ['Nahum', 'Nah'],
                ['Habakkuk', 'Hab'],
                ['Zephaniah', 'Zeph'],
                ['Haggai', 'Hag'],
                ['Zechariah', 'Zech'],
                ['Malachi', 'Mal'],
                ['Matthew', 'Matt'],
                ['Mark', 'Mark'],
                ['Luke', 'Luke'],
                ['John', 'John'],
                ['Acts', 'Acts'],
                ['Romans', 'Rom'],
                ['1 Corinthians', '1Cor'],
                ['2 Corinthians', '2Cor'],
                ['Galatians', 'Gal'],
                ['Ephesians', 'Eph'],
                ['Philippians', 'Phil'],
                ['Colossians', 'Col'],
                ['1 Thessalonians', '1Thess'],
                ['2 Thessalonians', '2Thess'],
                ['1 Timothy', '1Tim'],
                ['2 Timothy', '2Tim'],
                ['Titus', 'Titus'],
                ['Philemon', 'Phlm'],
                ['Hebrews', 'Heb'],
                ['James', 'Jas'],
                ['1 Peter', '1Pet'],
                ['2 Peter', '2Pet'],
                ['1 John', '1John'],
                ['2 John', '2John'],
                ['3 John', '3John'],
                ['Jude', 'Jude'],
                ['Revelation', 'Rev'],
            ]);

            console.log('map: ', settings.bibleBook, bookUrl.get(settings.bibleBook));   

            console.log('found: ', elementsWithClass)
            let count = 0;
            
            // Process the extracted elements
            elementsWithClass.forEach(element => {
                console.log('verse... ', element.textContent);
                count++;

                // Clone the element to avoid modifying the original
                const clone = element.cloneNode(true);

                // Remove <sup> elements and .chapternums from the clone, fixes psalms and proverbs spacing
                clone.querySelectorAll('sup').forEach(sup => sup.remove());
                clone.querySelectorAll('.chapternum').forEach(chapternum => chapternum.remove());
                clone.querySelectorAll('.indent-1-breaks').forEach(element => element.innerHTML = ' ');
                clone.querySelectorAll('.indent-1').forEach(element => element.textContent += ' ');
                clone.querySelectorAll('.line>span.text').forEach(element => element.textContent += ' ');

                clone.textContent = clone.textContent.trim();

                console.log('count: ', count, clone.textContent);

                // for quotation marks ONLY around the WHOLE of the pulled verse(s), NOT each paragraph pulled
                    // MUST be FIRST EQUAL SIGN - overwrites votdContainer's previous verse
                if (count == 1) { document.getElementById("votdContainer").innerHTML = (`“`);}

                // Append the content to the existing content
                document.getElementById("votdContainer").innerHTML += (`${clone.textContent}`);

                // put full verse link after everything - NOT multiple times
                if (count == elementsWithClass.length) {
                    document.getElementById("votdContainer").innerHTML.trimEnd();
                    document.getElementById("votdContainer").innerHTML += (
                        `” (<a target="_blank" href="${url}">${settings?.bibleBook ?? 'John'} ${settings?.bibleChapter ?? '3'}:${settings?.bibleVerse ?? '16'}</a>) <a target="_blank" href="https://www.biblegateway.com/audio/mclean/${settings?.bibleVersion ?? 'ESV'}/${bookUrl.get(settings?.bibleBook ?? 'John')}.${settings?.bibleChapter ?? '3'}" title="Listen to chapter"><img alt="listen to chapter" src="https://www.biblegateway.com/assets/images/audio/sound.gif" border="0/"></a><br/><br/>Powered by <a href="https://www.biblegateway.com/" rel="nofollow">BibleGateway.com</a>`
                    );
                } else if (/*count != elementsWithClass.length &&*/ count >= 1) { 
                    // breaks paragraphs if many verses - more readable
                    document.getElementById("votdContainer").innerHTML += (` <br/>`);
                } 
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });

    } else {
        const url = `https://www.biblegateway.com/votd/get/?format=html&version=${settings?.bibleVersion ?? 'ESV'}`;
        console.log('auto: ', url);
        fetch(url)
        .then((response) => response.text())
        .then((data) => {
                // overwrites votdContainer's previous verse
            document.getElementById("votdContainer").innerHTML = data;
        })
        .catch((error) => {
            console.error("Error loading VOTD:", error);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function manualVerseSearch(settings) {
    bibleBook = document.querySelector('#bibleBook').value;
    bibleChapter = document.querySelector('#bibleChapter').value;
    bibleVerse = document.querySelector('#bibleVerse').value;

    if(bibleBook && bibleChapter && bibleVerse != null) {
        settings.bibleBook = bibleBook;
        settings.bibleChapter = bibleChapter;
        settings.bibleVerse = bibleVerse;

        console.log('Submitted Values:', settings.bibleBook, settings.bibleChapter, settings.bibleVerse);
        console.log('verse button: ', settings.usingVerse)

        // loadPreferredSettings(settings);
        writeSettings(settings);
        // initializeSettingsForm(settings, true);
        loadVerseOfTheDay(settings, true);
        refreshOtherOpenChromeTabs();

    } else {
        // empty input error
        alert("Error: You have at least one empty input.\nTo choose your own verse, please type the book, chapter, and verse!");
    }
}

// prevent API quota error
document.querySelectorAll('select').forEach(selector => {
    selector.addEventListener('change', function() {
        this.blur();
    });
});

document.addEventListener('keydown', function(event) { 
    if (event.key == 'Tab') {
        if (document.activeElement.tagName != 'INPUT' || document.activeElement.type != text) {
            event.preventDefault();
        }
    }
});