jQuery(document).ready(function() {
    $(function() {
        $('#defaultCountdown').countdown({
            until: new Date(2025, 7, 1, 1)
        }); // year, month, date, hour
    });
});