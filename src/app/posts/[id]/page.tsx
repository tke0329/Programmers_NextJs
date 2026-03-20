'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function detailPage() {
    const { id } = useParams()

    return <>게시글 아이디: {id}</>
}
