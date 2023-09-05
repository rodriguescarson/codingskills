import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'tailwindcss/tailwind.css'

const itemsPerPage = 5; // Number of items to display per page

export default function Home({ users }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(offset, offset + itemsPerPage);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Card List</h1>
      <div className="grid grid-cols-2 gap-6">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="border p-6 rounded-lg shadow-md flex">
            <div className="mr-6">
              <Image
                src={`https://placehold.co/400/5172e4/ffffff?text=${user.name[0]}${user.name[1]}`}
                alt={`${user.name}'s Avatar`}
                className="rounded-full w-16 h-16"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">Phone: {user.phone}</p>
              <p className="text-gray-500">Website: {user.website}</p>
              <p className="text-gray-500">Company: {user.company.name}</p>
              <div className="mt-4 flex items-center justify-between">
  <Link href={`/users/${user.id}`}>
    <button className="py-2 px-4 rounded-full hover:bg-blue-600 border-black border-2 inline-flex items-center">
      Details
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  </Link>
</div>

            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center inline-block" >
  <ReactPaginate
    pageCount={Math.ceil(users.length / itemsPerPage)}
    onPageChange={handlePageChange}
    containerClassName="pagination"
    activeClassName="active"
    pageClassName="px-3 py-2 text-blue-500 cursor-pointer hover:bg-blue-100 rounded-md inline-block"
    previousLabel="Previous"
    nextLabel="Next"
    marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          className='inline-block'
          previousClassName='inline-block'
          nextClassName='inline-block'
          
  />
</div>

    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
      },
    };
  }
}
