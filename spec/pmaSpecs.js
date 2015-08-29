describe("Pimp-my-array librairy", function(){
    
    require("../pimp-my-array.min.js");
    
    var testCase = [1, 2, 3, 4, 5]; testCase["end"] = "hidden";
    
    beforeEach(function(){
        jasmine.addCustomEqualityTester(function(one, two){
            one.equals(two);
        });
    });
    
    describe("equals()", function(){
        it("compares two array", function(){
            expect(testCase.equals(testCase)).toBe(true);
            expect(testCase.equals([1, 2, 3, 4, 5])).toBe(false);
            expect(testCase.equals).toThrowError(TypeError, /not an Array/);
        });
    });
    
    describe("append()", function(){
        it("add a new value at the end", function(){
            var arr = [1, 2, 3, 4]; arr["end"] = "hidden";
            expect(arr.append(5)).toEqual(testCase);
            var arr = [1, 2]; arr["end"] = "hidden";
            expect(arr.append(3, 4, 5)).toEqual(testCase);
        });
    });
    
    describe("prepend()", function(){
        it("add a new value at the beginning", function(){
            var arr = [2, 3, 4]; arr["end"] = "hidden";
            expect(arr.prepend(1)).toEqual(testCase);
            var arr = [4, 5]; arr["end"] = "hidden";
            expect(arr.prepend(3, 2, 1)).toEqual(testCase);
        });
    });
    
    describe("trimRight()", function(){
        it("trims the end", function(){
            var arr = [1, 2, 3, 4, 5, 6];  arr["end"] = "hidden";
            expect(arr.trimRight()).toEqual(testCase);
            var arr = [1, 2, 3, 4, 5, 6, 7, 8];  arr["end"] = "hidden";
            expect(arr.trimRight(3)).toEqual(testCase);
            expect(function(){
                return [].trimRight("a");
            }).toThrowError(TypeError, /should be a Number/);
        });
    });
    describe("trimLeft()", function(){
        it("trims the beginning", function(){
            var arr = [0, 1, 2, 3, 4, 5];  arr["end"] = "hidden";
            expect(arr.trimLeft()).toEqual(testCase);
            var arr = [0, 0, 0, 1, 2, 3, 4, 5];  arr["end"] = "hidden";
            expect(arr.trimLeft(3)).toEqual(testCase);
            expect(function(){
                return [].trimLeft("a");
            }).toThrowError(TypeError, /should be a Number/);
        });
    });
    
    describe("head()", function(){
        it("gives the head", function(){
            expect([1, 2, 3, 4].head()).toEqual([1]);
            expect([1, 2, 3, 4].head(3)).toEqual([1, 2, 3]);
            expect(function(){
                return [1, 2, 3, 4].head("a");
            }).toThrowError(TypeError, /should be a Number/);
        });
    });
});