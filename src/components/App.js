import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTab, setSelectedTab] = useState('inbox');

  const addTask = () => {
    const newTaskObject = { task: newTask, date: newDate };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
    setNewDate('');
    setShowAddTask(false);
  };

  const cancelAddTask = () => {
    setNewTask('');
    setNewDate('');
    setShowAddTask(false);
  };

  const todayTasks = tasks.filter(task => task.date === new Date().toLocaleDateString());
  const next7DaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return taskDate >= today && taskDate < nextWeek;
  });

  return (
    <div className="App">
      <div className="sidenav">
        <button className={selectedTab === 'inbox' ? 'active' : ''} onClick={() => setSelectedTab('inbox')}>Inbox</button>
        <button className={selectedTab === 'today' ? 'active' : ''} onClick={() => setSelectedTab('today')}>Today</button>
        <button className={selectedTab === 'next7days' ? 'active' : ''} onClick={() => setSelectedTab('next7days')}>Next 7 Days</button>
      </div>
      <div className="main">
        {selectedTab === 'inbox' &&
          <div id="code">
            <h2>Inbox</h2>
            <button onClick={() => setShowAddTask(true)}>Add Task</button>
            {showAddTask &&
              <div>
                <input type="text" placeholder="Enter task" value={newTask} onChange={e => setNewTask(e.target.value)} />
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                <button onClick={addTask}>Add</button>
                <button onClick={cancelAddTask}>Cancel</button>
              </div>
            }
            {tasks.map((task, index) => (
              <div key={index}>
                <p>{task.task}</p>
                <p>{task.date}</p>
              </div>
            ))}
          </div>
        }
        {selectedTab === 'today' &&
          <div id="today-list">
            <h2>Today</h2>
            <ListRender list={todayTasks} />
          </div>
        }
        {selectedTab === 'next7days' &&
          <div id="next-list">
            <h2>Next 7 Days</h2>
            <ListRender list={next7DaysTasks} />
          </div>
        }
      </div>
    </div>
  );
}

function ListRender(props) {
  return (
    <>
      {props.list.map((task, index) => (
        <div key={index}>
          <p>{task.task}</p>
          <p>{task.date}</p>
        </div>
      ))}
    </>
  );
}

export default App;

