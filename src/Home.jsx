import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "./Components/UserReducer";
import { useState, useEffect, useRef } from "react";
import { addUser } from "./Components/UserReducer";

function Home() {
  const users = useSelector((state) => state.users);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showModal === "modal") {
      modalRef.current.showModal();
    }
  }, [location.state]);

  useEffect(() => {
    if (users.length > 0) {
      setName("");
      setEmail("");
      setNumber("");
    }
  }, [users]);

  const handaleSubmit = (event) => {
    event.preventDefault();
    if (name.length == 0 || email.length == 0 || number.length == 0) {
      alert("Empty Values");
    } else {
      dispatch(
        addUser({
          id: users[users.length - 1].id + 1,
          name,
          email,
          number,
        })
      );
      modalRef.current.close();
      navigate("/");
    }
  };
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(
      deleteUser({
        id: id,
      })
    );
  };
  return (
    <div className="container mx-auto flex flex-col mt-28 items-center justify-center">
      <div className="flex items-center mb-12">
        <h2 className="text-4xl pt-6 mr-5">CRUD App with Json Server</h2>
        <button className="btn btn-primary mb-[-40px]" onClick={() => modalRef.current.showModal()}>
          Create
        </button>
        <dialog id="modal" className="modal" ref={modalRef}>
          <div className="modal-box w-4/12">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                x
              </button>
            </form>
            <form onSubmit={handaleSubmit}>
              <div className="form-control w-full mb-4">
                <h3 className="text-3xl pb-4 text-white">Add New User</h3>
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
              <div className="form-control w-full">
                <label htmlFor="number" className="text-white mb-2">Number:</label>
                <input type="number" name="number" placeholder="Enter number"
                  className="input input-bordered w-full from-control"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <br />
              <button className="btn btn-success w-full">Create</button>
            </form>
          </div>
        </dialog>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                        <div className="font-bold">{user.name}</div>
                    </div>
                  </td>
                  <td className="text-base-content">{user.email}</td>
                  <td className="text-base-content">{user.number} </td>
                  <td className="gap-9 flex items-center">
                  <Link to={`/edit/${user.id}`} className="btn btn-info btn-sm">
                    Edit
                  </Link>
                  <Link onClick={() => handleDelete(user.id)} className="btn btn-warning btn-sm ms-2">
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home