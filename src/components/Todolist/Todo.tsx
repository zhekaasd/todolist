import React, {ChangeEvent, useState, KeyboardEvent } from 'react'
import { TaskType } from '../../App'
import { CustomDefaultButton } from '../assets/button/CustomDefaultButton';

import styles from './todo.module.css';

type TodoPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filtered: (value: 'all' | 'completed' | 'active') => void
}

export default function Todo(props: TodoPropsType) {

    const [popup, setPopup] = useState(true);

    const [collapsed, setCollapsed] = useState(false);

    const {title, tasks, removeTask, addTask, filtered} = props;

    const [inputValue, setInputValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const onClickHandler = () => {
        addTask(inputValue);
        setInputValue('');
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
        
                <div style={{color: '#a7a0f3', padding: '1rem', background: 'white', display: 'flex', justifyContent: 'space-between'}}>
                    {/* <span>remove todo</span> */}
                    <i style={{fontSize: '1.25rem', color: 'darkgray'}} className='bx bxs-trash-alt'></i>
                    <span style={{ fontSize: '.65rem', color: 'darkgray', fontStyle: 'italic', cursor: 'default'}}>
                            <p style={{margin: '0', padding: '0'}}>{date[0]}</p>
                            <p style={{margin: '0', padding: '0', textAlign: 'end'}}>{date[1]}</p>
                            {/* Thursday, 23 August 2018 */}
                    </span>
                </div>
        
        {/* --- main block todo --- */}
                <div style={{background: 'white', padding: '0 1rem'}}>
                    <div style={{textAlign: 'center', margin: '1.5rem .5rem .5rem'}}>
                        <h2 style={{fontWeight: '500', margin: '0', padding: '0', color: '#f3214f'}}>
                            {/* {title} */}
                            To do List
                        </h2>
        
                    </div>
                    <div style={{margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'space-around', fontSize: '.75rem', width: '90%', color: 'darkgray', textTransform: 'uppercase', fontWeight: '500'}}>
                        <span style={{color: 'black'}}>all</span><span>active</span><span>done</span>
                    </div>
                    
                <ul style={{listStyleType: 'none', margin: '0', padding: '0', marginBottom: '2.25rem'}}>
                    {tasks.map((task) => {
        
                            const removeTaskHandler = () => {removeTask(task.id);} 
                            
                         return <li key={task.id} style={{padding: '.25rem 1.5rem', marginBottom: '.5rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
                                <div>
                                    <input style={{marginRight: '1.25rem'}} type="checkbox"  />
                                    <span style={{fontSize: '1.15rem', fontWeight: '500'}}>{task.title} </span>
                                </div>
                                <i onClick={removeTaskHandler} className='bx bx-x'></i>
        
                        </li>})}
                </ul>
                    </div>
        
        
                <div onClick={() => setPopup(true)} style={{
                        position: 'absolute', cursor: 'pointer', 
                        bottom: '-.65rem', left: '50%', 
                        transform: 'translate(-50%, 0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: '1.25rem', width: '1.25rem', background: 'white',
                }}>
                    
                        <i style={{fontSize: '2.25rem', color: '#f3214f'}} className='bx bxs-plus-circle' ></i>
                    </div> 
                
            </div>

            {
                popup && <div onClick={(e) => setPopup(false)}  style={{position: 'absolute', width: '100%', height: '100%',
                                    background: 'rgba(0,0,0,.45)', zIndex: '11', top: '0', left: '0',
                                    display: 'flex', flexDirection: 'column', 
                        }}>
                    <div onClick={(e) => e.stopPropagation()} style={{height: '200px', width: '350px', background: 'white',  padding: '1rem'}}>
                        <p>text</p>
                        <input type="text" />
                        <div style={{marginTop: '2rem', textAlign: 'end'}}>
                            <span onClick={() => setPopup(false)} style={{marginRight: '1rem'}}>cancel</span><span>send</span>
                        </div>
                    </div>
                </div>
            }

    </React.Fragment>
  )
}
