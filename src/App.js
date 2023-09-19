import './App.css';
import react, {useEffect, useState, useRef} from 'react';
import Question from './Question';
import Order from './Order';
const moneyOrder=[
  {'order':1,'price':'1.000', 'border':false},
  {'order':2,'price':'2.000', 'border':true},
  {'order':3,'price':'3.000', 'border':false},
  {'order':4,'price':'5.000', 'border':false},
  {'order':5,'price':'7.500', 'border':false},
  {'order':6,'price':'10.000', 'border':false},
  {'order':7,'price':'30.000', 'border':true},
  {'order':8,'price':'50.000', 'border':false},
  {'order':9,'price':'100.000', 'border':false},
  {'order':10,'price':'200.000', 'border':false},
  {'order':11,'price':'400.000', 'border':false},
  {'order':12,'price':'1.000.000', 'border':false}
];
const timeOut=2000;
const qDuration=30;
function App() {
  const [questionTasks,setQuestionTasks]=useState('');
  const [qOrder, setQOrder]=useState(0);
  const [quizLength,setQuizLength]=useState();
  const [endIsFalse,setEndIsFalse]=useState(true);
  const [time, setTime]=useState(qDuration);
  const [correct, setCorrect]=useState('');
  const [jokers, setJokers]=useState({'half':true,'spectator':true,'phoneCall':true,'twoAnswer':false});
 
  const intervalRef=useRef();
  useEffect(()=>{
    fetch('http://localhost:3000/questions')
    .then(response=>response.json())
    .then(data=>{setQuestionTasks(data);
      setQuizLength(data.length);
    });
    intervalRef.current=setInterval(()=>setTime(prev=>prev-1),1000);

  },[]);
  useEffect(()=>{
    clearInterval(intervalRef.current);
    setTime(qDuration);
    intervalRef.current=setInterval(()=>setTime(prev=>prev-1),1000);
    if(qOrder==7)
    setJokers(prev=>({...prev,'twoAnswer':true}));
  },[qOrder]);
  useEffect(()=>{
    if(time<=0)
    {
      clearInterval(intervalRef.current);
      setEndIsFalse(false);
    }
  },[time])

  

  const isTrue=(x)=>{
   
    if(x.target.id==questionTasks[qOrder].answer)
    { setCorrect(true);
      x.target.style.backgroundColor='green';
    x.target.style.backgroundImage='none';
      if(qOrder<11)
      setTimeout(() => {
        nextQuestion();
    }, timeOut);
    else
    setTimeout(()=>setEndIsFalse(false),timeOut);
    } 
   

    else{
    for(let child of x.target.parentElement.children)
      
      if(child.id==questionTasks[qOrder].answer){
        setCorrect(false);
         child.style.backgroundColor='green';
         child.style.backgroundImage='none';
          x.target.style.backgroundColor='red'; 
         x.target.style.backgroundImage='none';
         setTimeout(()=>setEndIsFalse(false),timeOut);

        }}
  } 
  const handleClick=(e)=>{
    
    clearInterval(intervalRef.current);
    e.target.style.backgroundColor='blue';
    e.target.style.backgroundImage='none';
    for(let child of e.target.parentElement.children)
    child.style.pointerEvents='none';
    setTimeout(() =>isTrue(e), timeOut);
   
   };

  const nextQuestion=()=>{
    
    setQOrder(prev=>prev+1);
    for(let child of document.querySelectorAll('.opt'))
    {child.style.backgroundImage='linear-gradient(rgb(3, 5, 43),rgb(28, 15, 173))';
    child.style.pointerEvents='all';}

  }
  
  return (
    <div className="app ">
  <Question  questionTasks={questionTasks} isTrue={isTrue} moneyOrder={moneyOrder} correct={correct}
   qOrder={qOrder} time={time}  handleClick={handleClick} endIsFalse={endIsFalse}
   jokers={jokers} setJokers={setJokers} timeOut={timeOut} setCorrect={setCorrect} nextQuestion={nextQuestion} setEndIsFalse={setEndIsFalse}  />
  <Order moneyOrder={moneyOrder} qOrder={qOrder} />
    </div>
    
  );
} 

export default App;