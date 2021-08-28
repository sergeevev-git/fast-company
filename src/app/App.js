import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api/index";

const App = () => {
     const [users, setUsers] = useState(api.users.fetchAll());
     const handleDelete = (userId) => {
          setUsers(users.filter((item) => item._id !== userId));
     };
     const handleToggleBookmark = (id) => {
          setUsers(
               users.map((user) => {
                    if (user._id === id) {
                         user.status = !user.status;
                    }
                    return user;
               })
          );
     };

     return (
          <div className={"container-sm"}>
               {<SearchStatus length={users.length} />}
               {
                    <Users
                         onDelete={handleDelete}
                         onToggleBookmark={handleToggleBookmark}
                         users={users}
                    />
               }
          </div>
     );
};

export default App;
