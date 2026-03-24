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
        let { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .order('id', { ascending: true })
        setPosts(post)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <>
            <ul className="flex:column p-4">
                {posts.map((e: Post) => (
                    <Link href={`/posts/${e.id}`} className="p-2">
                        <li key={e.id}>
                            {e.id}. {e.title}
                        </li>
                    </Link>
                ))}
                <Link
                    href="/posts/new"
                    className=" p-2 rounded hover:bg-gray-700"
                >
                    글쓰기
                </Link>
            </ul>
        </>
    )
}
