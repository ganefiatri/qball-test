"use client"
import { Post, User } from "@/@types/user";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleUserPage = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([] as any);
    const [posts, setPosts] = useState([] as any);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsersPosts(){
            try {
                const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if(!usersResponse.ok && !postsResponse.ok) throw new Error("Failed to fetch Users");
                const usersData = await usersResponse.json();
                const postsData = await postsResponse.json();
                setUsers(usersData);
                setPosts(postsData);
            } catch(err){
                if(err instanceof Error){
                    setError(err.message);
                }else{
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsersPosts()
    },[]);
    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error}</div>;
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4" key={users?.id}>
                <div className="w-full flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold">{users?.name}</h1>
                <p className="text-sm text-gray-500">
                    {posts?.body}
                </p>
                <br></br>
                <p className="text-sm text-gray-500">
                    {posts?.title}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/blood.png" alt="" width={14} height={14} />
                    <span>{users?.email}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>{users?.website}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>{users?.email}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>{users?.phone}</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;