var tabOne = require('./tabOne');
var tabTwo = require('./tabTwo');
var tabThree = require('./tabThree');

var radios = document.getElementsByName("tabGroup1");
for (radio in radios) {
    radios[radio].onclick = function() {
        if (this.id === 'tab1') {
            tabOne();
        } else if (this.id === 'tab2') {
            tabTwo();
        } else if (this.id === 'tab3') {
            tabThree();
        }
    }
}