import React, { useState, ChangeEvent, KeyboardEvent, MouseEventHandler, DetailedHTMLProps, HTMLAttributes, useEffect, useRef, MouseEvent } from 'react';
import { TaskType } from '../../../App';
import { CustomDefaultButton } from '../../assets/button/CustomDefaultButton';


import bskt from '../../rubbish-bin.png';
import CheckboxCustom from '../../assets/checkbox/CheckboxCustom';

import styles from './todolistRestyle.module.css';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filtered: (value: 'all' | 'active' | 'completed') => void
    cleanTodolist: () => void
    filter: 'all' | 'active' | 'completed'
}

const getDateAndTime = () => {
    const objectDate = new Date();
    const time = objectDate.toLocaleTimeString();
    const date = objectDate.toDateString();
    
    const resultDate = date.split(' ').filter( (el, i) => i > 0 && i < 3).reverse().join(' ');
    const resultTime = time.split(':').filter( (el,i,arr) => i < arr.length - 1).join(':') ;
    
    return [resultDate, resultTime];
}

function TodolistRestyle(props: TodolistPropsType) {
    
// Диструктуризация пропсов    
const {title, tasks, removeTask, addTask, filtered, filter} = props;
// !!!!!!!!!!!
const [edit, setEdit] = useState(false);


const editOnTodoClickHandler = () => setEdit(true);
const editOffTodoClickHandler = () => setEdit(false);


// Состояние тудулиста свёрнут или нет
    const [collapsed, setCollapsed] = useState(false);

// Состояние со значением в инпуте
    const [inputValue, setInputValue] = useState('');

// Подписка на изменение состояние в инпуте и обновления состояния
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

// Добавление новой таски по клику, очистка инпута и закрытие модального окна
    const onClickHandler = () => {
        addTask(inputValue);
        setInputValue('');
        // setPopup(false);
    };


// Добавление новой таски при сочитании клавиш, очистка инпута и закрытие модального окна
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && e.shiftKey) {
            onClickHandler();
        }
    }

    const filteredTaskHandler = (value: 'all' | 'active' | 'completed' ) => {
        filtered(value);
    }

    const [date, time] = getDateAndTime();

    

// Выйти из режима редактирования, если кликнуто не по тудулисту
    const todoRef: any = useRef(null);

    useEffect(() => {
        const onClick = (e: any) => {
            todoRef.current.contains(e.target) || editOffTodoClickHandler();
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const [editTask, setEditTask] = useState(false);
    const [newTaskEditMode, setNewTaskEditMode] = useState(false);

    const accordionClickHandler = () => {
        setCollapsed(!collapsed);
        //setEdit(false);
        editOffTodoClickHandler();
    };


    const onEditTaskClickHandler = () => setEditTask(true);
    const offEditTaskClickHandler = () => setEditTask(false);

    const onEditModeAddNewItem = (e: MouseEvent) => {
        
        //setNewTaskEditMode(true);
    }

    
    const onEditAddNewTaskClickHandler = () => setNewTaskEditMode(true);
    const offEditAddNewTaskClickHandler = () => setNewTaskEditMode(false);


    console.log(newTaskEditMode);
    

  return (

    <React.Fragment>


{/* ------------------------------------------------------------------ */}

    <div className={styles.todolist} ref={todoRef} id='todo' >

{/* ------------------ header todolist ( title, date, icons ) ------------------ */}
        <div className={styles.todolist__header} >
                <div className={styles.todolist__header_title}>

                    {
                        edit ? <input autoFocus type='text'  /> : <h2> {title} </h2> 
                    }
                        
                    <span > {new Date().toDateString()} </span>
                </div>

                <div className={styles.todolist__header_icons}>
                        <i onClick={accordionClickHandler} className={`bx bxs-chevrons-down ${styles.icon_arrow} ${!collapsed ? styles.up : styles.down}`}></i>
                        <i onClick={editOnTodoClickHandler} className='bx bxs-edit'></i>
                        <i className='bx bxs-x-square'></i>
                </div>
        </div>
{/* ------------------ list items task ------------------ */}
        {
            !collapsed && <ul className={styles.todolist__task_list} >
            {
                tasks.map((task) => {

                    const removeTaskHandler = (e: MouseEvent<HTMLSpanElement>) => {
                        removeTask(task.id);
                        e.stopPropagation(); // ???????????
                    }
                    
                return <li className={styles.item} key={task.id}>
                    <div className={styles.item__data}>
                        <label>
                            
                            <input disabled={edit} type="checkbox" checked={task.isDone} />

                            <div className={styles.item__description}>
                                <div className={styles.item__title}>
                                    {
                                        !editTask ? <p>{task.title} assdgsdfsa asgds</p> : <input type="text" autoFocus /> 
                                    }
                                </div>

{/* ------------------ settings block: edit mode task and remove item from todolist toggle to cancel and save task state ------------------ */}

                                {
                                    !edit && <div className={`${styles.item__settings} ${editTask && styles.item__settings_edit_mode}`}>
                                        {
                                            !editTask ? <React.Fragment>
                                                            <span onClick={onEditTaskClickHandler}> edit</span> 
                                                            <span onClick={removeTaskHandler}>remove</span> 
                                                        </React.Fragment>
                                                        : <React.Fragment>
                                                            <span onClick={offEditTaskClickHandler}>cancel</span> 
                                                            <span onClick={offEditTaskClickHandler}>save</span>
                                                        </React.Fragment>
                                        }

                                    </div>
                                }
                            </div>
                        </label>
                    </div>

{/* ------------------ date and time added task : toggle to remove task icon   ------------------ */}
                    <div className={styles.item__date_and_time} >
                        {
                            edit ? <i onClick={removeTaskHandler} className='bx bx-x'></i> 
                                    : <React.Fragment>
                                        {date}
                                        <span>{time}</span>
                                    </React.Fragment>
                        }
                            
                    </div>
                
                </li>})
            }
            
{/* ------------------ block add new task  ------------------ */}

            <div className={`${styles.todolist__add_new_item} ${edit && styles.todolist__add_new_item__edit_mode}`} >
                {
                    newTaskEditMode ? <div className={styles.new_item__form} >
                        <input placeholder='enter your task..' autoFocus onBlur={offEditAddNewTaskClickHandler} type="text"  />
                        <div className={styles.new_item__form_buttons}>
                            <span onMouseDown={(e) => e.preventDefault()} onClick={() => {

                                offEditAddNewTaskClickHandler();
                            }}>cancel</span>
                            <span onMouseDown={(e) => e.preventDefault()} onClick={() => {
                                addTask(inputValue);
                                offEditAddNewTaskClickHandler();
                            }} className={styles.button__add_task} >
                                add task 
                                <i  className={`bx bx-subdirectory-left`} ></i> 
                            </span>
                        
                        
                        </div>
                    </div> : <div onClick={onEditAddNewTaskClickHandler}  className={styles.add_item}>
                        <i className='bx bx-plus'></i> 
                        <span>New Todo</span>
                    </div>
                }
            </div>
        </ul> 
        }

        
{/* ------------------ filtered block and buttons calcel / confirm / remove all  ------------------ */}
            {
               !collapsed ? <div className={`${styles.todolist__filtration} ${edit && styles.todolist__filtration_edit_mode}`} >
                    {
                        edit ? <React.Fragment>
                            <span  onClick={props.cleanTodolist}>clear all</span> 
                           <div>
                                <span onClick={editOffTodoClickHandler}>cancel</span>
                                <span onClick={editOffTodoClickHandler}>ok</span>
                           </div>
                        </React.Fragment> : <React.Fragment>
                            <span className={filter === 'all' ? styles.active : ''} onClick={() => filteredTaskHandler('all')}>all</span>
                            <span className={filter === 'active' ? styles.active : ''}  onClick={() => filteredTaskHandler('active')}>active</span>
                            <span className={filter === 'completed' ? styles.active : ''}  onClick={() => filteredTaskHandler('completed')}>completed</span>
                        </React.Fragment>
                    }
                    
                    
                </div> :  <p className={styles.todolist__tasks_count}>{tasks.length} tasks</p> 
                
            }
                    
    </div> 

    </React.Fragment>
  )
};

export default TodolistRestyle;
