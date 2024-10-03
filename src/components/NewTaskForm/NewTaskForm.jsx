import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import translateToMilliseconds from '../../utils/translateToMilliseconds.js';

export default function NewTaskForm({ addTodo }) {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [alertText, setAlertText] = useState('');
  const textTaskRef = useRef(null);
  const minuteRef = useRef(null);
  const secondsRef = useRef(null);

  function validateForm() {
    let alertMsg = '';
    if (min < 1) {
      alertMsg += 'Минуты не могут иметь значение меньше 1. ';
    }
    if (sec < 1) {
      alertMsg += 'Секунды не могут иметь значение меньше 0. ';
    }
    if (sec > 60) {
      alertMsg += 'Секунды не могут иметь значение больше 60.';
    }
    if (alertMsg) {
      setAlertText(alertMsg);
      return false;
    }
    return true;
  }
  function clearForm() {
    setText('');
    setMin('');
    setSec('');
  }

  useEffect(() => {
    textTaskRef.current.focus();
  }, []);
  return (
    <>
      {alertText && <div className="alert-text">{alertText}</div>}
      <form
        onSubmit={(e) => {
          setAlertText('');
          e.preventDefault();
          if (!validateForm()) return;
          clearForm();
          addTodo({
            id: `task${Date.now()}`,
            value: text,
            completed: false,
            createDate: new Date(),
            timer: {
              startTime: null,
              timeLeft: translateToMilliseconds(Number(min), Number(sec)),
            },
          });
        }}
      >
        <input
          ref={textTaskRef}
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onInput={() => setText(textTaskRef.current.value)}
          required={true}
        />
        <input
          ref={minuteRef}
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={() => {
            setMin(minuteRef.current.value);
          }}
          required={true}
        />
        <input
          ref={secondsRef}
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={() => {
            setSec(secondsRef.current.value);
          }}
          required={true}
        />
        <button style={{ display: 'none' }}>submit</button>
      </form>
    </>
  );
}
NewTaskForm.propTypes = {
  addTodo: PropTypes.func,
};
