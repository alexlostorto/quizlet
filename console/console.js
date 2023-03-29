console.log("Script is running");

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchDependencies() {
    let response = await fetch('https://raw.githubusercontent.com/alexlostorto/quizlet/main/release.json');
    let json = await response.json();

    for (url of json.dependencies.js) {
        let js = document.createElement("script");
        js.src = url;
        js.async = false;
        js.defer = false;
        document.head.appendChild(js);
    }

    for (url of json.dependencies.css) {
        let link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet"
        document.head.appendChild(link);
    }
}

fetchDependencies();

// CSS 
buttonStyles = '#save-button{display:inline-block;}#save-button{outline:none;}#save-button{cursor:pointer;}#save-button{font-size:.875pc;}#save-button{line-height:1;}#save-button{border-radius:375pt;}#save-button{transition-property:background-color,border-color,color,box-shadow,filter;}#save-button{transition-duration:.3s;}#save-button{border-left-width:.010416667in;}#save-button{border-bottom-width:.010416667in;}#save-button{border-right-width:.010416667in;}#save-button{border-top-width:.010416667in;}#save-button{border-left-style:solid;}#save-button{border-bottom-style:solid;}#save-button{border-right-style:solid;}#save-button{border-top-style:solid;}#save-button{border-left-color:transparent;}#save-button{border-bottom-color:transparent;}#save-button{border-right-color:transparent;}#save-button{border-top-color:transparent;}#save-button{border-image:none;}#save-button{letter-spacing:.125pc;}#save-button{min-width:1.666666667in;}#save-button{text-transform:uppercase;}#save-button{white-space:normal;}#save-button{font-weight:700;}#save-button{text-align:center;}#save-button{padding-left:.875pc;}#save-button{padding-bottom:.1875in;}#save-button{padding-right:.875pc;}#save-button{padding-top:1pc;}#save-button{color:#4255ff;}#save-button{box-shadow:inset 0 0 0 .125pc #423ed8;}#save-button{background-color:transparent;}#save-button{height:48px;}#save-button:hover{color:#fff;}#save-button:hover{background-color:#423ed8;}';
document.head.insertAdjacentHTML('beforeend','<style>' + buttonStyles + '</style>');

const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function() {
        main();
    });
});

mutationObserver.observe(document.documentElement, {
    attributeFilter: [ "class" ],
    characterData: true,
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

let translations = {};

async function main() {    
    const textItems = document.querySelectorAll('.ProseMirror');
    if (textItems == null) { return; }

    const createSetHeader = document.querySelector('.CreateSetHeader');
    if (createSetHeader !== null && document.querySelector('#save-button') === null) {

        // Show save button
        const divNode = document.createElement('div');
        divNode.style['display'] = 'flex';
        divNode.style['justify-content'] = 'center';
        divNode.style['padding'] = '1rem';

        const buttonNode = document.createElement('button');
        buttonNode.textContent = 'Save Translations';
        buttonNode.setAttribute('id', 'save-button');

        divNode.append(buttonNode)
        createSetHeader.append(divNode);

        // Trigger save function on click 
        buttonNode.addEventListener('click', () => {
            console.log("CLICKED BUTTON")

            for (let i = 0; i < textItems.length; i+=2) {
                if ([textItems[i].textContent] in translations) {
                    let value = translations[textItems[i].textContent];
                    value.push(textItems[i+1].textContent);
                    translations[textItems[i].textContent] = value;
                } else {
                    translations[textItems[i].textContent] = [textItems[i+1].textContent];
                }
            }

            console.log(translations);
        })
    }
}


async function credits() {
    await sleep(200);
    console.clear();
    console.log.apply(console, ["%c Thanks for using my Sparx program! ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
    main();
}

main();

credits();
setInterval(credits, 5000);