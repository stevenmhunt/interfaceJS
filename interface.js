//
// File: interface.js
// Version 1.0
// Written by Steven Hunt
// Released under the MIT License.
//

var interfaceJS = interfaceJS || { version: "1.0" };

(function(ijs) {
    
    // creates a new interface.
    ijs.create = function(req) {
        return new interfaceBase(req);
    }

    // [Private] Represents the interface.
    var interfaceBase = function(reqObjects) {
    
        // [Private] Parent interfaces.
        var parents = [];

        // [Public] Tells the interface to implement other interfaces.
        this.implement = function(interfaces) {
            parents = parents.concat(interfaces);
            return this;
        }
        
        // [Public] Used to check if a JavaScript object implements the interface.
        this.implementedBy = function(obj) {
            
            // iterate through the required elements.
            for (var i = 0; i < reqObjects.length; i++) {

                var req = reqObjects[i];
                                    
                switch (typeof req) {
                    
                    case "string":
                        if (obj[req] === undefined) {
                            return false;
                        }
                        break;
                        
                    case "function":
                        var result = req(obj);
                        if (!result) {
                            return false;
                        }
                        break;
                            
                    default:
                        // unknown type, unable to process.
                        return false;
                }
            }

            // check the parent interfaces.
            for (var i = 0; i < parents.length; i++) {
                if (!parents[i].implementedBy(obj)) {
                return false;
                }
            }

            // if we made it this far, then the object implements the interface.
            return true;
        }
    }
})(interfaceJS);
