import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <div className='mb-10 lg:mb-14'>
      <h1 className='text-3xl md:text-5xl font-black text-primary tracking-tight mb-3'>{title}</h1>
      <p className='text-sm md:text-lg text-text-muted font-medium max-w-3xl leading-relaxed'>{subTitle}</p>
    </div>
  )
}

export default Title
