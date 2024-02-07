const express = require('express');

const app = express();


app.get('/mean', function(req, res){

    if(req.query['nums'] === undefined){
        throw new Error('Numbers are required, this data set has no values.')
    }

    let numString = req.query['nums']
    let stringArray = numString.split(',')
    let numArray = stringArray.map(Number)

    for(let num of stringArray){
        if(isNaN(num)){
            throw new Error(`${num} is not a number.`)
        }
    }

    let total = 0
    for(let num of numArray){
        total += num
    }

    let result = total/numArray.length

    return res.send({
        operation: 'mean',
        value: result
    })
});


app.get('/median', function(req,res){

    if(req.query['nums'] === undefined){
        throw new Error('Numbers are required, this data set has no values.')
    }

    let numString = req.query['nums']
    let stringArray = numString.split(',')
    let numArray = stringArray.map(Number)

    for(let num of stringArray){
        if(isNaN(num)){
            throw new Error(`${num} is not a number.`)
        }
    }

    let sortedArray = numArray.sort(function(a, b){return a - b})
    let midPoint = sortedArray.length / 2
    let result = 0

    if((midPoint) % 1 !== 0){
        result = sortedArray[midPoint - 0.5]
    }
    else{
        result = (sortedArray[midPoint] + sortedArray[midPoint - 1]) / 2
    }
    

    return res.send({
        operation: 'median',
        value: result
    })
})


app.get('/mode', function(req,res){

    console.log(req.query['nums'])
    if(req.query['nums'] === undefined){
        throw new Error('Numbers are required, this data set has no values.')
    }

    let numString = req.query['nums']
    let stringArray = numString.split(',')
    let numArray = stringArray.map(Number)

    for(let num of stringArray){
        if(isNaN(num)){
            throw new Error(`${num} is not a number.`)
        }
    }
    
    let numObject = new Map()
    for(let num of numArray){
        console.log(numObject.get(num))
        if(numObject.has(num)){
            let currVal = numObject.get(num)
            numObject.set(num, currVal+1)  
        }
        else{
            numObject.set(num, 1)
        }
        console.log(numObject.get(num))
    }
    let mostCommon = numArray[0]
    for(let key of numArray){
        if(numObject.get(key) > numObject.get(mostCommon)){
            mostCommon = key
        }
    }

    let result
    if(numObject.get(mostCommon) === 1 && numObject.size !== 1){
        result = 'No mode for this data set'
    }
    else{
        result = mostCommon
    }


    return res.send({
        operation: 'mode',
        value: result
    })
})


app.listen(3000, () => {
    console.log('Sever running on port 3000')
});