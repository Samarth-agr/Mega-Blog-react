import React, { useEffect, useState } from 'react'
import { Container , PostCard } from '../components'
import service from '../appwrite/conf'


function AllPost() {
    const [post,setPost] = useState([])
    useEffect(()=>{

    },[])
    service.getPosts([]).then((post)=> {
       if(post) setPost(post.documents)
    })
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {post.map((post)=>{
            <div className='p-2 w-1' key={post.$id}>
            <PostCard post = {post} />
            </div>
        })}
        </div>
      </Container>
    </div>
  )
}

export default AllPost
