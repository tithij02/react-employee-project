import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [Employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/getAll')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log('Something Went Wrong', error);
      });
  }, []);

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete(`http://localhost:8080/delete?id=${id}`)
        .then((response) => {
          if (response.data === true) {
            alert('Employee Deleted Successfully!');
            const updatedEmployees = Employees.filter((emp) => emp.id !== id);
            setEmployees(updatedEmployees);
          } else {
            alert('Failed to delete employee. Please try again.');
          }
        })
        .catch((error) => alert(error.message || 'Something Went Wrong'));
    }
  };

  const showEmployees = (id) => {
    navigate(`/employee-profile/${id}`);
  };





  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Employee Dashboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Password</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Employees.length > 0 ? (
                Employees.map((emp, index) => (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="border-b py-3 px-4">{index + 1}</td>
                    <td className="border-b py-3 px-4">{emp.id}</td>
                    <td className="border-b py-3 px-4 font-medium text-gray-800">
                      {emp.name}
                    </td>
                    <td className="border-b py-3 px-4">{emp.email}</td>
                    <td className="border-b py-3 px-4">{emp.password}</td>
                    <td className="border-b py-3 px-4 text-center">
                      <button
                        onClick={() => showEmployees(emp.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mr-2 transition duration-200"
                      >
                        Show
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
