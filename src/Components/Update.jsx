import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";

function Update() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((f) => f.id == id);
  const { name, email, number } = existingUser[0];
  const [uname, setName] = useState(name);
  const [uemail, setEmail] = useState(email);
  const [unumber, setNumber] = useState(number);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        name: uname,
        email: uemail,
        number: unumber,
      })
    );
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="modal-box mx-auto mt-12">
        <form onSubmit={handleUpdate}>
          <div className="form-control w-full mb-4">
          <h3 className="text-3xl pb-4 text-white">Update User</h3>
            <label htmlFor="name" className="text-white mb-2">Name:</label>
            <input type="text" name="name" placeholder="Enter name"
              className="input input-bordered w-full from-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control w-full mb-4">
            <label htmlFor="email" className="text-white mb-2">Email:</label>
            <input type="email" name="email" placeholder="Enter email"
              className="input input-bordered w-full from-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control w-full mb-4">
            <label htmlFor="number" className="text-white mb-2">Number:</label>
            <input
              type="number" name="number" placeholder="Enter number"
              className="input input-bordered w-full from-control"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <br />
          <button className="btn btn-info w-full" onClick={() => modalRef.current.updateUser()}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
