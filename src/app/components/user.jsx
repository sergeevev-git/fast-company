import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
     _id,
     name,
     qualities,
     profession,
     completedMeetings,
     rate,
     bookmark,
     onDelete,
     onToggleBookmark,
}) => {
     return (
          <>
               <tr key={_id}>
                    <td>{name}</td>
                    <td>
                         {qualities.map((qualitie) => (
                              <Qualitie key={qualitie._id} {...qualitie} />
                         ))}
                    </td>
                    <td>{profession.name}</td>
                    <td>{completedMeetings}</td>
                    <td>{rate}/5</td>
                    <td>
                         <button onClick={() => onToggleBookmark(_id)}>
                              {<Bookmark status={bookmark} />}
                         </button>
                    </td>
                    <td>
                         <button
                              onClick={() => onDelete(_id)}
                              className={"btn btn-danger"}
                         >
                              delete
                         </button>
                    </td>
               </tr>
          </>
     );
};

User.propTypes = {
     _id: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     qualities: PropTypes.array.isRequired,
     profession: PropTypes.object.isRequired,
     completedMeetings: PropTypes.number.isRequired,
     rate: PropTypes.number.isRequired,
     onDelete: PropTypes.func.isRequired,
     onToggleBookmark: PropTypes.func.isRequired,
};

export default User;
