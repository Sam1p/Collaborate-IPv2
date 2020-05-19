const natural = require('natural');

const getDistance = (input, output) => {

    function levenshteinDistance(s, t) {
        var DELETION_COST = 1, UPDATE_COST = 5, INSERT_COST = 5;
        
        if (s.length === 0) return t.length * INSERT_COST;    
        if (t.length === 0) return s.length * DELETION_COST;  
        
        var a = levenshteinDistance(s.slice(1), t) + DELETION_COST; 
        var b = levenshteinDistance(t.slice(1), s) + INSERT_COST; 
        var c = levenshteinDistance(s.slice(1), t.slice(1)) + (customCheck(s[0], t[0]) ? 0 : UPDATE_COST);
        
        return Math.min(a, b, c);
    }

    function customCheck(a, b) {
        return natural.JaroWinklerDistance(a.toLowerCase(), b.toLowerCase()) >= 0.8;
    }

    function SubSet(array, output, acc, index, results) {
        if (index >= array.length) {
            if (acc.length > 0) {
                var cost = levenshteinDistance(acc, output);
                results.push({
                    label : acc,
                    value : cost
                });
            }
        } else {
            var pos1 = acc.map(x => x);
            pos1.push(array[index]);

            var pos2 = acc.map(x => x);

            SubSet(array, output, pos1, index+1, results);
            SubSet(array, output, pos2, index+1, results);
        }
    }

    function getData(input, output, check_subset) {
        if (check_subset) {
            var results = [];

            SubSet(input, output, [], 0, results);
            results.sort(function(a,b) {
                return a.value - b.value;
            });

            return results[0];
        } else {
            var cost = levenshteinDistance(input, output);
            return {
                label : input,
                value : cost
            };
        }
    }

    var maxDistance = Math.max(input.join('').length, output.join('').length);

    var ed1obj = getData(input, output, true);
    var ed1ls = (maxDistance - natural.LevenshteinDistance(ed1obj.label.join(''), output.join(''))) / maxDistance;

    var ed2obj = getData(output, input, false);
    var ed2ls = (maxDistance - natural.LevenshteinDistance(ed2obj.label.join(''), input.join(''))) / maxDistance;

    if (ed1obj.value < ed2obj.value) {
        return {
            value : ed1ls,
            ed : ed1obj.value
        };
    } else {
        return {
            value : ed2ls,
            ed : ed2obj.value
        };
    }
}

module.exports.editDistance = getDistance;