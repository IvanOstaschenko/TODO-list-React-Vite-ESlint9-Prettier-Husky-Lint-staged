import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Task({ task, editTodo, deleteTodo }) {
  const [editValue, setEditValue] = useState(task.value);
  return (
    <>
      <div className="view">
        <input
          className="toggle"
          id={task.id}
          type="checkbox"
          checked={task.completed}
          onChange={() => {
            editTodo({ ...task, completed: !task.completed });
          }}
        />
        <label htmlFor={task.id}>
          <span className="title">{task.value}</span>
          <span className="description">
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            12:25
          </span>
          <span className="description">
            {'created ' +
              formatDistanceToNow(task.createDate, { includeSeconds: true, addSuffix: true })}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            !task.completed && editTodo({ ...task, editState: true });
          }}
        ></button>
        <button className="icon icon-destroy" onClick={() => deleteTodo(task.id)}></button>
      </div>
      {task.editState && !task.completed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editTodo({
              ...task,
              value: editValue.trim() === '' ? task.value : editValue,
              editState: false,
            });
          }}
        >
          <input
            type="text"
            className="edit"
            value={editValue}
            onInput={(e) => {
              setEditValue(e.target.value);
            }}
          />
        </form>
      )}
    </>
  );
}
Task.propTypes = {
  task: PropTypes.shape({
    completed: PropTypes.bool,
    value: PropTypes.string,
    createDate: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    editState: PropTypes.bool,
  }),
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};
