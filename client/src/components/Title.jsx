import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === "left" && " md:items-start md:text-left"}`}>
      <h2 className='font-black text-4xl md:text-6xl text-primary tracking-tight mb-4'>{title}</h2>
      {subTitle && <p className='text-base md:text-xl text-text-muted font-medium max-w-3xl leading-relaxed'>{subTitle}</p>}
      <div className={`h-1 w-20 bg-accent mt-6 rounded-full ${align === "left" ? "mr-auto" : "mx-auto"}`}></div>
    </div>
  )
}

export default Title
