const lookup=require('./lookup.js');

const permute=(word)=>{
    const length=word.length;

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

    //At this point temp2 contains all the sets we need to run permutations on,
    //At this point could cut computation time by limiting to certain set sizes?
    let permutedArray=stringPermutations(temp2); 
    let validatedPermutedArray=validateWords(permutedArray);
    return validatedPermutedArray;
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
    //Need to remove any duplicates here
    return validatedArray;
}


module.exports={
    permute
}