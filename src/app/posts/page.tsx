'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Form {
    id: number
    title: string
    body: string
    tag: []
    reactions: {}
    views: number
    userId: number
}

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data.posts))
    }, [])

    return (
        <>
            <ul>
                {posts.map((e: Form) => (
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
