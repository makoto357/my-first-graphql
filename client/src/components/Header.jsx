import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex">
      <div>hello</div>
      <Link to="create">Create new post</Link>;
    </div>
  );
}
