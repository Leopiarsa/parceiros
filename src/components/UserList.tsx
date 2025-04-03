// src/components/UserListComponent.js

import React from 'react';

const UserList = () => {
  //   if (!record.params.users || record.params.users.length === 0) {
  //     return <div>No users associated</div>;
  //   }

  // Exibe os usuários com suas informações
  return (
    <div>
      {/* {record.params.users.map((user, index) => ( */}
      <div>
        <strong>user.name</strong> (user.email)
      </div>
      {/* ))} */}
    </div>
  );
};

export default UserList;
