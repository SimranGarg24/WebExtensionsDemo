// run every time a web page is loaded

//we want to reach out to background.js (which gets the data from storage) and gives it back to content.js which will change the web page.

/*
 Abstract;
 Modify Safari web page background color */

let color = '#FA96A7'; // Keeping pink as default on first page load

const changeColor = () => {
    document.querySelector("body").style.background = color;
    document.querySelector("#content").style.background = color
    document.querySelector('table.infobox').style.background = color

}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.color) {
        color = request.color
        changeColor()
    }
});

changeColor();
