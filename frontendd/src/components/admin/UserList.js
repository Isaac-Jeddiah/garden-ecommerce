import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../actions/userActions';
import { clearError, clearUserDeleted } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const UserList = () => {
  const { users = [], loading = true, error, isUserDeleted } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast(error, { position: toast.POSITION.BOTTOM_CENTER, type: 'error', onOpen: () => dispatch(clearError()) });
      return;
    }
    if (isUserDeleted) {
      toast('User deleted successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserDeleted()),
      });
    }
    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-green-50 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-green-800">User List</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FiEdit className="inline-block mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline-block mr-1" />
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default UserList;

