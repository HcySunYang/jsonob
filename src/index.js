/*
 *  Object 原型
 */
const OP = Object.prototype;
/*
 *  需要重写的数组方法 OAR 是 overrideArrayMethod 的缩写
 */
const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

export class Jsonob{
    constructor(obj, callback){
        if(OP.toString.call(obj) !== '[object Object]'){
            console.error('This parameter must be an object：' + obj);
        }
        this.$callback = callback;
        this.observe(obj);
    }
    
    observe(obj){
        if(OP.toString.call(obj) === '[object Array]'){
            this.overrideArrayProto(obj);
        }
        Object.keys(obj).forEach(function(key, index, keyArray){
            var oldVal = obj[key];
            Object.defineProperty(obj, key, {
                get: function(){
                    return oldVal;
                },
                set: (function(newVal){
                    if(oldVal !== newVal){
                        if(OP.toString.call(newVal) === '[object Object]' || OP.toString.call(newVal) === '[object Array]'){
                            this.observe(newVal);
                        }
                        this.$callback(newVal, oldVal);
                        oldVal = newVal;
                    }
                    
                }).bind(this)
            });
            
            if(OP.toString.call(obj[key]) === '[object Object]' || OP.toString.call(obj[key]) === '[object Array]'){
                this.observe(obj[key]);
            }
            
        }, this);
        
    }
    
    overrideArrayProto(array){
        var originalProto = Array.prototype,
            overrideProto = Object.create(Array.prototype),
            self = this,
            result;
        
        Object.keys(OAM).forEach(function(key, index, array){
            var method = OAM[index],
                oldArray = [];
            
            Object.defineProperty(overrideProto, method, {
                value: function(){
                    oldArray = this.slice(0);
                    
                    var arg = [].slice.apply(arguments);
                    result = originalProto[method].apply(this, arg);
                    
                    self.observe(this);
                    self.$callback(this, oldArray);
                    
                    return result;
                },
                writable: true,
                enumerable: false,
                configurable: true
            });
        }, this);
        
        array.__proto__ = overrideProto;
        
    }
}