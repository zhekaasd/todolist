import React, { useState, ChangeEvent, KeyboardEvent, MouseEventHandler, DetailedHTMLProps, HTMLAttributes } from 'react';
import { TaskType } from '../../App';
import { CustomDefaultButton } from '../assets/button/CustomDefaultButton';
import styles from './todolist.module.css';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filtered: (value: 'all' | 'completed' | 'active') => void
}

const getDateAndTime = (item: string) => {
    const array = item.split(',').map(el => el.trim());
    let date = array[0];
    let time = array[1].split(':');

    date = date.split('.').map( el => el.length > 2 ? el.split('').filter((element,i) => i > 1).join('') : el).join('/');
    time.length = 2;
    
    return [date, time.join(':')];
}

function Todolist(props: TodolistPropsType) {
    
// Диструктуризация пропсов    
const {title, tasks, removeTask, addTask, filtered} = props;

// Состояние модального окна при добавлении таски
    const [popup, setPopup] = useState(false);

// Состояние тудулиста свёрнут или нет
    const [collapsed, setCollapsed] = useState(true);

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
        setPopup(false);
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

    const [date, time] = getDateAndTime(new Date().toLocaleString());

    

    console.log(date);
    

  return (

    <React.Fragment>




{/* ------------------------------------------------------------------ */}

    {
        !popup ? <div className={styles.todolist}>

        <div className={styles.todolist__header}>
            <div className={styles.todolist__header_description}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <span className={styles.date}>
                    {new Date().toDateString()}
                </span>
            </div>
            {/* ❌ */}

            <div className={styles.todolist__header_dynamic_data}> 
                {
                    collapsed ? <span>✍️</span>  : `12323 ${tasks.length} tasks`
                } 
            </div>


            
        </div>

        {/* <div style={{}}> */}
            {/* <input value={inputValue} onChange={onChangeHandler} type="text" onKeyDown={onKeyPressHandler} /> */}
            {/* <button style={{width: '40px', height: '40px', borderRadius: '50%', position: 'absolute', right: '2rem', top: '0'}} onClick={onClickHandler}>+</button>  */}
            {/* <CustomDefaultButton onClick={onClickHandler}>add</CustomDefaultButton> */}
        {/* </div> */}

        {
            collapsed && <button className={styles.button__plus}  onClick={() => setPopup(true)}
                
            >+</button> 
        }

        {
            collapsed && <ul className={styles.todolist__list_tasks}>
            {
                tasks.map((task) => {

                    const removeTaskHandler = () => {
                        removeTask(task.id);
                    }
                    
                return <li className={styles.task} key={task.id}>
                    <div className={styles.task__title}>
                        
                        <input type="checkbox" checked={task.isDone} />
                        <span >{task.title}</span>
                    </div>
                    
                    <span className={styles.task__date} >
                        {/* {task.title} */}
                        {/* {date} */}
                        16 Apr
                        <span >{time}</span>
                    </span>
                    
                    {/* <CustomDefaultButton onClick={removeTaskHandler} styleType='smallSize'>x</CustomDefaultButton> */}
                    {/* <button onClick={removeTaskHandler}>x</button> */}
                </li>})
            }
        </ul>
        }
        
        {/* <div style={{marginBottom: '1rem'}}> */}

            {/* <CustomDefaultButton onClick={() => filteredTaskHandler('all')} >all</CustomDefaultButton> */}
             {/* <CustomDefaultButton onClick={() => filteredTaskHandler('active')} >active</CustomDefaultButton> */}

             {/* <CustomDefaultButton onClick={() => filteredTaskHandler('completed')}>completed</CustomDefaultButton> */}
        {/* </div> */}
        {/* <div style={{zIndex: '5', background: '#f1e7ff', padding: '1rem 1rem .5rem', position: 'relative', top: !collapsed ? '-26px' : '0'}}>
            
        </div> */}
        {/* <div onClick={() => setCollapsed(!collapsed)} style={{zIndex: '11' ,width: '30px', height: '30px', borderRadius: '50%', background: 'darkgreen', textAlign: 'center', position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', bottom: !collapsed ? '2rem' : '.5rem'}}>
                    {collapsed ? '🔺' : '🔻'}
        </div> */}
        <div className={styles.todolist__icon_arrow} onClick={() => setCollapsed(!collapsed)} >
                    {
                        collapsed
                            ? <i className={`bx bxs-chevron-down ${styles.icon__arrow_up}`}></i> 
                                : <i className='bx bxs-chevron-down'></i>}
        </div>
                    
    </div> 

// popup part2

    : <div onClick={(e) => setPopup(false) } className={styles.todolist__modal_window} >
        

        <div onClick={(e) => {e.stopPropagation()}} className={styles.modal__form}>
            
            <div onClick={() => setPopup(false)} className={styles.modal__closed}>x</div>
            
            <div style={{position: 'relative'}}>
                
                <h4 style={{margin: '0 0 2rem 0', display: 'inline-block'}}>Add task</h4> 
                
                <span style={{
                    display: 'inline-block', 
                    position: 'absolute', 
                    textAlign: 'right', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    right: '-5px',
                    top: '-10px',
                    color: 'rgba(0, 0, 0, .33)',
                }}># Todolist title</span>

            </div>

            <label style={{width: '100%', marginBottom: '1.5rem'}}>
                <p style={{margin: '0 0 .5rem', fontSize: '12px'}}>Title</p>
                <input onChange={onChangeHandler} style={{width: '-webkit-fill-available', padding: '.25rem .5rem'}} type="text" />
            </label>

            {/* <label style={{width: '100%', marginBottom: '1.5rem'}}>
                <p style={{margin: '0 0 .5rem', fontSize: '12px'}}>Status</p>
                <select style={{width: '100%', padding: '.25rem .5rem'}} name="" id="">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </label> */}
            



            <div style={{margin: '.5rem 0 .5rem'}}>
                
                <button onClick={onClickHandler} style={{padding: '.2rem 1rem', marginRight: '1.5rem'}}>send</button>
                <button style={{padding: '.2rem 1rem', }} onClick={() => setPopup(false)}>cancel</button>
            </div>
        </div>
    </div>
    }

    </React.Fragment>
  )
};

export default Todolist;
