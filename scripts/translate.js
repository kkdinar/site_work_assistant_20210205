module.exports.toRUS = (obj) => {
    let objToRUS = {};   
    if (!obj) return objToRUS;
    // перебор значений
    for (let key of Object.keys(obj)) {
        let newkey = '';
        if (key == 'id') newkey = 'Номер документа'
        else if (key == 'createdAt') newkey = 'Документ создан'
        else if (key == 'updatedAt') newkey = 'Документ изменён'
        else newkey = key;

        objToRUS[newkey] = obj[key];
    }
    //console.log('objToRUS=',objToRUS);
    return objToRUS;
};

module.exports.toENG = (obj) => {
    let objToENG = {};   
    if (!obj) return objToENG;
    // перебор значений
    for (let key of Object.keys(obj)) {
        let newkey = '';
        if (key == 'Номер документа') newkey = 'id'
        else if (key == 'Документ создан') newkey = 'createdAt'
        else if (key == 'Документ изменён') newkey = 'updatedAt'
        else newkey = key;

        objToENG[newkey] = obj[key];
    }
    //console.log('objToRUS=',objToRUS);
    return objToENG;
};