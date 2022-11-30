

const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');


Chart.defaults.color = '#8c8c8c';

new Chart(ctx, {
type: 'line',
data: {
    labels: ['0', '10h','10:30h','11:00h'],
    datasets: [{
    label:"a",
    data: [0,1,0,1],
    borderWidth: 1,
    backgroundColor:'#FF6F00',
    borderColor: '#FF6F00',
    }]
},
options: {
    plugins: {
        legend:false
    },
    scales: {
    y: {
        beginAtZero: true
    },

    },
    layout:{
        padding:{
            left:20,
            right:20,
            top:30,
            bottom:10,
            
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
        legend:{
            labels:{
                color:"white",
            }
        },
        responsive:true,
        maintainAspectRatio:false
    }
});

