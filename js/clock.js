$(document).ready(function () {
    var clock;

    // Grab the current date
    var currentDate = new Date();

    // Target future date/24 hour time/Timezone
    var targetDate = moment.tz("2021-12-25 23:59", "Australia/Sydney");

    // Calculate the difference in seconds between the future and current date
    var diff = targetDate / 1000 - currentDate.getTime() / 1000;

    if (diff <= 0) {
        // If remaining countdown is 0
        clock = $(".clock").FlipClock(0, {
            clockFace: "DailyCounter",
            countdown: true,
            autostart: false
        });
        console.log("Date has already passed!")

    } else {
        // Run countdown timer
        clock = $(".clock").FlipClock(diff, {
            clockFace: "DailyCounter",
            countdown: true,
            callbacks: {
                stop: function () {
                    console.log("Timer has ended!")
                }
            }
        });

        // Check when timer reaches 0, then stop at 0
        setTimeout(function () {
            checktime();
        }, 1000);

        function checktime() {
            t = clock.getTime();
            if (t <= 0) {
                clock.setTime(0);
            }
            setTimeout(function () {
                checktime();
            }, 1000);
        }
    }
});
