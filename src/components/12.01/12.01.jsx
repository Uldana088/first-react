// import { useState } from 'react';
//  function Task1() {

//   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 4, 5, 3]

//   const [filters, setfilters] = useState([])

// function filterNumbers() {
//    setfilters (numbers.filter((num) => num % 2 === 0))
// }

// return (
//   <div>
//     <button onClick={filterNumbers}> jup </button>
    
//     <h1>jup sandar</h1>
//     <ul>
//       {filters.map((num) => (
//         <li key={num}> {num} </li>
//       ))}
//     </ul>
//   </div>
// )
// }
// export default Task1;



// import { useState } from 'react';

// function App() {

  
//   const [tasks, setTasks] = useState(['уйды жинау', 'read book', 'жаттыгу жасау', 'Homework', 'go to school']);

//   const handleRemove = (index) => {
//     setTasks(tasks.filter((_, i) => i!== index));
//   };

//   return (
//     <div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}> {task}
//            <button onClick={()=>handleRemove(index)}>remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App; 




import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { text: 'үйды жинау', completed: false },
    { text: 'read book', completed: false },
    { text: 'жаттыгу жасау', completed: false },
    { text: 'Homework', completed: false },
    { text: 'go to school', completed: false }
  ]);
  
  const [filter, setFilter] = useState('all');

  const handleRemove = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>Барлығы</button>
        <button onClick={() => setFilter('completed')}>аякталмагандар</button>
        <button onClick={() => setFilter('incomplete')}>Аяқталмағандар</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {task.text} - {task.completed ? 'ayaktaldy' : 'ayaktalmady'}
            <button onClick={() => handleToggleComplete(index)}>
              {task.completed ? 'кайтару' : 'finish'}
            </button>
            <button onClick={() => handleRemove(index)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;