// Made By Berkay Eker

import React, { useState, useEffect } from 'react';


const App = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [newTime, setNewTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [message, setMessage] = useState('');
  const [start, setStart] = useState(false);
  let intervalId;

  useEffect(() => {
    const fetchTime = async () => {
      const response = await fetch('/api/time');
      const { time } = await response.json();
      setTimeLeft(time);
    };
    fetchTime();
  }, []);
// Made By Berkay Eker
  useEffect(() => {
    if (start) {
      const decrementTime = () => {
        setTimeLeft(prevTime => {
          const newTime = {...prevTime};
          if (newTime.seconds <= 0) {
            if (newTime.minutes <= 0) {
              if (newTime.hours <= 0) {
                clearInterval(intervalId);
                setIsTimeUp(true);
                setMessage('Tiden är ute!');
                return newTime;
              }
              newTime.hours--;
              newTime.minutes = 59;
            } else {
              newTime.minutes--;
            }
            newTime.seconds = 59;
          } else {
            newTime.seconds--;
          }
          return newTime;
        });
      };

      intervalId = setInterval(decrementTime, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [start, timeLeft]);

  const resetTimer = () => {
    setTimeLeft({ hours: 0, minutes: 30, seconds: 0 });
    setIsTimeUp(false);
    setMessage('Återställd');
    setStart(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setTimeLeft(newTime);

    await fetch('/api/time', {
      method: 'POST',
      body: JSON.stringify({ time: newTime }),
      headers: { 'Content-Type': 'application/json' }
    });
  };
// Made By Berkay Eker
  return (
    <div>
      {isTimeUp ? (
        <div>
          <p>{message}</p>
          <button onClick={resetTimer}>Återställ</button>
        </div>
      ) : (
        <div>
          <p>
             {timeLeft.hours} Tim, {timeLeft.minutes} Min, {timeLeft.seconds} Sek
          </p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Hours"
              value={newTime.hours}
              onChange={event => setNewTime({ ...newTime, hours: event.target.value })}
            />
            <input
              type="number"
              placeholder="Minutes"
              value={newTime.minutes}
              onChange={event => setNewTime({ ...newTime, minutes: event.target.value })}
            />
            <input          
              type="number"
              placeholder="Seconds"
              value={newTime.seconds}
              onChange={event => setNewTime({ ...newTime, seconds: event.target.value })}
            />

            <button type="submit">Ändra Tid</button>
            
          </form>
          {!start && (
            <button onClick={() => setStart(true)}>Starta</button>
          )}
          {start && (
          <button onClick={() => {
            clearInterval(intervalId);
            setStart(false);
                }}>Pausa</button>
          )}
          <button onClick={resetTimer}>Återställ</button>
        </div>
      
      )}
    </div>
  );
 

  
};

export default App;



// Made By Berkay Eker