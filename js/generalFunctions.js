function snackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function validateSession() {
    let data = {
        "cookie": localStorage.getItem("cookie")
    };

    fetch("http://localhost:8080/api/validateCookie", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(async res => {
        if (res.status !== 200) {
            // Will be replaced with ACTUAL URL when hosted
            window.location.replace("http://localhost:63342/NotifyClient/html/login.html");
        }
    });
}
