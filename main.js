if (!window.ActivityManager) { function DABManager() { this.activityCount = 0, this.currentLocation = window.location, this.activeObservers = [], this.activeIntervals = [], this.activityContexts = {}, this.pageActivityList = [] } DABManager.prototype.startActivity = function (t) { try { this.activityContexts[t].initFunc() } catch (i) { console.log("Activity failed to start: " + t + "\nError: ", i) } }, DABManager.prototype.registerActivity = function ({ name: t, initFunc: i, intervalList: e = null, observer: s = null }) { try { this.pageActivityList.push(t), this.activityContexts[t] = { initFunc: i }, this.activityCount += 1, null !== e ? this.createInterval(t, e) : this.startActivity(t), null != s && this.createObserver(t, s.target, s.config, s.callback) } catch (c) { console.log(c) } }, DABManager.prototype.createObserver = function (t, i, e, s) { let c = new MutationObserver(s); c.observe(i, e), this.activeObservers.push({ activity: t, observer: c, target: i, config: e, callback: s }), this.activityContexts[t].observer = c }, DABManager.prototype.stopObserver = function (t) { this.activityContexts[t].observer.disconnect(); let i = this.activeObservers.findIndex(i => i.activity == t); this.activeObservers.splice(i, 1) }, DABManager.prototype.createInterval = function (t, i) { let e = this; i = Array.isArray(i) ? i.join(",") : i; var s = setInterval(function () { if ($(i).length) { e.startActivity(t); let c = e.activeIntervals.findIndex(i => i.activity == t); e.activeIntervals.splice(c, 1), clearInterval(s) } }, 250); this.activeIntervals.push({ activity: t, callback: arguments.callee, contextList: i }), this.activityContexts[t].interval = this.activeIntervals[this.activeIntervals.length - 1] }, console.log("Initializing DAB Manager..."), window.ActivityManager = new DABManager }

async function callFRAPI(url = '', method = 'GET', data = {}) {
    // Default options are marked with *
    let params = {
        method: method,
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            '__RequestVerificationToken': $("#csrfToken").val(),
            'Sec-Fetch-Mode': 'cors'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'same-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    if (method == 'GET') {
        delete params.body;
    }

    const response = await fetch(url, params);
    return response.json(); // parses JSON response into native JavaScript objects
}

callFRAPI("/api/LiftAccessApi/GetPasses", "POST").then(data => {
    tamPassData = data;
})

let dabActivity = {
    name: "DAB-Lift-Booking-Redesign",
    initFunc: function () {
        // DESC: This function will properly arrange and format each of the widget's components to resemble the EDP widget
        // OWNER: Brock
        function arrangeWidget() {
            let liftWidgetElem =
                `<div id='DAB-Lift-Booking-Widget'>

            ${addCalendar()}
            <div class="pass_configuration__button_selection">
                <div class="pass_configuration__button_selection__button_label">
                    <h4 class="c146__holidaylabel--v1 uppercase" id="dab_ticket_selector_title">NUMBER OF DAYS</h4>
                </div>
                <div class="pass_configuration__day_selector">
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="1">
                        <div class="c143__holidaytoggle--v3">1</div>
                    </label>
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="2">
                        <div class="c143__holidaytoggle--v3">2</div>
                    </label>
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="3">
                        <div class="c143__holidaytoggle--v3">3</div>
                    </label>
                    <label aria-checked="true" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="4">
                        <div class="c143__holidaytoggle--v3">4</div>
                    </label>
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="5">
                        <div class="c143__holidaytoggle--v3">5</div>
                    </label>
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="6">
                            <div class="c143__holidaytoggle--v3">6</div>
                    </label>
                    <label aria-checked="false" tabindex="0" class="pass_configuration__day_selector__button form-control radio radio--custom " manualtoggleid="">
                        <input type="radio" tabindex="-1" value="7" checked="">
                        <div class="c143__holidaytoggle--v1">7</div>
                    </label>
                </div>
                <div>
                    <h5 id="number_of_days_ski_or_ride_text">Ski or ride any 4 days within a 6-day window starting on 11/14/2023</h5>
                </div>
            </div>
            <div class="pass_configuration__pass_products">
                <div class="pass_configuration__button_selection__button_label">
                    <h4 class="c146__holidaylabel--v1 uppercase" id="dab_ticket_selector_title">NUMBER OF TICKETS</h4>
                </div>
                <div class="pass_configuration__product" id="adult_tickets">
                    <div class="pass_configuration__product__pricing">
                        <div class="pass_configuration__product__pricing__price"><span class="c146__price--v1">$639</span>&nbsp;</div>
                        <div class="pass_configuration__product__pricing__age_info"><span class="c146__agelabel--v1">Adult</span><span class="c146__age--v1">&nbsp;(Ages 18 - 64)</span></div>
                        <div class="pass_configuration__product__pricing__price_per_day c146__perday--v1">$92&nbsp;Per Day</div>
                    </div>
                    <div class="pass_configuration__product__count">
                        <div class="number_count_input_react"><button class="number_count_input_react__button icon-global-minus "><span class="sr-only">Decrease Quantity</span></button><label class="sr-only">Quantity</label><input type="number" class="number_count_input_react__count c40__qty--v1" min="0" max="9" readonly="" tabindex="-1" aria-live="assertive" aria-atomic="true" aria-label="Quantity" value="1"><button class="number_count_input_react__button icon-global-plus "><span class="sr-only">. Increase Quantity</span></button></div></div>
                    </div>
                        <div class="pass_configuration__product" id="child_tickets">
                            <div class="pass_configuration__product__pricing">
                                <div class="pass_configuration__product__pricing__price"><span class="c146__price--v1">$333</span>&nbsp;</div>
                                <div class="pass_configuration__product__pricing__age_info"><span class="c146__agelabel--v1">Child</span><span class="c146__age--v1">&nbsp;(Ages 5 - 12)</span></div>
                                <div class="pass_configuration__product__pricing__price_per_day c146__perday--v1">$48&nbsp;Per Day</div>
                            </div>
                            <div class="pass_configuration__product__count">
                                <div class="number_count_input_react"><button class="number_count_input_react__button icon-global-minus disabled" tabindex="-1"><span class="sr-only">Decrease Quantity</span></button><label class="sr-only">Quantity</label><input type="number" class="number_count_input_react__count c40__qty--v1" min="0" max="9" readonly="" tabindex="-1" aria-live="assertive" aria-atomic="true" aria-label="Quantity" value="0"><button class="number_count_input_react__button icon-global-plus "><span class="sr-only">. Increase Quantity</span></button></div>
                            </div>
                        </div>

                    </div>
                        <div class="pass_configuration_payment">
                        <div class="pass_configuration__payment_totals">
                            <div class="pass_configuration__payment_totals__total">
                                <div class="c143__label--v1 pass_configuration__payment_totals__label">Total</div>
                                <div class="c143__subtotal--v1">$639</div>
                                <div class="over_same_day_prices_savings_text">
                                    <h5 class="save_x_over_same_day_prices" id="save_x">SAVE $208</h5>
                                    <h5 class="save_x_over_same_day_prices" id="over_same_day_prices">OVER SAME DAY PRICES</h5>
                                </div>
                            </div>
                        </div>
                        </div>
                        <button class="btn primaryCTA pass_configuration__add_to_cart ">Add to Cart</button>
                        <div class="below_addToCart_text_container">
                            <span id="dab_below_addToCart_text_head">LAST CHANCE!</span>
                            <span id="dab_below_addToCart_text_bottom">FOR THE LOWEST PRICE BOOK BY 11/13</span>
                        </div>
                    </div>
                </div>
                `
            let props = $("#c21_Product_Filters_1 > *:not([class='row'])");
            $("#c21_Product_Filters_1").prepend("<div id='dab-value-prop-container'></div>")
            $("#dab-value-prop-container").append(props);
            formatValueProps()

            $("#c21_Product_Filters_1 .liftTickets__filters").parent().before(liftWidgetElem);
            $("#c21_Product_Filters_1 .liftTickets__filters").parent()[0].style.visibility = 'hidden'
            $('#c21_Product_Filters_1 > div.row').insertBefore($('.lessonBooking__right-col__date_selection_container'))
            $('#DAB-Lift-Booking-Widget > div.row')[0].style.height = 0
        }

        var liftWidgetSelections = {
            'dateOnTheSlopes': '10/31/24'
            // ^ dummy date
            , 'numberOfDays': 4
            // ^ default
            , 'numberOfTickets': {
                'adult': 1
                , 'child': 0
                , 'teen': 0
                , 'senior': 0
            }
        }

        // initial API calls
        var currentPassData = {}
        function getPassData(date) {
            // date must follow MM/DD/YYYY format
            ticketManager.api.getTickets(date, 'Adult').then((adultResponse) => { currentPassData['Adult'] = adultResponse });
            ticketManager.api.getTickets(date, 'Child').then((childResponse) => { currentPassData['Child'] = childResponse });
            ticketManager.api.getTickets(date, 'Teen').then((teenResponse) => { currentPassData['Teen'] = teenResponse });
            ticketManager.api.getTickets(date, 'Senior').then((seniorResponse) => { currentPassData['Senior'] = seniorResponse });
            return currentPassData;
        }

        function readjustTicketPrices() {
            $('.pass_configuration__day_selector__button, #adult_tickets .icon-global-plus, #adult_tickets .icon-global-minus, #child_tickets .icon-global-plus, #child_tickets .icon-global-minus, #teen_tickets .icon-global-plus, #teen_tickets .icon-global-minus, #senior_tickets .icon-global-plus, #senior_tickets .icon-global-minus').on('click', () => {
                adjustTicketPrices();
            });
        }

        function hideTicketCounters() {
            // this function hides ticket counters for lift ticket types that are not offered on a site, for example, Teen tickets on vail.com
            let passString = '';
            for (const [key, value] of Object.entries(currentPassData)) {
                if (value.length === 0) {
                    $('#' + key.toLowerCase() + '_tickets').remove();
                } else {
                    passString = key + passString;
                }
            }
            if (passString === 'AdultChild' || passString === 'ChildAdult') {
                $('.dab_more_ages_container').hide();
            }
        }

        // DESC: This function will add/format the calendar input to a 5-day view
        // OWNER: JD
        function addCalendar(date) {
            let calendar = createCalendar(date)
            // $(calendar).before($('.pass_configuration__button_selection'))
            return createCalendar(date)
        }
        // Function creates the main 5 day card divs
        function createMainDateDiv(date) {
            function getNextFiveDays(date) {
                let today
                if (!date) {
                    date = new Date()
                    today = new Date()
                } else {
                    date = new Date(date);
                    today = new Date(date);
                }
                let days = [];
                for (let i = 0; i < 6; i++) {
                    let currentDate = new Date(today);
                    currentDate.setDate(today.getDate() + i);
                    let day = currentDate.getDate().toString().padStart(2, '0');
                    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    let year = currentDate.getFullYear();

                    let formattedDate = `${month}/${day}/${year}`;
                    days.push(formattedDate);
                }
                return days;
            }
            let dates = getNextFiveDays(date);
            let dateDivArr = []
            for (let i = 0; i < 5; i++) {
                let dateFull = dates[i]
                let month = dateFull.split('/')[0]
                let dayNum = dateFull.split('/')[1]
                let day = dateFull.split('/')[2]
                dateDivArr.push(createSingleDateDiv(dateFull, month, dayNum, day, i))
            }
            return dateDivArr
        }
        // Function asists the above function in creation of main 5 day divs
        function createSingleDateDiv(dateFull, month, dayNum, day, index) {
            let dateDiv = ''
            if (index == 0) {
                dateDiv = `<div data-index="0" class="slick-slide slick-active slick-current" tabindex="-1" aria-hidden="false" style="outline: none; width: 63px;">
                                <div>
                                    <div class=" ">
                                        <span aria-live="polite" class="sr-only"></span>
                                        <label aria-checked="true" tabindex="0" role="radio" class="calendarCard__date_selector__button radio radio--custom " manualtoggleid="">
                                            <input type="radio" tabindex="-1" value="${dateFull}" checked="">
                                            <div class="calendarCard__date_selector__button__content">
                                                <span class="calendarCard__date_selector__button__content__month">${month}</span>
                                                <span class="calendarCard__date_selector__button__content__date">${dayNum}</span>
                                                <span class="calendarCard__date_selector__button__content__day">${day}</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>`
            } else {
                dateDiv = `<div data-index="${index}" class="slick-slide slick-active" tabindex="-1" aria-hidden="false" style="outline: none; width: 63px;">
                            <div>
                                <div class=" ">
                                    <span aria-live="polite" class="sr-only"></span>
                                    <label aria-checked="false" tabindex="0" role="radio" class="calendarCard__date_selector__button radio radio--custom " manualtoggleid="">
                                        <input type="radio" tabindex="-1" value="${dateFull}">
                                        <div class="calendarCard__date_selector__button__content">
                                            <span class="calendarCard__date_selector__button__content__month">${month}</span>
                                            <span class="calendarCard__date_selector__button__content__date">${dayNum}</span>
                                            <span class="calendarCard__date_selector__button__content__day">${day}</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>`
            }
            return dateDiv;
        }
        // Function creates the hidden day divs that are used to create the slick slider
        function createHiddenDateDivs() {
            let hiddenDateDiv = '<div data-index="5" class="slick-slide" tabindex="-1" aria-hidden="true" style="outline: none; width: 63px;"></div>'
            let hiddenDateDivArr = []
            // need to create 160 of the hidden divs 
            for (let i = 0; i < 160; i++) {
                hiddenDateDivArr.push(hiddenDateDiv)
            }
            return hiddenDateDivArr
        }

        // Function creates the date banner div
        function createDateBannerDiv(date) {
            let shortWeekday, longMonthAndDay, year;
            !date ? shortWeekday = new Date().toLocaleString('en-us', { weekday: 'short' }) : shortWeekday = new Date(date).toLocaleString('en-us', { weekday: 'short' })
            !date ? shortWeekday = new Date().toLocaleString('en-us', { weekday: 'short' }) : shortWeekday = new Date(date).toLocaleString('en-us', { weekday: 'short' })
            !date ? longMonthAndDay = new Date().toLocaleString('en-us', { month: 'long', day: 'numeric' }) : longMonthAndDay = new Date(date).toLocaleString('en-us', { month: 'long', day: 'numeric' })
            !date ? year = new Date().getFullYear().toString() : year = new Date(date).getFullYear().toString()


            let dateBannerDiv = `<div class="lessonBooking__right-col__date_selection_container__date-picker">
                                <span id="calendarCard_inputfield_dab" class="inputfieldlabel">
                                    ${shortWeekday}, ${longMonthAndDay}, ${year}
                                </span>
                                <span id="calendarCard_inputfield_dab" class="inputfieldlabel verticalDivider"> |</span>
                                <a href="#" id="calendarCard_date_button_dab" class="inputfieldlabel lessonBooking__right-col__date_selection_container__date-picker__change-button">
                                    CHANGE DATE
                                </a>
                            </div>`
            return dateBannerDiv
        }

        function getCurrentDate() {
            let today = new Date()
            let currentDate = new Date();
            currentDate.setDate(today.getDate() + i);
            let day = currentDate.getDate().toString().padStart(2, '0');
            let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            let year = currentDate.getFullYear();
            let formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
        }


        // Function creates the main calendar CONTAINER div (holds the main div, hidden div and banner div)
        function createCalendarContainerDiv(date) {
            let mainDateDiv = createMainDateDiv(date)
            let hiddenDateDiv = createHiddenDateDivs()
            let dateBannerDiv = createDateBannerDiv(date)
            let today = getCurrentDate()
            let firstMainDate = mainDateDiv[0].substring(mainDateDiv[0].indexOf('value="') + 7, mainDateDiv[0].indexOf('value="') + 17)
            let prevButton
            if (today == firstMainDate) {
                prevButton = `
                <button  class="calendarCard__date_selector__arrow calendarCard__date_selector__prev_arrow slick-arrow slick-prev slick-disabled" aria-label="Prev">
                    <i class="icon-arrow-gallery-left"></i>
                </button>`
            } else {
                prevButton = `
                <button  class="calendarCard__date_selector__arrow calendarCard__date_selector__prev_arrow slick-arrow slick-prev" aria-label="Prev">
                    <i class="icon-arrow-gallery-left"></i>
                </button>`
            }
            let calendarContainerDiv = `<div class="lessonBooking__right-col__date_selection_container">
                                        <h4 class="c146__holidaylabel--v1 uppercase" id="dab_ticket_selector_title">
                                            FIRST DATE ON THE SLOPES
                                        </h4>
                                        <div class="calendarCard__container">
                                            <div class="calendarCard__date_selector">
                                                <div class="slick-slider slick-initialized" dir="ltr">
                                                    ${prevButton}
                                                <div class="slick-list">
                                                    <div class="slick-track" style="width: 10521px; opacity: 1; transform: translate3d(0px, 0px, 0px);">
                                                        ${mainDateDiv.join(' ')}
                                                        ${hiddenDateDiv.join(' ')}
                                                    </div>
                                                </div>
                                                    <button class="calendarCard__date_selector__arrow calendarCard__date_selector__next_arrow slick-arrow slick-next" aria-label="Next">
                                                        <i class="icon-arrow-gallery-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        ${dateBannerDiv}
                                    </div>`
            return calendarContainerDiv
        }
        // Function creates the calendar div 
        function createCalendar(date) {
            let calendar = createCalendarContainerDiv(date)
            if (date) {
                $('.lessonBooking__right-col__date_selection_container').replaceWith(calendar)
            } else {
                return calendar
            }
        }

        function clickCalendarWidgetHandler() {
            $('.table-condensed tr td').not('td.day.disabled').on('click', (e) => {
                reformatDate()
            })
        }

        function openCalendarWidget() {
            $('#calendarCard_date_button_dab').on('click', (e) => {
                e.preventDefault()
                e.stopImmediatePropagation()
                $('.input-group-addon').click()
                $('.bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom.pull-right').css({ 'display': 'block', 'inset': '58px 0px auto 58px', 'position': 'absolute', 'visibility': 'visible' })
                clickCalendarWidgetHandler()
                var dom_observer = new MutationObserver(function (mutation) {
                    if ($('.bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom.pull-right').length > 0) {
                        $('.bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom.pull-right').css({ 'display': 'block', 'inset': '58px 0px auto 58px', 'position': 'absolute', 'visibility': 'visible' })
                        $('.datepicker-days.datepicker-days-with-disclaimer').css({ 'margin-bottom': '0px' })
                        clickCalendarWidgetHandler()
                    }
                });
                var container = $('.form-group.datePicker')[0]
                var config = { attributes: true, childList: true, characterData: true, subtree: true };
                dom_observer.observe(container, config);
            })
        }

        function getPreviousDate(date) {
            let today = new Date(date)
            let previousDate = new Date(date);
            previousDate.setDate(today.getDate() - 1); // Get the previous day

            // Format the date as MM/DD/YYYY
            let month = String(previousDate.getMonth() + 1).padStart(2, '0');
            let day = String(previousDate.getDate()).padStart(2, '0');
            let year = previousDate.getFullYear();

            return `${month}/${day}/${year}`;
        } // Output: DD/MM/YYYY format of the previous date

        function reformatDate() {
            let formatDateInt = setInterval(() => {
                try {
                    if (($('.datePicker__sub-label.inputfield')[0].innerHTML.length > 1)) {
                        clearInterval(formatDateInt);
                        let inputDate = $('.datePicker__sub-label.inputfield')[0].innerHTML
                        let months = [
                            'January', 'February', 'March', 'April', 'May', 'June', 'July',
                            'August', 'September', 'October', 'November', 'December'
                        ];

                        let parts = inputDate.split(' '); // Split the input date string
                        let monthIndex = months.indexOf(parts[1]); // Get the month index
                        let day = parseInt(parts[2].replace(',', '')); // Get the day
                        let year = parseInt(parts[3]); // Get the year

                        // Format the date as MM/DD/YYYY
                        let formattedDate = `${monthIndex + 1}/${day}/${year}`;
                        let newDate = formattedDate
                        let newCalendarDiv = createCalendarContainerDiv(newDate)
                        $('.lessonBooking__right-col__date_selection_container').replaceWith(newCalendarDiv)
                        // $('.calendarCard__date_selector__arrow.calendarCard__date_selector__prev_arrow.slick-arrow.slick-prev.slick-disabled').removeClass('slick-disabled')
                        calendarClickHandler()
                        openCalendarWidget()
                    }
                } catch (err) { }

            }, 100)

        }

        function calendarClickHandler() {
            $('.slick-slide.slick-active').on('click', (e) => {
                Array.from($('.calendarCard__date_selector__button.radio.radio--custom')).forEach(day => {
                    day.attributes['aria-checked'].value = 'false'
                })
                e.target.parentNode.ariaChecked = 'true'
                let bannerDiv = createDateBannerDiv(e.currentTarget.innerText.replaceAll('\n', '/'))
                $('.lessonBooking__right-col__date_selection_container__date-picker').replaceWith(bannerDiv)
                getPassData('12/24/2023');
                openCalendarWidget()
            })

            $('.calendarCard__date_selector__arrow.calendarCard__date_selector__next_arrow.slick-arrow.slick-next').on('click', (e) => {
                let newCalendarDiv = createCalendarContainerDiv($('.calendarCard__date_selector__button__content')[1].innerText.replaceAll('\n', '/'))
                $('.lessonBooking__right-col__date_selection_container').replaceWith(newCalendarDiv)
                $('.calendarCard__date_selector__arrow.calendarCard__date_selector__prev_arrow.slick-arrow.slick-prev.slick-disabled').removeClass('slick-disabled')
                calendarClickHandler()
                openCalendarWidget()
                // addCalendar($('.calendarCard__date_selector__button__content')[1].innerText.replaceAll('\n', '/'))
            })

            $('.calendarCard__date_selector__arrow.calendarCard__date_selector__prev_arrow.slick-arrow.slick-prev').on('click', (e) => {
                let previousDayDate = getPreviousDate($('.calendarCard__date_selector__button__content')[0].innerText.replaceAll('\n', '/'))
                let newCalendarDiv = createCalendarContainerDiv(previousDayDate)
                $('.lessonBooking__right-col__date_selection_container').replaceWith(newCalendarDiv)
                // $('.calendarCard__date_selector__arrow.calendarCard__date_selector__prev_arrow.slick-arrow.slick-prev.slick-disabled').addClass('slick-disabled')
                calendarClickHandler()
                openCalendarWidget()
                // addCalendar($('.calendarCard__date_selector__button__content')[1].innerText.replaceAll('\n', '/'))
            })


        }


        function formatLiftTicketText() {
            // change font of "LIFT TICKETS"
            // $('#dab-value-prop-container > h2.liftTickets__title.c129__title--v1').css({'font-family':'Prompt'});
            let textElem = `
                <h2 id="buy_early_save_25">BUY EARLY & SAVE UP TO 23%</h2>
            `
            $(textElem).insertAfter('#dab-value-prop-container > h2.liftTickets__title.c129__title--v1');
            let imgContainerElem = `
                <div>
                    <img  class="dab-lift-ticket-image-container"src="https://scene7.vailresorts.com/is/image/vailresorts/20130305_VL_Affleck_006:Large-Hero?resMode=sharp2&w=2880&h=900&wid=1201&fit=constrain,1&dpr=on,2"></img>
                </div>
            `
            // placeholder DAM asset
            $(imgContainerElem).insertAfter('#dab-value-prop-container > div.liftTickets__flex');
        }

        // DESC: This function will add/format the input to choose a number of ski/ride days
        // OWNER: Sam
        function addNumberOfDays() {
            $('.pass_configuration__day_selector > .pass_configuration__day_selector__button').on('click', (e) => {
                Array.from($('.pass_configuration__day_selector__button.radio.radio--custom')).forEach(dayNum => {
                    dayNum.attributes['aria-checked'].value = 'false';
                })
                e.target.parentNode.ariaChecked = 'true';
                liftWidgetSelections['numberOfDays'] = e.target.attributes.value.value;
                updateSkiOrRideText();
            })
        }
        function updateSkiOrRideText() {
            let numberOfDays = liftWidgetSelections['numberOfDays'];
            let selectorLength = $('.pass_configuration__day_selector__button.radio.radio--custom').length;
            let completeString;
            let str;
            switch (numberOfDays) {
                case '1':
                    selectorLength === 2 ? str = 'Valid 1 day on ' : str = 'Valid 1 day on '
                    break;
                case '2':
                    selectorLength === 2 ? str = 'Valid 2 days between ' : str = 'Ski or ride any 2 days within a 3-day window starting on '
                    break;
                case '3':
                    str = 'Ski or ride any 3 days within a 5-day window starting on '
                    break;
                case '4':
                    str = 'Ski or ride any 4 days within a 6-day window starting on '
                    break;
                case '5':
                    str = 'Ski or ride any 5 days within a 8-day window starting on '
                    break;
                case '6':
                    str = 'Ski or ride any 2 days within a 9-day window starting on '
                    break;
                case '7':
                    str = 'Ski or ride any 7 days within a 10-day window starting on '
            }
            (selectorLength === 2 && numberOfDays === '2') ? completeString = str + liftWidgetSelections['selectedDate'] + ' - ' + $('.slick-slide.slick-active label[aria-checked="true"] input[type="radio"]').attr('value') : completeString = str + $('.slick-slide.slick-active label[aria-checked="true"] input[type="radio"]').attr('value');
            $('#number_of_days_ski_or_ride_text').text(completeString);
        }
        function reduceNumberOfDays() {
            // need a complete list of sites that only offer 2 day lift tickets
            let numDayArray = Array.from($('.pass_configuration__day_selector__button.radio.radio--custom'));
            for (let i = 2; i < numDayArray.length; i++) {
                numDayArray[i].remove();
            }
            // $('#number_of_days_ski_or_ride_text').text('Valid 2 days between 11/14/2023 - 11/16/2023');
        }
        // DESC: This function will add/format the number of tickets per age group inputs
        // OWNER: JD
        function addNumberOfTickets() {
            // proof of concept, feel free to scrap if not useful
            // JD, I added the IDs #adult_tickets, #child_tickets, #teen_tickets, and #senior_tickets to each of the ticket counter containers
            // to make it easier to grab the elements inside

            $('#adult_tickets .icon-global-plus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['adult'] < 9) {
                    let newTotalAdult = (liftWidgetSelections['numberOfTickets']['adult'] + 1);
                    $('#adult_tickets input[type="number"]')[0].value = newTotalAdult
                    liftWidgetSelections['numberOfTickets']['adult'] = newTotalAdult;
                }
            })
            $('#adult_tickets .icon-global-minus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['adult'] > 0) {
                    let newTotalAdult = (liftWidgetSelections['numberOfTickets']['adult'] - 1);
                    $('#adult_tickets input[type="number"]')[0].value = newTotalAdult
                    liftWidgetSelections['numberOfTickets']['adult'] = newTotalAdult;
                }
            })
            $('#child_tickets .icon-global-plus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['child'] < 9) {
                    let newTotalChild = (liftWidgetSelections['numberOfTickets']['child'] + 1);
                    $('#child_tickets input[type="number"]')[0].value = newTotalChild
                    liftWidgetSelections['numberOfTickets']['child'] = newTotalChild;
                }
            })
            $('#child_tickets .icon-global-minus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['child'] > 0) {
                    let newTotalChild = (liftWidgetSelections['numberOfTickets']['child'] - 1);
                    $('#child_tickets input[type="number"]')[0].value = newTotalChild
                    liftWidgetSelections['numberOfTickets']['child'] = newTotalChild;
                }
            })
            $('#teen_tickets .icon-global-plus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['teen'] < 9) {
                    let newTotalTeen = (liftWidgetSelections['numberOfTickets']['teen'] + 1);
                    $('#teen_tickets input[type="number"]')[0].value = newTotalTeen
                    liftWidgetSelections['numberOfTickets']['teen'] = newTotalTeen;
                }
            })
            $('#teen_tickets .icon-global-minus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['teen'] > 0) {
                    let newTotalTeen = (liftWidgetSelections['numberOfTickets']['teen'] - 1);
                    $('#teen_tickets input[type="number"]')[0].value = newTotalTeen
                    liftWidgetSelections['numberOfTickets']['teen'] = newTotalTeen;
                }
            })
            $('#senior_tickets .icon-global-plus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['senior'] < 9) {
                    let newTotalSenior = (liftWidgetSelections['numberOfTickets']['senior'] + 1);
                    $('#senior_tickets input[type="number"]')[0].value = newTotalSenior
                    liftWidgetSelections['numberOfTickets']['senior'] = newTotalSenior;
                }
            })
            $('#senior_tickets .icon-global-minus').on('click', () => {
                if (liftWidgetSelections['numberOfTickets']['senior'] > 0) {
                    let newTotalSenior = (liftWidgetSelections['numberOfTickets']['senior'] - 1);
                    $('#senior_tickets input[type="number"]')[0].value = newTotalSenior
                    liftWidgetSelections['numberOfTickets']['senior'] = newTotalSenior;
                }
            })
            // adjustTicketPrices();
            readjustTicketPrices()
        }
        function adjustTicketPrices() {
            // must invoke getPassData() to get this to work
            let ticketAges = ['Adult', 'Child', 'Teen', 'Senior', 'College'];
            let numDays = parseInt($('.pass_configuration__day_selector > label[aria-checked="true"] > input[type="radio"]')[0].value);

            for (let i = 0; i < ticketAges.length; i++) {
                try {
                    $('#' + ticketAges[i].toLowerCase() + '_tickets span[class="c146__price--v1"]').text(
                        '$' + (parseInt($('#' + ticketAges[i].toLowerCase() + '_tickets input[type="number"]')[0].value) * currentPassData[ticketAges[i]][numDays - 1]['Price'])
                    );
                    $('#' + ticketAges[i].toLowerCase() + '_tickets .pass_configuration__product__pricing__price_per_day').text(
                        '$' + ((parseInt($('#' + ticketAges[i].toLowerCase() + '_tickets input[type="number"]')[0].value) * currentPassData[ticketAges[i]][numDays - 1]['Price']) / numDays) + ' PER DAY'
                    );
                } catch (error) {
                    console.log(error);
                }
            }
            let totalAmtOwed = (
                (parseInt($('#adult_tickets input[type="number"]')[0].value) * currentPassData['Adult'][numDays - 1]['Price']) +
                (parseInt($('#child_tickets input[type="number"]')[0].value) * currentPassData['Child'][numDays - 1]['Price']) +
                // (parseInt($('#teen_tickets input[type="number"]')[0].value)) * currentPassData['Teen'][numDays - 1]['Price']) + 
                (parseInt($('#senior_tickets input[type="number"]')[0].value) * currentPassData['Senior'][numDays - 1]['Price'])
            )
            $('#DAB-Lift-Booking-Widget > .pass_configuration_payment .c143__subtotal--v1').text('$' + totalAmtOwed);
        }

        function addAdditionalAgePasses() {
            let additionalAgePasses = `
            <div class="pass_configuration__product" id="teen_tickets">
                <div class="pass_configuration__product__pricing">
                    <div class="pass_configuration__product__pricing__price">
                        <span class="c146__price--v1">$639</span>&nbsp;
                    </div>
                    <div class="pass_configuration__product__pricing__age_info">
                        <span class="c146__agelabel--v1">Teen</span><span class="c146__age--v1">&nbsp;(Ages 13 - 17)</span>
                    </div>
                    <div class="pass_configuration__product__pricing__price_per_day c146__perday--v1">
                        $92&nbsp;Per Day
                    </div>
                </div>
                <div class="pass_configuration__product__count">
                    <div class="number_count_input_react">
                        <button class="number_count_input_react__button icon-global-minus ">
                            <span class="sr-only">Decrease Quantity</span>
                        </button>
                        <label class="sr-only">Quantity</label>
                        <input type="number" class="number_count_input_react__count c40__qty--v1" min="0" max="9" readonly="" tabindex="-1" aria-live="assertive" aria-atomic="true" aria-label="Quantity" value="1">
                        <button class="number_count_input_react__button icon-global-plus ">
                            <span class="sr-only">. Increase Quantity</span>
                        </button>
                    </div>
                </div>
                </div>
                <div class="pass_configuration__product" id="senior_tickets">
                <div class="pass_configuration__product__pricing">
                    <div class="pass_configuration__product__pricing__price">
                        <span class="c146__price--v1">$420</span>&nbsp;
                    </div>
                    <div class="pass_configuration__product__pricing__age_info">
                        <span class="c146__agelabel--v1">Senior</span>
                        <span class="c146__age--v1">&nbsp;(Ages 65+)</span>
                    </div>
                    <div class="pass_configuration__product__pricing__price_per_day c146__perday--v1">
                        $48&nbsp;Per Day
                    </div>
                </div>
                <div class="pass_configuration__product__count">
                    <div class="number_count_input_react">
                        <button class="number_count_input_react__button icon-global-minus disabled" tabindex="-1">
                            <span class="sr-only">Decrease Quantity</span>
                        </button>
                        <label class="sr-only">Quantity</label>
                        <input type="number" class="number_count_input_react__count c40__qty--v1" min="0" max="9" readonly="" tabindex="-1" aria-live="assertive" aria-atomic="true" aria-label="Quantity" value="0">
                        <button class="number_count_input_react__button icon-global-plus ">
                            <span class="sr-only">. Increase Quantity</span>
                        </button>
                    </div>
                </div>
            </div>`

            let moreAgesDropdown = `
                <div class="dab_more_ages_container" style="margin-bottom: 15px;">
                    <span class="dab_more_ages_dropdown_text c146__agelabel--v1">More Ages</span>
                    <span class="icon-arrow-dropdown-down dab_more_ages_dropdown_arrow" style="font-size: 15px;font-weight: 600;"></span>
                </div>
                ${additionalAgePasses}
            `


            $(moreAgesDropdown).insertAfter($('#child_tickets'));
            $('#teen_tickets').hide()
            $('#senior_tickets').hide()
            $('.dab_more_ages_container').on('click', (e) => {
                if ($('.dab_more_ages_dropdown_arrow')[0].className.includes('icon-arrow-dropdown-down')) {
                    $('.dab_more_ages_dropdown_arrow').removeClass('icon-arrow-dropdown-down').addClass('icon-arrow-dropdown-up');
                } else {
                    $('.dab_more_ages_dropdown_arrow').removeClass('icon-arrow-dropdown-up').addClass('icon-arrow-dropdown-down');
                }
                $('#teen_tickets').toggle()
                $('#senior_tickets').toggle()

            })
        }

        // DESC: This function will add/format the 'total' section, including the final price, add to cart button, and savings messaging.
        // OWNER: Sam
        function addTotalSection() {

        }

        // DESC: This function will format the value propositions on page, in addition to adding the photo shown in the Figma
        // OWNER: Sam
        // sam I added styling for the value props since it was in my last push before we merged
        function formatValueProps() {
            $('.valueProp.valueProp__single')[1].className += ' valueProp_dab';
            $('.valueProp.valueProp__single')[2].className += ' valueProp_dab';
        }

        setTimeout(() => {
            getPassData('12/24/2023');
            arrangeWidget();

            addNumberOfDays();
            // reduceNumberOfDays();
            // adjustTicketPrices();

            // hide annoying element
            $('#c02_Homepage_Hero_1 > div.hero_with_promotion__container.container-fluid > div.promotion_row > div').hide()
            formatLiftTicketText();
            openCalendarWidget();
            calendarClickHandler();
            addAdditionalAgePasses();
            addNumberOfTickets();
            readjustTicketPrices()
            $('#teen_tickets, #senior_tickets').css({ 'display': 'flex' });
            $(document).on('click', (e) => {
                if (e.target.nodeName !== 'TH' && e.target.nodeName !== 'TABLE' && $('.bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom.pull-right').length > 0) {
                    try {
                        if ($('.bootstrap-datetimepicker-widget.dropdown-menu.usetwentyfour.bottom.pull-right')[0].style.visibility === 'visible') {
                            $('.input-group-addon').click()
                        }
                    } catch (err) { }
                }
            })
        }, 200);


    },
    intervalList: ["#c21_Product_Filters_1"]
}


ActivityManager.registerActivity(dabActivity);

var ticketManager = {
    ticketData: { "Adult": { 'date': '2023-12-12' }, "Child": {}, "Senior": {}, "Teen": {}, "College": {} },
    api: {
        // NOTE: This function is asynchronous, meaning we don't know exactly when it will return data. Because of this, we
        //       will need to, if we are needing the ticket data that it returns, use a .then promise with a callback to execute
        //       code and perform actions when the data is recieved.
        // PARAMS: @date - the selected start date, in MM/DD/YYYY format
        //         @age - a string specifing the age of tickets needed
        getTickets: async function (date, age) {
            if (ticketManager.ticketData[age][date]) return ticketManager.ticketData[age][date];
            return await callFRAPI(ticketManager.util.buildEndpointPath(date, age)).then(data => {
                ticketManager.ticketData[age][date] = [];
                ticketManager.ticketData[age][date].push(...data.LiftTickets);
                return data.LiftTickets;
            })
        },
        // PARAMS: @sku - the SKU/PHC of a ticket classification. This represents both age and # of days
        //         @qty - the number of tickets for the given sku
        //         @date - the selected start date, in MM/DD/YYYY format
        addTicketsToCart: function (sku, qty, date) {

            callFRAPI("/api/CartApi/AddToCart", "POST", {
                "productType": "LiftTickets",
                "sku": sku,
                "qty": qty,
                "startDate": ticketManager.util.formatTicketDate(date)
            }).then(data => {
                console.log(data);
            })
        },

    },
    util: {
        buildEndpointPath: function (date, age) {
            return `/api/LiftAccessApi/GetLiftTickets/${ticketManager.util.formatTicketDate(date)}/true/${age}/${FR.liftTicketsViewModel.LiftTicketComponentId}?_=${Date.now()}`
        },
        formatTicketDate: function (date) {
            date = date.split("/");
            date.unshift(date.pop());
            return (date.join("-"));
        },
        initiateAddToCart: function () {
            $('#DAB-Lift-Booking-Widget > button').on('click', () => {
                for (const [age, date] of Object.entries(ticketManager.ticketData)) {
                    // loop through ticketManager.ticketData
                    // getTickets(age, date)
                    // addTicketsToCart()
                }
            })
        }
    }
}