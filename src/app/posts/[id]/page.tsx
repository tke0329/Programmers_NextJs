'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Post {
    id: number
    title: string
    content: string
    user_id?: string // Added user_id to correctly check ownership
}

interface Comment {
    id: number
    content: string
}

export default function detailPage() {
    const { id } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [content, setContent] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

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
    }, [])

    const fetchComment = async () => {
        const { data: comment, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
        setComments(comment ?? [])
    }

    const handleOnDelete = async (id: number) => {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
            .select()
        if (error) {
            console.log(error)
        } else if (!data || data.length === 0) {
            alert('권한 없음맨')
        } else {
            alert('글 삭제 완료')
            router.push('/posts')
        }
    }

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { data, error } = await supabase
            .from('comments')
            .insert({ post_id: id as string, content })
            .select()
        if (error) {
            console.log(error)
        } else if (!data || data.length === 0) {
            alert('권한이 없습니다.')
        } else {
            alert('댓글등록 완료')
            fetchComment()
        }
    }

    const handelOnCommentDelete = async (id: number) => {
        const { data, error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id)
            .select()
        if (error) {
            console.log(error)
        } else if (!data || data.length === 0) {
            alert('권한 없음ㅋ')
        } else {
            alert('댓삭성')
            fetchComment()
        }
    }

    const fetchUser = async () => {
        const { data, error } = await supabase.auth.getSession()
        setUser(data.session?.user ?? null)
    }

    useEffect(() => {
        fetchComment()
        fetchUser()
    }, [])

    if (!post) return <div>로딩중..</div>

    return (
        <>
            <div> 게시글 아이디: {post.id}</div>
            <div> 게시글 제목: {post.title}</div>
            <div> 게시글 내용: {post.content}</div>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button>댓글 작성</button>
            </form>
            <ul>
                {comments?.map((e: Comment) => (
                    <li key={e.id}>
                        - {e.content}{' '}
                        <button
                            className="border p-1"
                            onClick={() => handelOnCommentDelete(e.id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            {user?.id === post.user_id && (
                <>
                    <button
                        className="p-2 rounded hover:bg-gray-700"
                        onClick={() => handleOnDelete(post.id)}
                    >
                        삭제
                    </button>
                    <Link href={`/posts/${id}/edit`}>수정</Link>
                </>
            )}
        </>
    )
}
