function encurtarUrl() {
    let url = document.getElementById("input-link").value;
    if (!url) {
        alert("É preciso inserir um link para encurtar");
        return;
    }

    let headers = {
        "content-type": "application/json",
        "apiKey": "f91d94942d594b7fa144ea6e1bef3158"
    };
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    };
    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(linkRequest)
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        let inputUrl = document.getElementById("input-url");
        inputUrl.value = json.shortUrl;

        let emptyElement = document.querySelector('.empty-element');
        let boxInput = document.querySelector('.box-input');
        boxInput.insertBefore(inputUrl, emptyElement.nextSibling);

        let inputLink = document.getElementById("input-link");
        inputLink.removeAttribute("placeholder");
        inputLink.value = '';
    });
}

function copiar() {
    let inputUrl = document.getElementById("input-url");
    inputUrl.select();
    inputUrl.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputUrl.value);
    alert(`URL copiada: ${inputUrl.value}`);
}