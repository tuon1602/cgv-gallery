import React from 'react'

const PhotoPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id)
  return (
    <div>PhotoPage</div>
  )
}

export default PhotoPage