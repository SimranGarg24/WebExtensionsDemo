//adding listener
document.addEventListener("DOMContentLoaded", function() {
    findEmails()
});

function findEmails() {
    //calls content.js
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // tabs[0] will contain the currently active tab in the current window
      const activeTab = tabs[0];
      console.log(activeTab)
      if (activeTab) {
        const scriptDetails = {
          file: "content.js"
        };
        browser.tabs.executeScript(scriptDetails);
      }
    });
}

browser.runtime.onMessage.addListener((request) => {
    if (request.type == "Read emails response") {

        let countDiv = document.getElementById("email_list");
        console.log("countDiv",countDiv)
        
        var unique = request.emails.filter(onlyUnique);
        console.log("unique", unique)
        var filtered = unique.filter(function (el){
            return el != null && el != "" && el != " ";
        });
        
        console.log("filtered", filtered.length)
        
        if (filtered != null && filtered.length > 0) {
            console.log("inside")
            //Creating unordered list
            var ul = document.createElement('ul')
            ul.setAttribute('id', 'proList');
            
            countDiv.appendChild(ul);
            
            filtered.forEach(renderProductList);
            
            function renderProductList(element, index, arr) {
                var li = document.createElement('li');
                li.setAttribute('class', 'item');
                
                ul.appendChild(li);
                
                li.innerHTML = li.innerHTML + element;
            }
            console.log("countDiv",countDiv)
        } else {
            console.log("inside else")
            var node = document.createTextNode("No emails on this page.")
            console.log("node", node)
            countDiv.appendChild(node);
        }
    }
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
