import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';



function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])

  // function to fetch tasks from server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json();
    return data
  }

  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const task = await response.json();
    return task


  }

  async function addTask(task) {
    /* const id=Math.floor(Math.random()*10000 +1);
     const newTask={id,...task};
     setTasks([...tasks,newTask])*/

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data]);

  }


  async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => (task.id !== id)));

  }
  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
  }
  return (
    <Router>
      <div className="container">

        <Header onAdd={() => (setShowAdd(!showAdd))} showAdd={showAdd} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAdd && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />

          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
