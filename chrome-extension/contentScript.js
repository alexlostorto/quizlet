var s = document.createElement('script');
s.src = chrome.runtime.getURL('console.js');
s.onload = function() {
    this.remove();
};

let l = document.createElement("link");
l.href = chrome.runtime.getURL('styles.css');
l.rel = "stylesheet";

(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).appendChild(l);
