/**
 * Appends any set of value at the end of the array
 * @argument {...*} value A value to append
 * @returns {Array} Itself once edited
 */
Array.prototype.append = function(value){
    for(var k in arguments){
        if(arguments.hasOwnProperty(k))
            this[this.length] = arguments[k];
    }
    return this;
};
/**
 * Prepends any set of value at the beginning of the array
 * @argument {...*} value A value to prepend
 * @returns {Array} Itself once edited
 */
Array.prototype.prepend = function(value){
    for(var k in arguments){
        if(arguments.hasOwnProperty(k)){
            for(var i=this.length;i>0;--i){
                this[i] = this[i-1];
            }
            this[0] = arguments[k];
        }
    }
    return this;
};
/**
 * Removes the tail of the array
 * @param {Number} [n=1] Number of item to remove
 * @throws {TypeError} If the first parameter is not a number
 * @returns {Array} Itself once edited
 */
Array.prototype.trimRight = function(n){
    n = n || 1;
    if(isNaN(n))
        throw new TypeError("Parameter 1 ["+n+"] should be a Number");
    
    this.length -= n>this.length? this.length: n;
    return this;
};
/**
 * Removes the head of the array
 * @param {Number} [n=1] Number of item to remove
 * @throws {TypeError} If the first parameter is not a number
 * @returns {Array} Itself once edited
 */
Array.prototype.trimLeft = function(n){
    n = n || 1;
    if(isNaN(n))
        throw new TypeError("Parameter 1 ["+n+"] should be a Number");
    
    for(var i=0, l=this.length-n;i<l;++i){
        this[i] = this[i+n];
    }
    this.trimRight(n);
    return this;
};
/**
 * Returns the head of the array
 * @param {Number} [n=1] Number of item to retreive
 * @throws {TypeError} If the first parameter is not a number
 * @returns {Array} The n first values of the array
 */
Array.prototype.head = function(n){
    n = n || 1;
    if(isNaN(n))
        throw new TypeError("Parameter 1 ["+n+"] should be a Number");
    
    var res = [];
    for(var i=0;i<n;++i){
        if(this[i] !== undefined)
            res.append(this[i]);
    }
    return res;
};
/**
 * Returns the tail of the array
 * @param {Number} [n=1] Number of item to retreive
 * @throws {TypeError} If the first parameter is not a number
 * @returns {Array} The n last values of the array
 */
Array.prototype.tail = function(n){
    n = n || 1;
    if(isNaN(n))
        throw new TypeError("Parameter 1 ["+n+"] should be a Number");
    
    var res = [];
    for(var i=this.length-n, l=this.length;i<l;++i){
        if(this[i] !== undefined)
            res.append(this[i]);
    }
    return res;
};

/**
 * Removes one entry from the array
 * @param {Number|String|Array} index The index of the item either ordered or not<br/>
 * Or an array of indexes
 * @returns {Array} Itself once edited
 */
Array.prototype.out = function(index){
    if(index === undefined)
        index = this.length-1;
    
    if(index.isArray()){
        index = index.values().sort();
        for(var i=index.length-1;i>=0;--i){
            this.out(index[i]);
        }
    }
    else{
        if(isNaN(+index))
            delete(this[index]);
        else
            this.splice(index, 1);
        
    }
    return this;
};

/**
 * Merges with any set of arrays
 * @argument {...Array} another An array to merge with
 * @returns {Array} Itself once edited
 */
Array.prototype.merge = function(another){
    var self = this;
    for(var i in arguments){
        if(arguments.hasOwnProperty(i)){
            var arg = arguments[i];
            if(arg.isArray()){
                arg.each(function(v, k){
                    if(isNaN(+k))
                        self[k] = v;
                    else
                        self.append(v);
                });
            }
            else
                this.append(arg);
        }
    }
    return this;
};

/**
 * Searches for a value in the array
 * @param {type} value A value to search in the array
 * @param {Boolean} [strict=false] Set to true if you want a strict search
 * @returns {Array|Boolean} An array of the index or false if no result found
 */
Array.prototype.indexOf = function(value, strict){
    var results = [];
    this.each(function(v, k){
        if(v === value || strict && v == value)
            results.append(k);
    });
    return results.length? results: false;
};

/**
 * Returns all keys of the array
 * @param {Boolean} [onlyOrdered=false] Get only the ordered items keys
 * @returns {Array} An array of the keys
 */
Array.prototype.keys = function(onlyOrdered){
    var keys = [];
    this.each(function(v, k){
        if(!onlyOrdered || onlyOrdered && !isNaN(+k))
            keys.append(k);
    });
    return keys;
};
/**
 * Returns all values of the array
 * @param {Boolean} [onlyOrdered=false] Get only the ordered items values
 * @returns {Array} An array of the values
 */
Array.prototype.values = function(onlyOrdered){
    var val = [];
    this.each(function(v, k){
        if(!onlyOrdered || onlyOrdered && !isNaN(+k))
            val.append(v);
    });
    return val;
};

/**
 * Compares two array with their values and return the intersection
 * @param {Array} another An array to compare the values with
 * @throws {TypeError} if the first parameter is not an array
 * @returns {Array} The result of the intersection
 */
Array.prototype.intersect = function(another){
    if(!another.isArray())
        throw new TypeError("Parameter 1 is not an Array");
    
    var tmp = [];
    this.each(function(v){
        if(!another.contains(v)){
            tmp.append(v);
        }
    });
    var self = this;
    tmp.each(function(v){
        self.out(self.indexOf(v));
    });
    return this;
};

/**
 * Compares two array with their keys and return intersection
 * @param {Array} another An array to compare the keys with
 * @throws {TypeError} if the first parameter is not an array
 * @returns {Array} The result of the key's intersection
 */
Array.prototype.intersectKeys = function(another){
    if(!another.isArray())
        throw new TypeError("Parameter 1 is not an Array");
    
    var tmp = [];
    this.keys().each(function(k){
        if(!another.containsKey(k))
            tmp.append(k);
    });
    this.out(tmp);
    
    return this;
};

/**
 * Browses each item on the array
 * @param {Function} callback A function to execute on each item
 * @returns {Array} Itself once edited
 */
Array.prototype.each = function(callback){
    for(var k in this){
        if(this.hasOwnProperty(k))
            callback.call(this, this[k], (isNaN(+k)? k: +k));
    }
    return this;
};

/**
 * Searches for a specific value in the array
 * @param {*} needle - The value to find<br/>
 * - A callback function for each item
 * Should return true on matching item<br/>
 * - Or a regular expression to test
 * @param {Boolean} [strict=false] Set to true if you want a strict comparision
 * @returns {Number} Number of occurence of the needle
 */
Array.prototype.contains = function(needle, strict){
    var found = 0;
    this.each(function(v){
        if(needle instanceof RegExp && needle.test(v) || needle === v || !strict && needle == v)
            ++found;
    });
    return found;
};
/**
 * Searches for a specific key in the array
 * @param {*} needle - The key to find<br/>
 * - A callback function for each key
 * Should return true on matching key<br/>
 * - Or a regular expression to test
 * @returns {Number} Number of occurence of the needle
 */
Array.prototype.containsKey = function(needle){
    var found = 0;
    this.keys().each(function(k){
        if(needle instanceof RegExp && needle.test(k) || needle === k)
            ++found;
    });
    return found;
};

/**
 * Filters the array with item value
 * @param {Function|RegExp} test A callback function for each item
 * Should return true on matching item<br/>
 * Or a regular expression to test
 * @returns {Array} Itself once edited
 */
Array.prototype.filter = function(test){
    var indexes = [];
    this.each(function(v, k){
        if((test instanceof RegExp) && !test.test(v) || (test instanceof Function) && !test.call(this, v))
            indexes.append(k);
    });
    this.out(indexes);
    return this;
};
/**
 * Filters the array with item key
 * @param {Function|RegExp} test A callback function for each keys
 * Should return true on matching keys<br/>
 * Or a regular expression to test
 * @returns {Array} Itself once edited
 */
Array.prototype.filterKeys = function(test){
    this.out(this.keys().filter(test));
    return this;
};

/**
 * Randomizes the ordered item of the array
 * @returns {Array} Itself once edited
 */
Array.prototype.shuffle = function(){
    var res = this.values(1);
    for(var i=0,l=res.length;i<l;++i){
        this[i] = res.splice(Math.random()*res.length<<0, 1)[0];
    }
    return this;
};

/**
 * Returns a random value out of the array
 * @returns {*} Any value picked randomly
 */
Array.prototype.random = function(){
    var vals = this.values();
    return vals[Math.random()*vals.length<<0];
};

/**
 * Puts all the values in a single string
 * @param {String} [glue=", "] The separator of each value
 * @returns {String} A string containing all values of the array
 */
Array.prototype.implode = function(glue){
    glue = glue || ", ";
    var str = "";
    this.each(function(v){
        str += glue+v;
    });
    str = str.substr(glue.toString().length);
    return str;
};

/**
 * Returns a string representation of the array
 * @returns {String} A JSON type string of the array
 */
Array.prototype.toString = function(){
    return "[" + this.implode() + "]";
};

/**
 * Gives the real length of the array counting unordered items
 * @returns {Number} Number of item stored in the array
 */
Array.prototype.size = function(){
    return this.values().length;
};

/**
 * Compares with another array
 * @param {*} another Anythings else
 * @returns {Boolean} Return true if the arrays are the same, false otherwise or if it's not an array
 */
Array.prototype.equals = function(another){
    if(another == undefined)
        throw new TypeError("No parameter given");
    
    if(!another.isArray() || another.size() != this.size())
        return false;
    
    var self = this,
        same = true;
    another.each(function(v, k){
        same &= (self[k] != undefined && self[k].equals(v));
    });
    return (same==true);
};

if(!Object.prototype.equals){
    /**
     * Compares with another object
     * @param {*} another Anythings else
     * @returns {Boolean} Return true if they're equals, false otherwise
     */
    Object.prototype.equals = function(another){
        return this == another;
    };
}

/**
 * Checks if this is an array
 * @returns {Boolean} Return true if it's and array, false otherwise
 */
Object.prototype.isArray = function(){
    return this instanceof Array;
};