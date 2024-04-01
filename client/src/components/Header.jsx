import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex">
      <a href="/">hello</a>
      <Link to="create">Create new post</Link>;
    </div>
  );
}
