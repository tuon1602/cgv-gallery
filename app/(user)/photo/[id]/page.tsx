import { IGetAllImages } from '@/types'
import React from 'react'
import { getAllImageDirectFormDB, getAllImageHomeData } from '@/actions/imageActions'

export async function generateStaticParams() {
  const data:any = await getAllImageDirectFormDB()
 
  return data.map((image:any) => ({
    id: image.id.toString(),
  }))
}

const PhotoPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>PhotoPage {params.id}</div>
  )
}

export default PhotoPage