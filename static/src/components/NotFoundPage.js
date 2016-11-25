import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div>
      <h4>
        页面不存在
      </h4>
      <Link to="/"> 回到首页去 </Link>
    </div>
  );
};

export default NotFoundPage;
