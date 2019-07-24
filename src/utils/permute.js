const lookup=require('./lookup.js');

const permute=(word, min, max, callback)=>{
    word=word.trim().toLowerCase();
    const length=word.length;

    if((!Number.isInteger(parseInt(min)))||(!Number.isInteger(parseInt(max)))){
        return callback('Max and min query values must be integers', undefined);
    }else if(!(word.match(/^[A-Za-z]+$/))){
        return callback('Word must only contains letters', undefined);       
    }else if(length>max){
        return callback('Word length cannot be longer than max', undefined);
    }

    //Powerset code
    let array=word;
    let result=[[]];
    for(j=0;j<array.length;j++){
        let len=result.length;
        for(k=0;k<len;k++){
            result.push(result[k].concat(array[j]));
        }
    }
    //End powerset code

    //Remove empty set
    let temp=result.slice(1, result.length);
    
    //Remove Duplicate Elements
    let temp2=[];
    for(i=0;i<temp.length;i++){
        if(!temp2.includes(temp[i].toString())){
            let test=temp[i].toString();
            let test2=test.replace(/,/g, '');
            temp2.push(test2);
        }
    }
    
    //Limiting set size based on user supplied min and max parameters
    let temp3=[];
    temp2.forEach((item) => {
       if(item.length<=max && item.length>=min){
           temp3.push(item);
       } 
    });

    //At this point temp3 contains all the sets we need to run permutations on,

    let permutedArray=stringPermutations(temp3); 
    let validatedPermutedArray=validateWords(permutedArray);
    callback(undefined, validatedPermutedArray);
}

function stringPermutations(arr) {
    let results;
    let finalArr=[];
    arr.forEach(str => {
        let letters = str.split('');
        results = [[letters.shift()]];

        while (letters.length) {

            const currLetter = letters.shift();

            let tmpResults = [];
            results.forEach(result => {

                let rIdx = 0;

                while (rIdx <= result.length) {

                    const tmp = [...result];
                    tmp.splice(rIdx, 0, currLetter);
                    tmpResults.push(tmp);
                    rIdx++;
                }
            })
            results = tmpResults;
        } 
        results=results.map(letterArray => letterArray.join('')).filter((el, idx, self) => (self.indexOf(el) === idx))
        
        results.forEach(element => {
            finalArr.push(element)
        });
    });
    
    return finalArr.sort();
}

const validateWords=(arr)=>{
    let validatedArray=[];
    arr.forEach(element => {
        if(!(lookup[element]===undefined)){
            validatedArray.push(element);
        }
    });

    //Remove any duplicates here
    let validatedArrayWithoutDuplicates=[];
    validatedArray.forEach((element) => {
        if((validatedArrayWithoutDuplicates.indexOf(element))===-1){
            validatedArrayWithoutDuplicates.push(element);
        }
    });

    return validatedArrayWithoutDuplicates;
}


module.exports={
    permute
}