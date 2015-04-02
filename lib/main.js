var toggle = require('sdk/ui/button/toggle');
var panel = require('sdk/panel');
var self = require('sdk/self');
var tabs = require('sdk/tabs');

var button = toggle.ToggleButton({
    id: 'gophertool',
    label: 'Hacking Gopher',
    icon: {
        '16': './gopher.png',
        '32': './gopher.png',
        '64': './gopher.png'
    },
    onChange: showPanel
});

var popup = panel.Panel({
    contentURL: self.data.url('popup.html'),
    contentScriptFile: [
        self.data.url('jquery.min.js'),
        self.data.url('jquery-ui.min.js'),

        self.data.url('gopher.js'),
        self.data.url('packages.js'),
        self.data.url('popup.js')
    ],
    contentStyleFile: self.data.url('jquery-ui.min.css'),
    onHide: handleHide
});

function showPanel(state) {
    if (!state.checked) return;

    popup.show({
        position: button
    });
}

function handleHide() {
    button.state('window', {
        checked: false
    });
}

popup.on('show', function() {
    popup.port.emit('show');
});

popup.port.on('openTab', function(url) {
    console.log('open tab', url);
    tabs.open(url);
    popup.hide();
});
