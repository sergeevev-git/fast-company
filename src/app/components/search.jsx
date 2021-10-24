import React from "react";
import TextField from "../components/textField";

const Search = () => {
    const handleChange = ({ target }) => {
        console.log(target.value);
        //    setData((prevState) => ({
        //        ...prevState,
        //        [target.name]: target.value
        //    }));
    };

    return (
        <form>
            <TextField
                name="search"
                type="search"
                placeholder="Search..."
                //  value={data.email}
                onChange={handleChange}
            />
        </form>
    );
};

export default Search;
