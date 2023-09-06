browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        
    if (request.type == "content_request:enabled") {
        browser.runtime.sendNativeMessage({message: "request:enabled_status"}, function(response) {
            sendResponse({
                "background_response:enabled": response["delivery:enabled_status"]
            });
        });
    }
    
    return true;
});
