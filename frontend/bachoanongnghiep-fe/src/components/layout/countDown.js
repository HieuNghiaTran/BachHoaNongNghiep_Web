import { useEffect, useState } from "react";
import moment from 'moment';

const CountDown = () => {
    const [endTime, setEndTime] = useState(moment().add(4, 'hours')); 
    const [timeLeft, setTimeLeft] = useState(moment.duration(endTime.diff(moment())));
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const newTimeLeft = moment.duration(endTime.diff(moment()));
        setTimeLeft(newTimeLeft);
  
        if (newTimeLeft.asSeconds() <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    if (timeLeft === null) {
      return null; 
  }

    return (
        <>
        <span className=" p-1" style={{fontWeight:"bold", color:"#fff", background:"#ff4949", borderRadius:"5px"}}>
            {Math.floor(timeLeft.asHours())}  
        </span>
        <span style={{color:"#ff4949"}}> : </span>
        <span className=" p-1" style={{fontWeight:"bold", color:"#fff", background:"#ff4949", borderRadius:"5px"}}>
        {timeLeft.minutes()}  
        </span>
        <span style={{color:"#ff4949"}}> : </span>



        <span className=" p-1" style={{fontWeight:"bold", color:"#fff", background:"#ff4949", borderRadius:"5px"}}>
        {timeLeft.seconds()<10? "0" + timeLeft.seconds():timeLeft.seconds()}
        </span>






       


        </>
        
    );
}

export default CountDown;