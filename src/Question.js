import React from 'react'

function Question({questionTasks, setJokers, timeOut, jokers, nextQuestion, setEndIsFalse , endIsFalse, correct, moneyOrder,qOrder,handleClick,time}) {
    const findAward=(obj,order)=>{
        if(order==0)
        return 0;
        else if(obj[order-1].border)
        return obj[order-1].price;
        else
        {order--;
         return findAward(obj,order);}}
    const halfJoker=(e)=>{
        if(jokers.half){
            e.target.pointerEvents='none';
            e.target.style.opacity='0.2';
            let randomNumber=Math.floor(Math.random()*99)%3;
            let inCorrectArr=[]; 
            for(let opt of document.querySelectorAll('.opt'))
            if(opt.id!=questionTasks[qOrder].answer)
            inCorrectArr.push(opt);
            for(let optIndex in inCorrectArr)
            if(randomNumber!=optIndex)
            {inCorrectArr[optIndex].style.pointerEvents = 'none';
            inCorrectArr[optIndex].innerHTML = '';}
            setJokers(prev=>({...prev,'half':false}));}}
            const correctStyle=(x)=>{
                x.style.backgroundColor='orange';
                x.style.backgroundImage='none';   
            }
    const spectatorsJoker=(e)=>{
        if(jokers.spectator){
            e.target.pointerEvents='none';
            e.target.style.opacity='0.2';
            let randomNumber1=Math.floor(Math.random()*100)%4;
            let randomNumber2=Math.floor(Math.random()*99)%3;
            let inCorrectArr=[];
            let correctOpt='';
            for(let opt of document.querySelectorAll('.opt'))
            if(opt.id!=questionTasks[qOrder].answer)
            inCorrectArr.push(opt);
            else
            correctOpt=opt;
            randomNumber1!=0?correctStyle(correctOpt):randomNumber2==0?
            correctStyle(inCorrectArr[0]):randomNumber2==1?correctStyle(inCorrectArr[1]):correctStyle(inCorrectArr[2]);
            setJokers(prev=>({...prev,'spectator':false}));
        }
            
        }
    const callJoker=(e)=>{
        if(jokers.phoneCall){
            e.target.pointerEvents='none';
            e.target.style.opacity='0.2';
            let randomNumber1=Math.floor(Math.random()*100)%4;
            let randomNumber2=Math.floor(Math.random()*99)%3;
            let inCorrectArr=[];
            let correctOpt='';
            for(let opt of document.querySelectorAll('.opt'))
            if(opt.id!=questionTasks[qOrder].answer)
            inCorrectArr.push(opt);
            else
            correctOpt=opt;
            randomNumber1!=0?correctStyle(correctOpt):randomNumber2==0?
            correctStyle(inCorrectArr[0]):randomNumber2==1?correctStyle(inCorrectArr[1]):correctStyle(inCorrectArr[2]);
            setJokers(prev=>({...prev,'phoneCall':false}));
        }}
   const twoAnswerJoker=()=>{
    if(jokers.twoAnswer)
    {setJokers(prev=>({...prev,'twoAnswer':'active'}));}
    }
    const twoAnswerClick=(e)=>{
    setJokers(prev=>({...prev,'twoAnswer':'passive'}));
    console.log('çiftcevap');
    e.target.style.backgroundColor='blue';
    e.target.style.backgroundImage='none';
    for(let child of e.target.parentElement.children)
    child.style.pointerEvents='none';
    setTimeout(() =>{
        if(e.target.id==questionTasks[qOrder].answer)
    { 

      e.target.style.backgroundColor='green';
    e.target.style.backgroundImage='none';
      if(qOrder<11)
      setTimeout(() => {
        nextQuestion();
    }, timeOut);
    else
    setTimeout(()=>setEndIsFalse(false),timeOut);
    } 
   

    else{
        for(let child of e.target.parentElement.children)
        if(child!=e.target)
        child.style.pointerEvents='all';
    // e.target.style.pointerEvents='none';
    e.target.style.backgroundColor='red';
    e.target.style.backgroundImage='none';
     }
    }, timeOut);

    }

  return (<div className='left-side'>
    {questionTasks[qOrder]&&endIsFalse?(
        <div  className="question-card">
            <div className="top-info">
                <div className='time'>{time}</div>
                <div className="jokers">
                    <div onClick={halfJoker} className="half">50/50</div>
                    <div onClick={spectatorsJoker} className="spectators">Seyirci</div>
                    <div onClick={callJoker} className="call">Telefon</div>
                    <div onClick={twoAnswerJoker} className={jokers.twoAnswer===true?'':"twoAnswer"}>Çift Cevap</div>
                </div>
            </div>
          
          <div className='question'>{questionTasks[qOrder].question}</div>
          <div className="options">
            {questionTasks[qOrder].options.map((option,index)=>(
              <div id={index==0?'A':index=='1'?'B':index=='2'?'C':index=='3'?'D':''} 
              onClick={jokers.twoAnswer=='active'?twoAnswerClick:handleClick} className="opt">{option.text}</div>
            ))}
          </div>
      </div>):(<div className='game-end'>Kazandığın miktar: {qOrder==11&&correct?'1.000.000':findAward(moneyOrder,qOrder)} TL</div>)}</div>
  )
}

export default Question