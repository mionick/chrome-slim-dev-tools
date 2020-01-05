var initialized;
var hoverElement;

function displayStyle(e) {
    
    if (!window.slimDevOn) {
        return;
    }
    
    let x = e.clientX, y = e.clientY;
    let refElement = document.elementFromPoint(x, y);//document.getElementById("slim-dev-hover");

    hoverElement.innerHTML = "<p>Element: " + refElement.tagName + "</p>" +
    "<p>Height: " + refElement.getBoundingClientRect().height + "</p>"  +
    "<p>Width: " + refElement.getBoundingClientRect().width + "</p>" +
    "<p>offsetHeight: " + refElement.offsetHeight + "</p>"  +
    "<p>offsetWidth: " + refElement.offsetWidth + "</p>";

}
function main() {
    if (!initialized) {
        var link = document.createElement("link");
        link.href = chrome.extension.getURL("inject.css");
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
        
        hoverElement = document.createElement("div");
        hoverElement.id = "slim-dev-hover";
        document.body.appendChild(hoverElement);
        
        window.slimDevOn = true;
        
        window.addEventListener('mousemove', displayStyle);
        initialized = true;
    } else if (!window.slimDevOn) {
        window.slimDevOn = true;
        hoverElement.style.display = "block";
    } else {
        window.slimDevOn = false;
        hoverElement.style.display = "none";
    }
    chrome.runtime.sendMessage({on: window.slimDevOn});
}

main();