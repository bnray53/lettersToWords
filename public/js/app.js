const permForm=document.querySelector('form');
const wordString=document.querySelector('input');
const minSize=document.querySelector('#minSize');
const maxSize=document.querySelector('#maxSize');

const results=document.querySelector('#results');

results.textContent='';

permForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const word=wordString.value;
    const min=minSize.value;
    const max=maxSize.value;

    results.textContent='Loading...';

    fetch('/permuteWord?word='+word+'&min='+min+'&max='+max).then((res)=>{
        res.json().then((wordsArray)=>{
            if(wordsArray.error){
                results.textContent=wordsArray.error;
            }else{
                results.textContent='';
                wordsArray.forEach((word) => {
                    results.insertAdjacentHTML('beforeend', '<p>'+word+'</p>');
                });
            }
        })
    })
})