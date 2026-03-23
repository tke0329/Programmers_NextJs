'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'

interface Post {
    id: number
    title: string
    content: string
}

interface Comment {
    id: number
    content: string
}

export default function detailPage() {
    const { id } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])

    const fetchPost = async () => {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()
        setPost(posts)
    }

    useEffect(() => {
        fetchPost()
    })

    const fetchComment = async () => {
        const { data: comment, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
        setComments(comment ?? [])
    }

    useEffect(() => {
        fetchComment()
    })

    if (!post) return <div>로딩중..</div>

    return (
        <>
            <div> 게시글 아이디: {post.id}</div>
            <div> 게시글 제목: {post.title}</div>
            <div> 게시글 내용: {post.content}</div>
            <ul>
                {comments?.map((e: Comment) => (
                    <li key={e.id}>{e.content}</li>
                ))}
            </ul>
        </>
    )
}
