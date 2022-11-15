const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

new Chart(ctx, {
type: 'line',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1,
    backgroundColor:'#FF6F00',
    borderColor: '#FF6F00'
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    },
    responsive:true,
    maintainAspectRatio:false
}
});
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor:'#3F51B5',
        borderColor: '#3F51B5'
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        },
        responsive:true,
        maintainAspectRatio:false
    }
    });

