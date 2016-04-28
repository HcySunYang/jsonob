const OP = Object.prototype;

export class Jsonob{
    constructor(obj, callback){
        if(OP.toString.call(obj) !== '[object Object]'){
            console.error('This parameter must be an object：' + obj);
        }
        this.$callback = callback;
        this.$cacheData = 
        this.observe(obj);
    }
    
    observe(obj){
        Object.keys(obj).forEach(function(key, index, keyArray){
            var oldVal = obj[key];
            Object.defineProperty(obj, key, {
                get: function(){
                    return oldVal;
                },
                set: (function(newVal){
                    if(oldVal !== newVal){
                        if(OP.toString.call(newVal) === '[object Object]'){
                            this.observe(newVal);
                        }
                        this.$callback(newVal, oldVal);
                        oldVal = newVal;
                    }
                    
                }).bind(this)
            });
            
            if(OP.toString.call(obj[key]) === '[object Object]'){
                this.observe(obj[key]);
            }
            // console.log(OP.toString.call(obj[key]))
            
        }, this);
        
    }
}