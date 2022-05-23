function snackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function validateSession() {
    //localStorage.clear();
    if (localStorage.getItem("viewMode") === null) {
        let data = {
            "cookie": localStorage.getItem("cookie")
        };

        fetch("http://localhost:8080/api/login/validateCookie", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async res => {
            if (res.status !== 200) {
                // Will be replaced with ACTUAL URL when hosted
                localStorage.removeItem("cookie")
                window.location.replace("html/login.html");
            }
        });
    }
}
