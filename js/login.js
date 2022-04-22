function login() {
    let data = {
        "email": document.querySelector("#login-email").value,
        "password": document.querySelector("#login-password").value
    };

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(async res => {
        if (res.status === 200) {
            let data = await res.json();
            console.log(data)
            localStorage.setItem("cookie", JSON.stringify(data));
            snackbar("Logged in!")
            // Redirect user to index...
        } else
            snackbar("Wrong password or email, or the account does not exist")
    });
}

function register() {
    let password = document.querySelector("#signup-password").value;
    let confirmPassword = document.querySelector("#signup-password-confirm").value;
    let email = document.querySelector("#signup-email").value;
    if (password === confirmPassword) {
        let data = {
            "email": email,
            "password": password
        };

        fetch("http://localhost:8080/api/login", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(async res => {
            if (res.status === 200) {
                let data = await res.json();
                console.log(data)
                localStorage.setItem("cookie", JSON.stringify(data));
                snackbar("Logged in!")
                // Redirect user to index...
            } else
                snackbar("Account already exists, try another email")
        });
    } else {
        snackbar("Passwords do not match!")
    }
}

const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
    item.addEventListener('click', function () {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'))
        this.parentElement.classList.add('is-active')
    })
})
