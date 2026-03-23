'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Nav() {
    const [user, setUser] = useState<User | null>()
    const router = useRouter()

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
        })

        return () => data.subscription.unsubscribe()
    }, [])

    const handleOnLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        } else {
            alert('로그아웃 완료')
            router.push('/login')
        }
    }

    return (
        <nav className="flex">
            <Link href="/" className="p-2 rounded hover:bg-gray-700">
                메인!!
            </Link>
            <Link href="/posts" className="p-2 rounded hover:bg-gray-700">
                게시글!!!!
            </Link>

            {user ? (
                <>
                    <span>{user.email}님 환영합니다.</span>
                    <button onClick={handleOnLogout}>로그아웃</button>
                </>
            ) : (
                <>
                    <Link
                        href="/signup"
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        회원가입
                    </Link>
                    <Link
                        href="/login"
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        로그인
                    </Link>
                </>
            )}
        </nav>
    )
}
