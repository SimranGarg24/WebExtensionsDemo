var emails = getEmails();

//background script is listening to this request
browser.runtime.sendMessage({
    type: "Read emails response",
    emails: emails == null ? [""] : emails
});

function getEmails() {
    var search_in = document.body.innerHTML; //Get the HTML content of a document
    string_context = search_in.toString();
    
    array_emails = string_context.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi); //return array of strings matching with email regex
    console.log("emails:", array_emails)
    return array_emails;
}
