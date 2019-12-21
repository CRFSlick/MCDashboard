
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

    alert_event = setTimeout(function() {
		$('.alert').fadeOut();
	  }, 0);

    reportCircles = {
        'cpu': createReportCircle('cpu'),
        'ram': createReportCircle('ram'),
        'disk': createReportCircle('disk'),
        'players': createReportCircle('players')
    };

    $('#testbutton').click(function () {
        toastr.error('Bad Input', 'Error')
        toastr.success('Command executed successfully!', 'Success')
    });

    $('#testbutton0').click(function () {
        setCircle('cpu', 52);
    });
    $('#testbutton1').click(function () {
        setCircle('ram', 79);
    });

    $('#testbutton2').click(function () {
        setCircle('disk', 23);
    });

    $('#testbutton3').click(function () {
        setCircle('players', 8);
    });

    $('#testbutton4').click(function () {
        setCircle('cpu', 52);
        setCircle('ram', 79);
        setCircle('disk', 23);
        setCircle('players', 8);
    });

    $('#testbutton5').click(function () {
        setCircle('cpu', 0);
        setCircle('ram', 0);
        setCircle('disk', 0);
        setCircle('players', 0);
    });

    $('#testbutton6').click(function () {
        $.ajax({
            data : {
                cmd : $('#command-input').val()
            },
            type : 'GET',
            url : '/api/console',
            timeout: 15000
        })
        .done(function(data) {
            // stopSpinner('search');
    
            if (data.cod == '200') {
                toastr.success('Command executed successfully!', 'Success');
                console.log(data);
            }
            else {
                toastr.error(data.error.msg, data.error.type);
                // alertError(data.error.type, data.error.msg);
                // hideAlerts();
                // hideElementsForSearch();
                // $('*').promise().done(function(){
                //     displayData(data.api_response);
                //     LAST_API_RESPONSE = data.api_response;
                // });
                // showWeatherCard();
            }
        }).fail(function(jqXHR, textStatus){
            // stopSpinner('search');
            if(textStatus === 'timeout')
            {
                alertError('Timeout Error', 'The server took too long to respond. Please try again!');
                // toastr.error('TimeoutError', 'Error')
            }
            else {
                alertError('Internal Server Error', 'Something went wrong on our end. Please try again later.');
            }
        });
    })

    function clearAlerts() {
        clearTimeout(alert_event);
        $('.alert').each(function () {
            $(this).fadeOut()
        })
    }

    function alertSuccess(type, msg) {
        clearAlerts();
        $('*').promise().done(function() {
            type = `${type}: `;
            $('#successAlert > #alert').text(type);
            $('#successAlert > #msg').text(msg);
            $('#successAlert').fadeIn();
            alert_event = setTimeout(function() {
                $('#successAlert').fadeOut();
              }, 8000);
        });
    }

    function alertError(type, msg) {
        clearAlerts();
        $('*').promise().done(function() {
            type = `${type}: `;
            $('#errorAlert > #alert').text(type);
            $('#errorAlert > #msg').text(msg);
            $('#errorAlert').fadeIn();
            alert_event = setTimeout(function() {
                $('#errorAlert').fadeOut();
              }, 8000);
        });
    }

    function alertWarning(warning) {
        clearAlerts();
        $('*').promise().done(function() {
            clearTimeout(warning_event);
            $('#warningAlert').text(warning).fadeIn();
            warning_event = setTimeout(function() {
                $('#warningAlert').fadeOut();
              }, 8000);
        });
    }

});

function createReportCircle(id) {

    var total;
    var color;
    var symbol;
    var fontSize;
    var circleValues = {}

    if (id == 'players') {
        total = 20;
        symbol = `/${total}`;
        fontSize = 2
    } 
    else if (id == 'ram') {
        total = 16;
        symbol = `/${total}gb`;
        fontSize = 2
    }
    else if (id == 'disk') {
        total = 500;
        symbol = `/${total}gb`;
        fontSize = 1.5
    }
    else {
        total = 100;
        symbol = '%';
        fontSize = 2
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
            bar.text.style.fontSize = `${fontSize}rem`;
            bar.text.style.top = '';
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