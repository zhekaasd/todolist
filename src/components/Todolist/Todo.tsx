import React, {ChangeEvent, useState, KeyboardEvent } from 'react'
import { TaskType, randomColor } from '../../App'
import { CustomDefaultButton } from '../assets/button/CustomDefaultButton';

import styles from './todo.module.css';

type TodoPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filtered: (value: 'all' | 'completed' | 'active') => void
    filter: 'all' | 'completed' | 'active'
}

export default function Todo(props: TodoPropsType) {

    const [popup, setPopup] = useState(false);

    const {title, tasks, removeTask, addTask, filtered, filter} = props;

    const [inputValue, setInputValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onClickHandler = () => {
        addTask(inputValue);
        setInputValue('');
        setPopup(false);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && e.shiftKey) {
            onClickHandler();
        }
    }

    const filteredTaskHandler = (value: 'all' | 'active' | 'completed' ) => {
        filtered(value);

    }

    const date = new Date().toLocaleString().split(', ');

  return (
    <React.Fragment>

<div  className={styles.todo} >
        
        {/* --- date todo block --- */}
        
                <div className={styles.todo__header}>
                    {/* <span>remove todo</span> */}
                    <i onClick={() => alert('remove this todo')} className='bx bxs-trash-alt'></i>
                    <span >
                            {/* <p >{date[0]}</p> */}
                            {/* <p>{date[1]}</p> */}
                            <p>Thursday</p>
                            <p>23 August 2018</p>
                             
                    </span>
                </div>
        
        {/* --- main block todo --- */}
                <div className={styles.todo__main} >
                    <h2 className={styles.todo__title} style={{color: randomColor()}}>
                            {/* {title} */}
                            To do List
                    </h2>
                    <div className={styles.todo__filtered} >
                        <span onClick={() => filteredTaskHandler('all')} className={filter === 'all' ? styles.todo__filtered_active : ''}>all</span>
                        <span onClick={() => filteredTaskHandler('active')} className={filter === 'active' ? styles.todo__filtered_active : ''}>active</span>
                        <span onClick={() => filteredTaskHandler('completed')} className={filter === 'completed' ? styles.todo__filtered_active : ''}>done</span>
                    </div>
                </div>

                                    
                <ul className={styles.todo__list_tasks} >
                    {tasks.map((task) => {
        
                        const removeTaskHandler = () => {removeTask(task.id);} 
                            
                         return <li key={task.id} className={styles.item}>

                                <div className={styles.item__title}>
                                    <input checked={task.isDone} type="checkbox" />
                                    <span >{task.title} </span>
                                </div>
                                <i onClick={removeTaskHandler} className='bx bx-x'></i>
        
                        </li>})}
                </ul>
        
        
                <div className={styles.todo__add_item_button} onClick={() => setPopup(true)} >
                    <i className='bx bxs-plus-circle' ></i>
                </div> 
                
            </div>

            {
                popup && <div onClick={(e) => setPopup(false)} className={styles.popup}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.window} >
                        <p>text</p>
                        <input value={inputValue} onChange={onChangeHandler} placeholder='task text..' type="text" />
                        <div className={styles.buttons__block}>
                            <span className={styles.close} onClick={() => setPopup(false)}>cancel</span>
                            <span onClick={onClickHandler}>send</span>
                        </div>
                    </div>
                </div>
            }

    </React.Fragment>
  )
}
