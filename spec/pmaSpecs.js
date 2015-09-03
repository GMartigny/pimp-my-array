describe("Pimp-my-array librairy", function(){
    
    require("../pimp-my-array.js");
    
    var testCase;
    
    beforeEach(function(){
        jasmine.addCustomEqualityTester(function(one, two){
            one.equals(two);
        });
        testCase = [1, 2, 3, 4, 5]; testCase["end"] = "hidden";
    });
    
    describe("equals()", function(){
        it("compares two array", function(){
            expect(testCase.equals(testCase)).toBe(true);
            expect(testCase.equals([1, 2, 3, 4, 5])).toBe(false);
            expect(testCase.equals).toThrowError(TypeError, /no parameter/i);
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
            var arr = [2, 3, 4, 5]; arr["end"] = "hidden";
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
            }).toThrowError(TypeError, /should be a Number/i);
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
            }).toThrowError(TypeError, /should be a Number/i);
        });
    });
    
    describe("head()", function(){
        it("gives the head", function(){
            expect(testCase.head()).toEqual([1]);
            expect(testCase.head(3)).toEqual([1, 2, 3]);
            expect(function(){
                return [1, 2, 3].head("a");
            }).toThrowError(TypeError, /should be a Number/i);
        });
    });
    
    describe("tail()", function(){
        it("gives the tail", function(){
            expect(testCase.tail()).toEqual([5]);
            expect(testCase.tail(3)).toEqual([3, 4, 5]);
            expect(function(){
                return [1, 2, 3].head("a");
            }).toThrowError(TypeError, /should be a Number/i);
        });
    });
    
    describe("out()", function(){
        it("removes items", function(){
            expect([1, 2, 3, 4].out()).toEqual([1, 2, 3]);
            expect([1, 2, 3, 4, 5].out(2)).toEqual([1, 2, 4, 5]);
            expect([1, 2, 3, 4, 5].out([2, 4])).toEqual([1, 2, 4]);
            expect(testCase.out("end")).toEqual([1, 2, 3, 4, 5]);
        });
    });
    
    describe("merge()", function(){
        it("merge array", function(){
            expect([1, 2, 3].merge(4)).toEqual([1, 2, 3, 4]);
            expect([1, 2, 3].merge([4, 5])).toEqual([1, 2, 3, 4, 5]);
            expect([1, 2].merge(3, [4, 5], 6)).toEqual([1, 2, 3, 4, 5, 6]);
            var arr = []; arr["end"] = "overrided";
            expect(arr.merge(testCase)).toEqual(testCase);
        });
    });
    
    describe("indexOf()", function(){
        it("finds the index", function(){
            expect([3, "3", 3].indexOf(3)).toEqual([0, 1, 2]);
            expect([2, "2", 2].indexOf(2, true)).toEqual([0, 2])
            expect(testCase.indexOf("hidden")).toEqual(["end"]);
        });
    });
    
    describe("keys()", function(){
        it("returns the keys", function(){
            expect(testCase.keys()).toEqual([0, 1, 2, 3, 4, "end"]);
            expect(testCase.keys(true)).toEqual([0, 1, 2, 3, 4]);
        });
    });
    
    describe("values()", function(){
        it("returns the values", function(){
            expect(testCase.values()).toEqual([1, 2, 3, 4, 5, "hidden"]);
            expect(testCase.values(true)).toEqual([1, 2, 3, 4, 5]);
        });
    });
    
    describe("intersect()", function(){
        it("compares to array", function(){
            expect(testCase.intersect([0, 1, 2, 3])).toEqual([1, 2, 3]);
            expect(function(){
                return [1, 2, 3].intersect("a");
            }).toThrowError(TypeError, /should be an Array/);
        });
    });
    
    describe("intersectKeys()", function(){
        it("compares to array with keys", function(){
            var arr = [1, 1]; arr[3] = 1;
            expect(testCase.intersectKeys(arr)).toEqual([1, 2, 4]);
            expect(function(){
                return [1, 2, 3].intersectKeys("a");
            }).toThrowError(TypeError, /should be an Array/);
        });
    });
    
    describe("each()", function(){
        it("executes a function for each item", function(){
            expect(function(){
                var vals = [];
                testCase.each(function(v){
                    vals.append(v);
                });
                return vals;
            }()).toEqual([1, 2, 3, 4, 5, "hidden"]);
        });
            
        describe("stop()", function(){
            it("stop the loop", function(){
                expect(function(){
                    var vals = [];
                    testCase.each(function(v){
                        vals.append(v);
                        if(v > 2)
                            this.each.stop();
                    });
                    return vals;
                }()).toEqual([1, 2, 3]);
            });
        });
    });
    
    describe("contains()", function(){
        it("tells the number of occurence", function(){
            expect([2, "2", 2].contains(2)).toEqual(3);
            expect([2, "2", 2].contains(2, true)).toEqual(2);
            expect(testCase.contains(function(v){
                return v%2;
            })).toEqual(3);
            expect(["test", "the", "array"].contains(/e/)).toEqual(2);
            expect(testCase.contains(42)).toBe(false);
        });
    });
    
    describe("containsKey()", function(){
        it("tells the number of occurence with keys", function(){
            expect(testCase.containsKey("end")).toEqual(1);
            expect(testCase.containsKey(function(k){
                return k<3;
            })).toEqual(3);
            var arr = [];
            arr["test"] = 1; arr["the"] = 1; arr["array"] = 1;
            expect(arr.containsKey(/e/)).toEqual(2);
            expect(testCase.containsKey(42)).toBe(false);
        });
    });
    
    describe("filter()", function(){
        it("removes matching item", function(){
            expect(testCase.filter).toThrowError(TypeError, /no parameter/i);
            expect([1, 2, 3, 4, 5].filter(function(v){
                return v%2 == 0;
            })).toEqual([2, 4]);
            expect(["test", "the", "array"].filter(/e/)).toEqual(["test", "the"]);
        });
    });
    
    describe("filterKeys()", function(){
        it("removes matching item", function(){
            expect(testCase.filterKeys).toThrowError(TypeError, /no parameter/i);
            expect([1, 2, 3, 4, 5].filterKeys(function(k){
                return k%2 == 0;
            })).toEqual([1, 3, 5]);
            var arr = [];
            arr["test"] = 1; arr["the"] = 1; arr["array"] = 1;
            var result = []; result["array"] = 1;
            expect(arr.filterKeys(/a/)).toEqual(result);
        });
    });
    
    describe("shuffle()", function(){
        it("randomizes the item", function(){
            expect(testCase.length).toEqual(testCase.shuffle().length);
        });
    });
    
    describe("random()", function(){
        it("gives a random item", function(){
            expect(testCase.contains(testCase.random())).toBeGreaterThan(0)
        });
    });
    
    describe("implode()", function(){
        it("concates items", function(){
            expect(testCase.implode()).toEqual("1, 2, 3, 4, 5, hidden");
            expect(testCase.implode("--")).toEqual("1--2--3--4--5--hidden");
        });
    });
    
    describe("toString()", function(){
        it("stringify the array", function(){
            expect(""+testCase).toEqual("[1, 2, 3, 4, 5, hidden]");
        });
    });
    
    describe("size()", function(){
        it("returns the size", function(){
            expect([].size()).toEqual(0);
            expect(testCase.size()).toEqual(6);
        });
    });
    
    describe("equals()", function(){
        it("compare two array", function(){
            expect(testCase.equals(testCase)).toBe(true);
            expect(testCase.equals([1, 2, 3, 4, 5])).toBe(false);
            expect(testCase.equals).toThrowError(TypeError, /no parameter/i);
        });
    });
    
    describe("min()", function(){
        it("finds the smallest item", function(){
            expect(testCase.min()).toEqual(1);
            var arr = [{l: 5}, {l: 7}, {l: 3}];
            expect(arr.min(function(value, min){
                return value.l < min.l;
            })).toEqual({l: 3});
            expect(function(){
                return [].min();
            }).toThrowError(TypeError, /empty Array/i);
        });
    });
    
    describe("max()", function(){
        it("finds the hugest item", function(){
            expect(testCase.max()).toEqual(5);
            var arr = [{l: 5}, {l: 7}, {l: 3}];
            expect(arr.max(function(value, max){
                return value.l > max.l;
            })).toEqual({l: 7});
            expect(function(){
                return [].max();
            }).toThrowError(TypeError, /empty Array/i);
        });
    });
    
    describe("dedupe()", function(){
        it("remove duplicated item", function(){
            expect([1, 1, 1, 2, 2, 2].dedupe()).toEqual([1, 2]);
            var arr = [1]; arr["end"] = "hidden";
            expect(testCase.dedupe(function(valA, valB){
                return (typeof valA) == (typeof valB);
            })).toEqual(arr);
        });
    });
});