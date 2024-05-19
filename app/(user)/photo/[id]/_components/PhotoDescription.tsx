import React from 'react'

interface IProps{
    title:string,
    description:string
}

const PhotoDescription:React.FC<IProps> = ({title,description}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

export default PhotoDescription