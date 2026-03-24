'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function EditPage() {
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const fetchPost = async () => {
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id as string).single
        setTitle(post.title)
        setContent(post.content)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const handleOnUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data, error } = await supabase
            .from('posts')
            .update({ title, content })
            .eq('id', id)
            .select()
        if (error) {
            console.log(error)
        } else if (!data || data.length === 0) {
            alert('권한 없음 맨')
        } else {
            alert('수정완료')
            router.push('/posts')
        }
    }

    return (
        <form onSubmit={handleOnUpdate}>
            <input
                type="text"
                name="title"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                name="content"
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button>등록</button>
        </form>
    )
}
