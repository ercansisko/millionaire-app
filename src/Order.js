import React, { useEffect } from 'react'

function Order({moneyOrder,qOrder}) {
    useEffect(()=>{
        
    },[qOrder]);
  return (
    <div className='right-side'>
        <ul>
        {moneyOrder.map((item,index)=>(<li key={index} style={item.border?{backgroundColor:'orange',color:'black'}:{}}
        className={qOrder==item.order-1?'active':''}><span className='order'>{item.order}</span>
        <span className='order-price'>{item.price} TL</span></li>))}
        </ul>
        
    </div>
  )
}

export default Order