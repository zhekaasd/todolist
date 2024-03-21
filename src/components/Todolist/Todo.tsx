import React from 'react'

export default function Todo() {
  return (
    <div className='todolist'>
        <div style={{marginBottom: '24px', textAlign: 'center'}}>
            <h2>
                {/* {title} */}
            </h2>
            <span style={{display: 'block', marginTop: '8px', padding: '0', lineHeight: '1', fontStyle: 'italic', fontSize: '12px', color: 'black', opacity: .35}}>
                {new Date().toDateString()}
            </span>
        </div>
        <div>
            {/* <input value={inputValue} onChange={onChangeHandler} type="text" onKeyDown={onKeyPressHandler} /> */}
            {/* <button onClick={onClickHandler}>add</button>  */}
            {/* <CustomDefaultButton onClick={onClickHandler}>add</CustomDefaultButton> */}
        </div>
        {/* <ul> */}
            {/* {tasks.map((task) => { */}

                    {/* const removeTaskHandler = () => {removeTask(task.id);} */}
                    
                {/* return <li key={task.id}> */}
                    {/* <input type="checkbox" checked={task.isDone} /> */}
                    {/* <span style={{display: 'inline-block', margin: '0 10px'}}>{task.title}</span> */}
                    {/* <CustomDefaultButton onClick={removeTaskHandler} styleType='smallSize'>x</CustomDefaultButton> */}
                    {/* <button onClick={removeTaskHandler}>x</button> */}
                {/* </li>})} */}
        {/* </ul> */}
        {/* <div style={{marginBottom: '1rem'}}> */}

            {/* <CustomDefaultButton onClick={() => filteredTaskHandler('all')} >all</CustomDefaultButton>
             <CustomDefaultButton onClick={() => filteredTaskHandler('active')} >active</CustomDefaultButton>

             <CustomDefaultButton onClick={() => filteredTaskHandler('completed')}>completed</CustomDefaultButton> */}
        {/* </div> */}
        {/* <div style={{position: 'absolute', cursor: 'pointer', bottom: '-1rem', left: '50%', transform: 'translate(-50%, 0)'}}>
            <div style={{width: '20px', height: '30px', background: 'black', color: "white", textAlign: 'center', fontWeight: 600}}>x</div>
        </div> */}
    </div>
  )
}
