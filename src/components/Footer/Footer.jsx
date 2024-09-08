import TasksFilter from '../TasksFilter/TasksFilter.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Footer({ todos, clearCompleted, setRenderRule }) {
  const [todosLeft, setTodosLeft] = useState(0);
  useEffect(() => {
    setTodosLeft(todos.reduce((acc, item) => (item.completed ? acc : acc + 1), 0));
  }, [todos]);
  return (
    <footer className="footer">
      <span className="todo-count">{todosLeft} items left</span>
      <TasksFilter setRenderRule={setRenderRule} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.propTypes = {
  todos: PropTypes.array,
  clearCompleted: PropTypes.func,
  setRenderRule: PropTypes.func,
};
