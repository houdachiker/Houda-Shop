// Fonction de déconnexion
function logout() {
    localStorage.removeItem('username');
    window.location.href = 'pageacceuil.html';
}
// Graphique des ventes
const salesChartCtx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(salesChartCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Ventes (en €)',
            data: [1200, 1900, 3000, 5000, 2300, 3400],
            backgroundColor: 'rgba(52, 152, 219, 0.6)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

// Graphique des utilisateurs
const usersChartCtx = document.getElementById('usersChart').getContext('2d');
const usersChart = new Chart(usersChartCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Nouveaux Utilisateurs',
            data: [30, 50, 80, 100, 60, 90],
            backgroundColor: 'rgba(211, 75, 221, 0.59)',
            borderColor: 'rgba(211, 75, 221, 0.59)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});
