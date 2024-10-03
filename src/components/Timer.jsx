import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function Timer({ task, editTodo }) {
  const { startTime, timeLeft } = task.timer;
  const [time, setTime] = useState(timeLeft || 0);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const difference = now - startTime;
        const left = timeLeft - difference;

        if (left <= 0) {
          clearInterval(interval);
          setTime(0);
        } else {
          setTime(left);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, timeLeft]);

  const handleStart = () => {
    editTodo({
      ...task,
      timer: {
        startTime: Date.now(),
        timeLeft: time,
      },
    });
  };

  const handlePause = () => {
    editTodo({
      ...task,
      timer: {
        startTime: null,
        timeLeft: time,
      },
    });
  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={handleStart}></button>
      <button className="icon icon-pause" onClick={handlePause}></button>
      <span className="left-time">{format(new Date(time), 'mm:ss')}</span>
    </span>
  );
}
Timer.propTypes = {
  task: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
};
