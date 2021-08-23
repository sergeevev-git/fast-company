import { loadConfig } from "browserslist";
import React, { useState } from "react";
import api from "../api";

const Users = () => {
     const [users, setUsers] = useState(api.users.fetchAll());

     const handleDelete = (userId) => {
          setUsers(users.filter((item) => item._id != userId));
     };

     const renderPhrase = (number) => {
          const arr = [2, 3, 4];
          const endOfWord = arr.some((item) => item === number)
               ? "человека тусанут"
               : "человек тусанет";
          return `${number} ${endOfWord} с тобой сегодня`;
     };

     const getBadgeClasses = () => {
          let classes = "badge bg-";
          classes += users.length === 0 ? "danger" : "primary";
          return classes;
     };

     const renderQualities = (qualities) => {
          return qualities.map((item) => (
               <span className={"badge bg-" + item.color}>{item.name}</span>
          ));
     };

     const renderTable = () => {
          return users.map((item) => (
               <tr id={item._id}>
                    <td>{item.name}</td>
                    <td>{renderQualities(item.qualities)}</td>
                    <td>{item.profession.name}</td>
                    <td>{item.completedMeetings}</td>
                    <td>{item.rate}/5</td>
                    <td>
                         <button
                              onClick={() => handleDelete(item._id)}
                              className={"btn btn-danger"}
                         >
                              delete
                         </button>
                    </td>
               </tr>
          ));
     };

     console.log(users);
     return (
          <>
               <h2>
                    <span className={getBadgeClasses()}>
                         {renderPhrase(users.length)}
                    </span>
               </h2>

               <table className="table">
                    <thead>
                         <tr>
                              <th scope="col">Имя</th>
                              <th scope="col">Качества</th>
                              <th scope="col">Профессия</th>
                              <th scope="col">Встретился, раз</th>
                              <th scope="col">Оценка</th>
                              <th scope="col"></th>
                         </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
               </table>
          </>
     );
};

export default Users;
