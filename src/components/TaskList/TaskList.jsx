import Task from '../Task/Task.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function TaskList({ todos, editTodo, deleteTodo, renderRule }) {
  const [listToRender, setListRender] = useState(todos);
  useEffect(() => {
    setListRender(
      todos.filter((item) => {
        if (renderRule === 'active') return !item.completed;
        if (renderRule === 'completed') return item.completed;
        return true;
      }),
    );
  }, [renderRule, todos]);
  return (
    <ul className="todo-list">
      {listToRender.map((item) => (
        <li key={item.id} className={item.editState && !item.completed ? 'editing' : null}>
          <Task task={{ ...item }} editTodo={editTodo} deleteTodo={deleteTodo} />
        </li>
      ))}
    </ul>
  );
}
TaskList.propTypes = {
  todos: PropTypes.array,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  renderRule: PropTypes.string,
};
