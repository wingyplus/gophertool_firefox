window.addEventListener('submit', function() {
    var t = document.getElementById('inputbox').value;
    var url = urlForInput(t);
    if (!url) {
        return false;
    }
    self.port.emit('openTab', url);
});
