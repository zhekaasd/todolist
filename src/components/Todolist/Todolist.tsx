import React, { useState, ChangeEvent, KeyboardEvent, MouseEventHandler, DetailedHTMLProps, HTMLAttributes } from 'react';
import { TaskType } from '../../App';
import { CustomDefaultButton } from '../assets/button/CustomDefaultButton';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    filtered: (value: string) => void
}

function Todolist(props: TodolistPropsType) {
    
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

  return (

    <React.Fragment>




{/* ------------------------------------------------------------------ */}

    {
        !popup ? <div className='todolist_2' style={{marginTop: '50px', borderRadius: '1rem', position: 'relative'}}>
        <div style={{zIndex: '10', position: 'relative', borderBottom: '1px solid grey', borderTopLeftRadius: '.5rem', borderTopRightRadius: '.5rem', padding: '1rem 1rem', background: '#f1e7ff', display: 'flex', columnGap: '3rem', alignItems: 'center', justifyContent: 'space-between'}}>
            <div>
                <h2 style={{letterSpacing: '-2px', fontSize: '1.5rem', margin: 0}}>
                    {title}
                </h2>
                <span style={{display: 'block', marginTop: '8px', padding: '0', lineHeight: '1', fontStyle: 'italic', fontSize: '12px', color: 'black', opacity: .35}}>
                    {new Date().toDateString()}
                </span>
            </div>
            {
                collapsed ? <div style={{fontSize: '12px'}}>count tasks</div> : <div style={{fontSize: '12px', background: 'darkred', color: 'wheat'}}>count tasks</div> 
            }
            
        </div>

        {/* <div style={{}}> */}
            {/* <input value={inputValue} onChange={onChangeHandler} type="text" onKeyDown={onKeyPressHandler} /> */}
            {/* <button style={{width: '40px', height: '40px', borderRadius: '50%', position: 'absolute', right: '2rem', top: '0'}} onClick={onClickHandler}>+</button>  */}
            {/* <CustomDefaultButton onClick={onClickHandler}>add</CustomDefaultButton> */}
        {/* </div> */}

        {
            collapsed && <button style={{
                zIndex: '11', display: 'inline-block', 
                width: '36px', height: '36px', 
                borderRadius: '50%', 
                position: 'absolute', right: '2rem', top: '80px'}} onClick={() => setPopup(true)}
                
            >+</button> 
        }

        {
            collapsed && <ul style={{listStyle: 'none', paddingLeft: '0', margin: '0', paddingTop: '1rem', background: 'rgb(205, 194, 221)'}}>
            {
                tasks.map((task) => {

                    const removeTaskHandler = () => {
                        removeTask(task.id);
                    }
                    
                return <li key={task.id} style={{padding: '1rem', borderBottom: '1px solid rgba(140,140,140,.5)', background: '#cdc2dd', display: 'flex', justifyContent: 'space-between'}} >
                    <div>
                        
                        <input type="checkbox" checked={task.isDone} />
                        <span style={{display: 'inline-block', margin: '0 10px'}}>{task.title}</span>
                    </div>
                    
                    <span style={{display: 'inline-block', fontSize: '10px'}}>{task.title}</span>
                    
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
        <div style={{zIndex: '5', background: '#f1e7ff', padding: '1rem 1rem .5rem', position: 'relative', top: !collapsed ? '-26px' : '0'}}>
            
        </div>
        <div onClick={() => setCollapsed(!collapsed)} style={{zIndex: '11' ,width: '30px', height: '30px', borderRadius: '50%', background: 'darkgreen', textAlign: 'center', position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', bottom: !collapsed ? '2rem' : '.5rem'}}>
                    {collapsed ? '🔺' : '🔻'}
        </div>
    </div> : <div onClick={(e) => setPopup(false) } style={{zIndex: 50, background: 'black', height: '100%', position: 'absolute', width: '100%', top: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        

        <div onClick={(e) => {e.stopPropagation()}} style={{position: 'relative', background: 'white', width: '40%', height: '30ppx', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '1rem 1rem .5rem', borderRadius: '1rem'}}>
            
            <div onClick={() => setPopup(false)} style={{background: 'white', color: 'black', fontWeight: '600' ,padding: '.25rem', position: 'absolute', lineHeight: '1', right: '0', top: '-2.5rem'}}>x</div>
            
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
                <input style={{width: '-webkit-fill-available', padding: '.25rem .5rem'}} type="text" />
            </label>

            <label style={{width: '100%', marginBottom: '1.5rem'}}>
                <p style={{margin: '0 0 .5rem', fontSize: '12px'}}>Status</p>
                <select style={{width: '100%', padding: '.25rem .5rem'}} name="" id="">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </label>
            



            <div style={{margin: '.5rem 0 .5rem'}}>
                
                <button style={{padding: '.2rem 1rem', marginRight: '1.5rem'}}>send</button>
                <button style={{padding: '.2rem 1rem', }} onClick={() => setPopup(false)}>cancel</button>
            </div>
        </div>
    </div>
    }

    </React.Fragment>
  )
};

export default Todolist;
