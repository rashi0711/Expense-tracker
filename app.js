const balanceamount=document.getElementById('balance-amount');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount =document.getElementById('amount');
const btn=document.getElementById('transactions-btn');


btn.addEventListener('click',addNewTransactions);


// let transactions=[
//     {id:++id,text:'Book',amount:-200},
//     {id:++id,text:'Laptop',amount:600},
//     {id:++id,text:'Pencil',amount:-20},
//     {id:++id,text:'Camera',amount:150}

// ];
const localStoragevalue=JSON.parse(localStorage.getItem('transactions'));

let transactions=localStorage.getItem('transactions')!==null?localStoragevalue:[];


function addNewTransactions(e)
{
    const textVal=text.value;
    const amountVal=amount.value;
    if(textVal.trim()==='' || amountVal.trim()==='' )
    {
        alert("Please enter valid data");
    }
    else
    {
    const transaction={
         id:generateID(),
         text:textVal,
         amount:parseFloat(amountVal)
        }
    transactions.push(transaction);
    addAll();
    updateValue();
    updateLocalStorage();
    text.value='';
    amount.value='';
    }
    e.preventDefault();
}
function generateID()
{
    return Math.floor(Math.random()*10000000);
}
function addtransaction(transaction)
{
   const sign=(transaction.amount<0?'-':'+');
   const li=document.createElement('li');
   li.classList.add(transaction.amount<0?'minus':'plus');


   li.innerHTML=`${transaction.text}<span>${sign} ${Math.abs(transaction.amount)}</span> 
                 <button class="delete-btn" id="delete" onclick="removeTransaction(${transaction.id})">x
                 </button>`
  list.appendChild(li);
  
}
function addAll()
{
    list.innerHTML='';
    transactions.forEach(function(trans)
    {
        addtransaction(trans);  
    })
    
}
function updateValue()
{
    const amount_total=transactions.map(trans=>trans.amount);
    const total=amount_total.reduce(getSum,0);
    function getSum(acc,item)
    {
        acc+=item;
        return acc;
    }
    const income=amount_total.filter(filterposValue).reduce(getSum,0).toFixed(2);
    const expense=(amount_total.filter(filternegValue).reduce(getSum,0)*-1).toFixed(2);
    balanceamount.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
    
    function filterposValue(item)
    {
        if(item>=0)
        {
            return item;
        }
    
    }
    function filternegValue(item)
    {
        if(item<0)
        {
            return item;
        }
    
    }
    
}
function removeTransaction(id1)
{
    
    transactions=transactions.filter(function(item)
    {
        if(item.id!==id1)
        {
            return item;
        } 
    });
    addAll();
    updateValue();
    updateLocalStorage();
}
function updateLocalStorage()
{
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
addAll();
updateValue();
