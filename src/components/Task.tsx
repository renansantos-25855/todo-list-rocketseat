import { Trash } from 'phosphor-react';
import styles from './Task.module.css';


export interface Task{
  id: number;
  isChecked: boolean;
  content: string;
}

interface TaskProps {
  task: Task;
  onChangeCheckbox: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function Task({onDeleteTask, onChangeCheckbox, task}: TaskProps){

  function handleOnCheckBoxChange() {
    onChangeCheckbox(task);
  }

  function handleDeleteTask(){
    onDeleteTask(task);
  }

  return(
    <div className={styles.task}>
      <input 
        type="checkbox" 
        name={`taskchk${task.id}${task.content.replace(' ', '').trim()}`} 
        id={`taskchk${task.id}${task.content.replace(' ', '').trim()}`} 
        checked={task.isChecked}
        onChange={handleOnCheckBoxChange} 
      />
      <label htmlFor={`taskchk${task.id}${task.content.replace(' ', '').trim()}`}/>
      <p>{task.content}</p>
      <button onClick={handleDeleteTask} ><Trash size={20}/></button>
    </div>
  );
}