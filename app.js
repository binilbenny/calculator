let num='';
let result='';
let num1='';
let num2='';
let operation='';
let isEqualPress=false;


const primaryDisplay = document.querySelector('.primary');
const secondaryDisplay = document.querySelector('.secondary')

// check the key press and call appropriate funtion
window.addEventListener('keydown', (e)=>{
    if(e.key.match(/[0-9]/gm)){       
        getNumber(e.key);
    }else if (e.key.match(/[/*\-+%]/gm))
    {
        assignNum(e.key);
    }else if(e.key.match(/[=]/gm))        
    {
        equal(); 
    }else if(e.key==='Delete'||e.key==='Backspace'){ 
        clr(e.key);
    }else if(e.key==='.'){              
        checkDot();
    }else if(e.key==='Enter'||e.key==='='){  
        equal();
    }
})

// store the number as string max 10 digit
function getNumber(n){
    if(num.length<10){
    num+=n;
    primaryDisplay.textContent=num;
    }else{
        secondaryDisplay.textContent='the number has reached the limit (10 digit)'
    }
}

//add floating point if there is't already there.
function checkDot(){
    if(num==''||num==undefined){
        num='0';
    }
    if(!(num.includes('.'))){
        num+='.'
    }
    primaryDisplay.textContent=num;
}

//  clear the calculator
function clr(c){
 if(c === 'Backspace'){
     num=num.replace(num[num.length-1],'');
 }else{
    secondaryDisplay.textContent=result;
    num='';
    num1='';
    num2='';
    result='';
    operation='';
 }
    primaryDisplay.textContent=num;
}

// equal function
function equal(){
    if(num===''&&num1===''){
        primaryDisplay.textContent='';
        secondaryDisplay.textContent='Nil'
    }else if(!(num==='')&&num1===''){
        secondaryDisplay.textContent=num+ ' =';
        num='';
    } 
    if(!(num1==='')&&(num==='')){
        num=num1;
    }
    if(!(num1==='')&&!(num==='')){
        num2=Number(num);
        if (operation!==''){
            result=calc(num1,num2,operation);
            if(typeof result==='string'){
                primaryDisplay.textContent=result;
                secondaryDisplay.textContent='';
                result='';
            }else{
                // checking the number is fraction or noe
                if((result%1)){
                    result=result.toFixed(3);
                }
                // display the result
                secondaryDisplay.textContent=`${num1} ${operation} ${num2} = ${result}`;
                primaryDisplay.textContent=result;
            }
            num='';
            num1=result;
            num2='';
            isEqualPress=true;
        }else{
            secondaryDisplay.textContent= num1;
            num1='';
        }
    }
}

function assignNum(op){
    if(isEqualPress&&num!==''){
        num1='';
        isEqualPress=false;
    }
    isEqualPress=false;
    if(num!==''&&operation==''){
        num1='';
    }
    if(!(num1==='')&&num===''){
        operation=op;
        primaryDisplay.textContent='';
        secondaryDisplay.textContent=num1+" "+operation;
    }
    else if(num1===''&&!(num==='')){
        num1=Number(num);
        num='';
        operation=op;
        primaryDisplay.textContent=num;
        secondaryDisplay.textContent=num1+" "+operation;
    }else if(num2===''&& num!==''){
        num2=Number(num);
        num='';
        primaryDisplay.textContent='';
        result=calc(num1,num2,operation);
        if(typeof result==='string'){
            primaryDisplay.textContent=result;
            result='';
            op='';
        }else{
            // checking the number is fraction or noe
            if((result%1)){
                result=result.toFixed(3);
            }
        }
        num1=result
        num2='';
        operation=op;
        secondaryDisplay.textContent=result+" "+operation;
    }
}


//  make calculation
function calc(n1,n2,op){
    if(op==='+'){
        return n1+n2;
    }else if(op==='-'){
        return n1-n2;
    }else if(op==='*'){
        return n1*n2;
    }else if(op==='/'){
        if(n2===0){
            return "Error can't divide by 0"
        }
        return n1/n2;
    }else if(op==='%'){
        return (n1/100)*n2;
    }
    
}



function squreRoot(){
    if(num==''&&num1==''){
        secondaryDisplay.textContent='0';
    }else if(num!==''&&num1==''){
        num1=Number(num);
        result = Math.sqrt(num1);
        num='';
    }else if(num==''&&num1!==''){
        result=Math.sqrt(num1);
    }


    secondaryDisplay.textContent=`√${num1} =`;
    primaryDisplay.textContent=result
    num1=result;
}

function plusMinus(){
    console.log("plus")
    if(num!==''){
        if(num.includes('-')){
            num=num.replace('-','');
        }else{
            num='-'+num;
        }
        primaryDisplay.textContent=num;
        
    }else if(result!==''){
        result=-1*result;
        num1=result;
        primaryDisplay.textContent=result;
    }
}