

const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');


Chart.defaults.color = '#8c8c8c';

new Chart(ctx, {
type: 'line',
data: {
    labels: ['HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS',],
    datasets: [{
    data: [0,1,0,1,1,1,1,0,0,0],
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
        labels: ['HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS','HH:MM:SS',],
        datasets: [{
        label:"a",
        data: [0,1,0,0,1,1,1,0,0,0],
        borderWidth: 1,
        backgroundColor:'#3F51B5',
        borderColor: '#3F51B5'
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
    