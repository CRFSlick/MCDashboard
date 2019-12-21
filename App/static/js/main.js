
bootstrapColors = {
    'primary': '#4e73df',
    'secondary': '#858796',
    'success': '#1cc88a',
    'info': '#36b9cc',
    'warning': '#f6c23e',
    'danger': '#e74a3b',
    'light': '#f8f9fc',
    'dark': '#5a5c69'
}

$(document).ready(function () {

    reportCircles = {
        'cpu': createReportCircle('cpu'),
        'ram': createReportCircle('ram'),
        'disk': createReportCircle('disk'),
        'players': createReportCircle('players')
    };

    $('#testbutton').click(function () {
        setCircle('cpu', 24)
    });

    $('#testbutton1').click(function () {
        setCircle('disk', 80)
    });

    $('#testbutton2').click(function () {
        setCircle('ram', 98)
    });

    $('#testbutton3').click(function () {
        setCircle('players', 8)
    });
});

function createReportCircle(id) {

    var total;
    var color;
    var symbol;
    var circleValues = {}

    if (id == 'players') {
        total = 20;
        symbol = `/${total}`;
    }
    else {
        total = 100;
        symbol = '%';
    }

    if ($(`#container.circle-report.${id}`).hasClass('primary')) {
        color = bootstrapColors['primary'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('secondary')) {
        color = bootstrapColors['secondary'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('success')) {
        color = bootstrapColors['success'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('info')) {
        color = bootstrapColors['info'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('warning')) {
        color = bootstrapColors['warning'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('danger')) {
        color = bootstrapColors['danger'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('light')) {
        color = bootstrapColors['light'];
    }

    if ($(`#container.circle-report.${id}`).hasClass('dark')) {
        color = bootstrapColors['dark'];
    }


    circleValues = {
        strokeWidth: 6,
        color: color,
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
            value: '',
            alignToBottom: false
        },
        from: { color: color },
        to: { color: color },
        // Set default step function for all animate calls
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * total) + symbol;

            if (value === 0) {
                bar.setText('');
            } else {
                bar.setText(value);
            }

            bar.text.style.color = state.color;
            bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            bar.text.style.fontSize = '2rem';
        }
    }

    var circle = new ProgressBar.SemiCircle(`#container.circle-report.${id}`, circleValues);
    return circle;
}

function setCircle(id, value) {
    let total = 100;

    if (id == 'players') {
        total = 20;
    }

    console.log(total); 
    reportCircles[id].animate(value / total, total);
}