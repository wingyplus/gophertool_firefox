/* global: packages */

var inputbox = document.getElementById('inputbox');

self.port.on('show', function() {
    $(inputbox).autocomplete({
        source: packages
    });
    inputbox.focus();
});

window.addEventListener('submit', function() {
    var t = inputbox.value;
    var url = urlForInput(t);
    if (!url) {
        return false;
    }
    self.port.emit('openTab', url);
});
