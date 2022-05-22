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
    setChart(data.totalUsers, data.pageVisits.visitorCount, data.totalNotes)
}

fetchStatistics()
setupBackButton()

function setChart(totalUsers, visitorCount, totalNotes) {
    new Chart(document.querySelector("#statisticsChart"), {
        type: 'bar',
        data: {
            labels: ['Total Users', 'Page Visits', 'Total Notes'],
            datasets: [{
                label: 'Total Users',
                data: [totalUsers, visitorCount, totalNotes],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function setupBackButton() {
    document.getElementsByClassName("back__button")[0].addEventListener('click', () => {
        window.location.replace("../index.html");
    });
}
