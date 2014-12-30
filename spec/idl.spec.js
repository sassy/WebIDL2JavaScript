(function() {
    var js = require('../webidl2javascript');
    describe('generage js string', function() {
	it ("conver webidl string", function(done) {
	    var str = "interface Hello {  attribute long value;};";
	    js.convertWebIDL(str);
	    done();
	});
    });
})();