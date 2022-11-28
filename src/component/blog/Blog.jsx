import React from 'react';

const Blog = () => {
    return (
        <div className='container mx-auto mt-10'>
            <div className="collapse rounded-xl">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
         <h4 className='text-lg font-bold text-black'>  <span className='text-lg text-red-500 font-bold'>1:- </span> What are the different ways to manage a state in a React application?</h4>
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                <p>React state management is a process for managing the data that React components need in order to render themselves. This data is typically stored in the component's state object. When the state object changes, the component will re-render itself. React state management is basically half of a React app</p>
            </div>
            </div>
            <div className="collapse rounded-xl mt-1">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
         <h4 className='text-lg font-bold text-black'>  <span className='text-lg text-red-500 font-bold'>2:- </span>How does prototypical inheritance work?</h4>
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
            </div>
            </div>
            <div className="collapse rounded-xl mt-1">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
         <h4 className='text-lg font-bold text-black'>  <span className='text-lg text-red-500 font-bold'>3:- </span>What is a unit test? Why should we write unit tests?</h4>
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages</p>
            </div>
            </div>
            <div className="collapse rounded-xl mt-1">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
         <h4 className='text-lg font-bold text-black'>  <span className='text-lg text-red-500 font-bold'>3:- </span> React vs. Angular vs. Vue?</h4>
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
            </div>
            </div>
        </div>
    );
};

export default Blog;