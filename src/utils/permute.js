const lookup=require('./lookup.js');

const permute=(word, min, max, callback)=>{
    word=word.trim().toLowerCase();
    const length=word.length;

    if((!Number.isInteger(parseInt(min)))||(!Number.isInteger(parseInt(max)))){
        return callback('Max and min query values must be integers', undefined);
    }else if(!(word.match(/^[A-Za-z]+$/))){
        return callback('Word must only contain letters', undefined);       
    }else if(length>8){
        return callback('Word length cannot be longer than 8 characters', undefined);
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
    let powerSet=result.slice(1, result.length);
    
    //Remove Duplicate Elements
    let powerSetWithoutDuplicates=[];
    for(i=0;i<powerSet.length;i++){
        if(!powerSetWithoutDuplicates.includes(powerSet[i].toString())){
            let stringWithComma=powerSet[i].toString();
            let stringNoComma=stringWithComma.replace(/,/g, '');
            powerSetWithoutDuplicates.push(stringNoComma);
        }
    }
    
    //Limiting set size based on user supplied min and max parameters
    let powerSetCorrectSize=[];
    powerSetWithoutDuplicates.forEach((element) => {
       if(element.length<=max && element.length>=min){
           powerSetCorrectSize.push(element);
       } 
    });

    //At this point powerSetCorrectSize contains all the sets we need to run permutations on,

    let permutedArray=stringPermutations(powerSetCorrectSize); 
    let validatedPermutedArray=validateWords(permutedArray);
    callback(undefined, validatedPermutedArray);
}

//Permutation logic credit to Linda Morales https://medium.com/@lindagmorales94/how-to-solve-a-string-permutation-problem-using-javascript-95ad5c388219
function stringPermutations(arr) {
    let results;
    let finalArr=[];
    arr.forEach((str) => {
        let letters = str.split('');
        results = [[letters.shift()]];

        //while(letter.length>0)
        while (letters.length) {

            const currLetter = letters.shift();

            let tmpResults = [];
            results.forEach((result) => {

                let rIdx = 0;

                while (rIdx <= result.length) {
                    //Essientaly pulling the double array element result into tmp
                    const tmp = [...result];

                    //Add the current letter to tmp at posistion rIdx
                    tmp.splice(rIdx, 0, currLetter);

                    tmpResults.push(tmp);

                    rIdx++;
                }
            })
            results = tmpResults;
        } 
        //Turn into single array with no duplicates
        results=results.map(letterArray => letterArray.join('')).filter((el, idx, self) => (self.indexOf(el) === idx))
        
        //Push these results into the finalArr so they will all be in one place
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
