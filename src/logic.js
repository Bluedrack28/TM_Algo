class Logic {
    
    
    /**
     * 
     * @param {*} value 
     * @param {*} pourcent 
     * @param {*} min 
     * @param {*} max 
     */
    static alterate(value,pourcent,min,max){
        let newValue
        if(Math.random() > 0.5){
            newValue = value + Math.random() * pourcent * value * max
            if(newValue >= max) newValue = max
            
        }else{
            newValue = value - Math.random() * pourcent * value * max
            if(newValue <= min) newValue = min
        }
        
    }

}