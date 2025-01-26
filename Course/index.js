"use strict"

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

function loadScript(scriptName) {
    if(scriptName && !document.querySelector(`script[sct="${scriptName}"]`)) {
        const script = document.createElement('script');
        script.src = scriptName;
        document.body.appendChild(script);
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // remove "active" class from tab and content
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // add "active" to tab and content
        tab.classList.add("active");
        const targetTab = tab.getAttribute("data-tab");
        document.getElementById(targetTab).classList.add("active");

        const scriptName = tab.getAttribute("data-script");
        loadScript(scriptName);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const firstTab = document.querySelector(".tab.active");
    if (firstTab) {
        const firstScript = firstTab.getAttribute("data-script");
        loadScript(firstScript);
    }
})