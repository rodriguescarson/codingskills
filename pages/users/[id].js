import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

export default function UserDetail({ user }) {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    // Implement the update logic here, e.g., send a PUT request to update the user details.
    alert(`Update user with ID ${id} - Name: ${name}, Email: ${email}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="border p-4 rounded shadow">
        <Image
          src={`https://placehold.co/400/5172e4/ffffff?text=${user.name[0]}${user.name[1]}`}
          alt={`${user.name}'s Avatar`}
          className="rounded-full w-16 h-16 mb-2 mx-auto"
          width={100}
          height={100}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username:</label>
          <p className="text-gray-500">@{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <p className="text-gray-500">{user.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website:</label>
          <p className="text-gray-500">{user.website}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Company:</label>
          <p className="text-gray-500">{user.company.name}</p>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
