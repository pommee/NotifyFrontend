var xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

new Chart(document.querySelector("#statisticsChart"), {
    type: "line",

    data: {
        labels: xValues,
        datasets: [{
            label: "Total Users",
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: false
        }, {
            label: "Page Visits",
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false
        }, {
            label: "Total Notes",
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                },
                display: true
            },
        }
    },
});

function fetchStatistics() {
    fetch("http://localhost:8080/api/statistics", {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    }).then(async res => {
        if (res.status === 200) {
            setData(await res.json());
        } else
            snackbar("Wrong password or email, or the account does not exist")
    });
}

function setData(data) {
    document.querySelector("#totalUsers").innerHTML = data.totalUsers;
    document.querySelector("#pageVisitsNumber").innerHTML = data.pageVisits.visitorCount;
    document.querySelector("#totalNotesNumber").innerHTML = data.totalNotes;
}

fetchStatistics()
