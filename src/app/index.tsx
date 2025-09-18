import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import { ToDo } from '../components/todo/Todo';
//import ToDo from '../components/todo/Todo';
//import ToDoItem from '../components/todo/Todo';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/todo" element={<ToDo/>} /> */}
    </Routes>
  </Router>
);

export default App;
