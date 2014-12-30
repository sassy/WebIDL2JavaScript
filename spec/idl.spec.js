(function() {
    var js = require('../webidl2javascript');
    describe('generage js string', function() {
        it ("conver webidl string", function() {
            var str = "interface Hello {  attribute long value;};";
            var exp = "function Hello() {\n"
            exp += "    this.value = arguments[0];\n";
            exp += "\n";
            exp += "}\n";
            var output = js.convertWebIDL(str);
            var exp_x = exp.replace(/[\s+\n\r]/g, "");
            var output_x = output.replace(/[\s+\n\r]/g, "");
            expect(output_x === exp_x).toBe(true);
        }, 50000);
    });
})();
