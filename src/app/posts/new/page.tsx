'use client'

import { supabase } from '@/app/lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(title, content)

        const { error } = await supabase
            .from('posts')
            .insert([{ title, content }])

        if (error) {
            console.log(error)
        } else {
            alert('글쓰기 성공!')
            router.push('/posts')
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
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
