//Default api of ASP.Net web service
var url = 'api/currencies/';
var table = document.createElement("table");
//
var data = $.getJSON(url);
//Action on page generation
$(document).ready(function () {
    getCurrencies();
});

//Function adding options to select
function getCharCodes(item,selector) {
    var select = document.getElementById(selector);
    var opt = document.createElement('option');
    opt.value = item["Буквенный код"];
    opt.innerHTML = item["Буквенный код"];
    select.appendChild(opt);
}

function convert() {
    //CurrencyChar #1
    var curr1 = document.getElementById('curr1');
    //CurrencyChar #2
    var curr2 = document.getElementById('curr2');
    //Output <span>
    var output = document.getElementById('converterOutput');
    //Currencty value #1
    var val1;
    //Currency value #2
    var val2;
    //Searching for values
    data
        .done(function(data) {
            $.each(data,
                function(key, item) {
                    if (item['Буквенный код'] == curr1.value) val1 = item['Цена за единицу'];
                    if (item['Буквенный код'] == curr2.value) val2 = item['Цена за единицу'];
                });
            //Format of output
            output.innerHTML = ' = ' + val1 / val2;
        });
}

//Function of making table
function getCurrencies() {
    $("#currenciesTable tr").remove();
    data
        .done(function (data) {
            var tr = table.insertRow(-1);
            //Making table headers
            for (var key in data[0]) {
                var th = document.createElement("th");
                th.innerHTML = key;
                tr.appendChild(th);
            }
            //Filling table with currencies
            $.each(data,
                function (key, item) {
                    var tr = table.insertRow(-1);
                    getCharCodes(item, 'curr1');
                    getCharCodes(item, 'curr2');
                    for (var val in item) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = item[val];
                    }
                });
        });
    var divContainer = document.getElementById("currenciesTable");
    divContainer.appendChild(table);
}

$(function () {
    //Calendar format
    $.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        monthNamesShort: [
            "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: ""
    };
    $.datepicker.setDefaults($.datepicker.regional.ru);
    //Calendar parameters
    $("#calendar").datepicker({
        dateFormat: "yy-mm-dd",
        changeYear: true,
        minDate: new Date(1996, 10 - 1, 1),
        maxDate: new Date(),
        yearRange: "-100:+0",
        setDate: new Date(2012, 2 - 1, 23),
        //On select action
        onSelect: function (date) {
            //Added date to API url
            url = 'api/currencies/' + date;
            //Refreshing data with new date currencies
            data = $.getJSON(url);
            //Refreshing table and <select>'s
            getCurrencies();
        }
    });
    $('#calendar').datepicker({ dateFormat: 'yy-mm-dd' }).
        datepicker('setDate', new Date());
});
