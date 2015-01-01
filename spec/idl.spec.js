(function() {
    var js = require('../webidl2javascript');
    describe('generage js string', function() {
        it ("conver attribute of interface string", function() {
            var str = "interface Hello {  attribute long value;};";

            var exp = "function Hello() {\n"
            exp += "    this.value = arguments[0];\n";
            exp += "\n";
            exp += "    }\n";

            var output = js.convertWebIDL(str);
            var exp_x = exp.replace(/[\n\r]/g, "").trim();
            var output_x = output.replace(/[\n\r]/g, "").trim();
            expect(output_x).toEqual(exp_x);
        });

        it ("conver operation of interface string", function() {
            var str = "interface Hello {  void foo();};";

            var exp = "function Hello() {\n"
            exp += "\n";
            exp += "    }\n";
            exp += "Hello.prototype.foo = function() {\n";
            exp += "    //TODO impl\n";
            exp += "};\n";

            var output = js.convertWebIDL(str);
            var exp_x = exp.replace(/[\n\r]/g, "").trim();
            var output_x = output.replace(/[\n\r]/g, "").trim();
            expect(output_x).toEqual(exp_x);
        });

        it ("conver operation with argument of interface string", function() {
            var str = "interface Hello {  void foo(float x, float y);};";

            var exp = "function Hello() {\n"
            exp += "\n";
            exp += "    }\n";
            exp += "Hello.prototype.foo = function(x, y) {\n";
            exp += "    //TODO impl\n";
            exp += "};\n";

            var output = js.convertWebIDL(str);
            var exp_x = exp.replace(/[\n\r]/g, "").trim();
            var output_x = output.replace(/[\n\r]/g, "").trim();
            expect(output_x).toEqual(exp_x);
        });
    });
})();
