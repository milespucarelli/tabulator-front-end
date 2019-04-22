import React from 'react';

const TabDirections = (props) => (
  <div id='directions'>
    <h1>How Do I Tab?</h1>
    <p className='directions'>Hover your mouse over the Tab Staff and you'll see a small sqaure hovering over each of the lines.</p>
    <p className='directions'>The lines represent the strings of a guitar with the bottom string representing the lowest in pitch.</p>
    <p className='directions'>Click on a line and the box will stay on that sting and that position in the measure.</p>
    <p className='directions'>Enter a number that corresponds to the fret that you want to play on that beat.</p>
    <p className='directions'>UNCLICK the box when you are done</p>
    <p className='directions'>Chords can be created by stacking notes on the same beat.</p>
    <p className='directions'>Have fun!</p>
  </div>
);

export default TabDirections;
