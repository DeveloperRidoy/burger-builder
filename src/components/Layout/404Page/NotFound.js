import React from 'react'
import classes from './NotFound.module.scss';
import { FaRedditAlien } from 'react-icons/fa';

const NotFound = () => (
  <div className={classes.NotFound}>
    <div className="jumbotron text-center rounded">
      <FaRedditAlien size="10rem" />
      <p className="display-4 text-center">Oops! not found...</p>
    </div>
  </div>
);

export default NotFound;