'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

interface Post {
    id: number
    title: string
    content: string
}

export default function PostList() {
    const [posts, setPosts] = useState([])

    // const fetchData = async () => {
    //     const { data: posts, error } = await supabase.from('posts').select('*')
    //     setPosts(posts ?? [])
    // }

    const fetchPost = async () => {
        let { data: post, error } = await supabase.from('posts').select('*')
        setPosts(post)
    }

    useEffect(() => {}, [])
    fetchPost()
    return (
        <>
            <ul>
                {posts.map((e: Post) => (
                    <Link href={`/posts/${e.id}`} className="p-2">
                        <li key={e.id}>
                            {e.id}. {e.title}
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    )
}
