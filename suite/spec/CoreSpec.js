describe("comix-ngn: core", function() {
    var a;

    it("cG should not be null or undefined", function() {
        a = cG;
        expect(a).not.toBeNull();
        expect(a).not.toBeUndefined();
        expect(a.info).not.toBeNull();
        expect(a.info).not.toBeUndefined();
    });
    it("cG info - versions should be strings", function() {
        a = cG.info;
        expect(typeof a.vix).toBe("string");
        expect(typeof a.vpr).toBe("string");
        expect(typeof a.vwr).toBe("string");
    });
    it("Global Plugin Count (GPC) should be positive", function() {
        a = cG.$GPC;
        expect(a).toBeGreaterThan(-1);
    });

    it("Everything in Recycle Bin must become null", function() {
        a = cG.recyclebin;
        var c = 0;
        var bar = {};
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                expect(b).toBeNull();
                c++;
            }
        }
        if(!c) expect(a).toEqual(bar);
    });
    /*it("Controls, Decor, and Script.JSON must be confirmed to 404 or be recieved", function() {
        a = cG;
        expect(a.ctrls).not.toEqual('');
        expect(a.decor).not.toEqual('');
        expect(a.script).not.toEqual('');
    });*/
});

