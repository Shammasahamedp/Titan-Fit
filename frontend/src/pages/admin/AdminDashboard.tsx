import React from "react";
import Navbar from "@/components/userComponents/Navbar";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/reduxStore/slices/admin-slice";
const AdminDashboard: React.FC = () => {
 const dispatch = useDispatch()
 dispatch(adminLogout())
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Navbar/>
      <div className="w-64 bg-black border-r border-yellow-500 p-4">
        {/* <h1 className="text-3xl font-bold text-yellow-500 mb-6">Titan Fit</h1>
         */}

        <nav className="space-y-4">
          {[
            "Overview",
            "User management",
            "Trainer management",
            "Subscription management",
            "Booking management",
            "Meal plan management",
            "Challenges and competitions",
            "Ratings and review management",
          ].map((item, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 hover:bg-yellow-500 hover:text-black transition rounded"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Payments and Wallet</h2>

        {/* Dropdown and Button */}
        <div className="flex justify-between items-center mb-6">
          <select className="bg-gray-800 text-white p-2 rounded border border-gray-600">
            <option>User</option>
            <option>Trainer</option>
          </select>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
            View Reviews
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-900 p-4 rounded-lg">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-yellow-500 text-black">
                {["Name", "Email", "Subscription", "Fitness Goal", "Amount Paid", "Date"].map(
                  (header, index) => (
                    <th key={index} className="p-2 border border-gray-700">
                      {header.toLowerCase()}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {/* Empty state (Replace with data dynamically) */}
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
