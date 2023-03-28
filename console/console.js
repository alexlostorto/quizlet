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


async function main() {    
    textItems = document.querySelectorAll('.ProseMirror');
    if (document.querySelector('.Prose') == null) { return; }

    translations = {};
    for (let i = 0; i < textItems.length; i+=2) {
        translations[textItems[i]] = textItems[i+1];
    }

    console.log(translations);
}


async function credits() {
    await sleep(200);
    console.clear();
    console.log.apply(console, ["%c Thanks for using my Sparx program! ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

main();

credits()
setInterval(credits, 5000);