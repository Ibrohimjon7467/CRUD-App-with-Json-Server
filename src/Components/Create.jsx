import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./UserReducer";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const handaleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, number);
    if (name.length == 0 || email.length == 0) {
      alert("Empty Values in Inputs");
    } else {
      dispatch(addUser({ id: users[users.length - 1].id + 1, name, email, number }));
      navigate("/");
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto flex w-96 justify-center items-center">
      <div className="w-52 border bg-base-300 text-slate-500 p-5">
        <form onSubmit={handaleSubmit}>
          <div className="form-control w-full max-w-xs">
          <h3 className="text-3xl pb-4 text-white">Add New User</h3>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Enter name"
              className="input input-bordered w-full max-w-xs from-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" placeholder="Enter email"
              className="input input-bordered w-full max-w-xs from-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="number">Number:</label>
            <input type="number" name="number" placeholder="Enter number"
              className="input input-bordered w-full max-w-xs from-control"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create