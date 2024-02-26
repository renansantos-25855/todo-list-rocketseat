
import { Header } from './components/Header';
import styles from './App.module.css';
import { PlusCircle} from 'phosphor-react';
import Clipboard from './assets/clipboard.svg';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';



function App() {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');



  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);

  }

  function handleInvalidNewTaskText(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity("O preenchimento deste campo é obrigatório.");
  }

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      content: newTaskText,
      isChecked: false 
    } as Task;

    setTasks(prev => [...prev, newTask]);

    setNewTaskText('');

  }

  function handleChangeTaskStatus(taskToChange: Task){

    const tasksUpdated = tasks.map(task => {

      if(task.content === taskToChange.content){
        task.isChecked = !task.isChecked;
      }
      
      return task;

    });

    setTasks(tasksUpdated);

    console.log("marcou id: " + taskToChange.id);
  }

  function handleDeleteTask(taskToDelete: Task){
    const tasksUpdated = tasks.filter(task => task.content !== taskToDelete.content);
    setTasks(tasksUpdated);
    console.log("deletou id: " + taskToDelete.id);
  }

  return (
    <div>
      <Header/>
      <main className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
          <input 
            type="text"
            placeholder='Adicione uma nova tarefa' 
            value={newTaskText}
            onChange={handleNewTaskTextChange}
            onInvalid={handleInvalidNewTaskText}
            required
          />
          <button type='submit'>
            <span>Criar</span>
            <PlusCircle size={18} weight="bold" />
          </button>
        </form>
        <div className={styles.container}>
          <div className={styles.tasksInfo}>
            <div>
              <span>Tarefas criadas</span>
              <span className={styles.counter}>{tasks.length}</span>
            </div>
            <div>
              <span>Concluídas</span>
              <span className={styles.counter}>{`${tasks.filter(task => task.isChecked === true).length} de ${tasks.length}`}</span>
            </div>
          </div>
          <div className={styles.content}>
            {tasks.map(task => 
              <Task
                key={task.id} 
                onChangeCheckbox={handleChangeTaskStatus} 
                onDeleteTask={handleDeleteTask} 
                task={task} />
            )}
            {tasks.length <= 0 && <NoContent/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App


function NoContent(){
  return (
  <div className={styles.noContent}>
    <img src={Clipboard} alt="" />
    <div>
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  </div>)
}