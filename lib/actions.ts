"use server"

import { revalidatePath } from 'next/cache'
import { likeProduct as likeProductInDb } from '@/lib/products'

export async function likeProductAction(id: string) {
    const newLikes = await likeProductInDb(id)
    revalidatePath(`/products/${id}`)
    return newLikes
}

