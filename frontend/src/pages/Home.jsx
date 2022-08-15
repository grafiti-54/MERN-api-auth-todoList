import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import React from 'react';
import TaskList from '../components/tasks/TaskList';

function Home() {
  return (
   <Layout>
    <Navbar/>
    <TaskList />
   </Layout>
  )
}

export default Home