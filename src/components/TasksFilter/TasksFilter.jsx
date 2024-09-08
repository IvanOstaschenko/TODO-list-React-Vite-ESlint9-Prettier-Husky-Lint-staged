import { useState } from 'react';
import PropTypes from 'prop-types';

export default function TasksFilter({ setRenderRule }) {
  const [value, setValue] = useState('all');
  const changeValue = () => {
    setValue(event.target.value);
    setRenderRule(event.target.value);
  };
  return (
    <form className="filters">
      <label htmlFor="rul1" className={value === 'all' ? 'selected' : null}>
        <input
          style={{ display: 'none' }}
          id="rul1"
          type="radio"
          name="renderRule"
          value="all"
          checked={value === 'all'}
          onChange={changeValue}
        />
        All
      </label>
      <label htmlFor="rul2" className={value === 'active' ? 'selected' : null}>
        <input
          style={{ display: 'none' }}
          id="rul2"
          type="radio"
          name="renderRule"
          value="active"
          checked={value === 'active'}
          onChange={changeValue}
        />
        Active
      </label>
      <label htmlFor="rul3" className={value === 'completed' ? 'selected' : null}>
        <input
          style={{ display: 'none' }}
          id="rul3"
          type="radio"
          name="renderRule"
          value="completed"
          checked={value === 'completed'}
          onChange={changeValue}
        />
        Completed
      </label>
    </form>
  );
}
TasksFilter.propTypes = {
  setRenderRule: PropTypes.func,
};
