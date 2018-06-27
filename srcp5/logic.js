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
        newValue = value * (1 + random(-1,1) * pourcent)
        if(newValue >= max) newValue = max
        if(newValue <=min) newValue = min 
        return newValue
    }

}