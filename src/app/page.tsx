"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

const Page = () => {
  const blogRef = React.useRef<HTMLParagraphElement>(null)
  const projectsRef = React.useRef<HTMLParagraphElement>(null)
  const chars = "010011000111"

  const { contextSafe } = useGSAP();

  const createScrambleEffect = (element: HTMLElement, originalText: string) => {
    let result = originalText
    let iteration = 0
    const maxIterations = 12

    const interval = setInterval(() => {
      result = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          const randomChar1 = chars[Math.floor(Math.random() * chars.length)]
          const randomChar2 = chars[Math.floor(Math.random() * chars.length)]
          return Math.random() > 0.5 ? randomChar1 : randomChar2
        })
        .join("")

      element.innerText = result

      if (iteration >= maxIterations) {
        clearInterval(interval)
        element.innerText = originalText
      }

      iteration += 1 / 3
    }, 20)
  }

  const BlogMouseEnterHandler = contextSafe(() => {
    if (blogRef.current) {
      createScrambleEffect(blogRef.current, "Blog")
    }
  })

  const ProjectsMouseEnterHandler = contextSafe(() => {
    if (projectsRef.current) {
      createScrambleEffect(projectsRef.current, "Projects")
    }
  })

  return (
    <div className='h-screen w-full bg-neutral-900 text-[#EEE5E9]'>
      <div className="h-[5vw] w-full md:p-10 flex p-6 pt-11 items-center justify-between">
        <div className="overflow-hidden p-0 h-fit w-fit">
          <h1 className="text-xl md:text-3xl font-t tracking-wider cursor-pointer">
            skandamayya4@gmail.com
          </h1>
        </div>

        <div className="flex gap-4 font-t tracking-widest md:text-xl items-center">
          <p
            ref={blogRef}
            onMouseEnter={BlogMouseEnterHandler}
            className='cursor-pointer'
          >
            Blog
          </p>
          <p
            ref={projectsRef}
            onMouseEnter={ProjectsMouseEnterHandler}
            className='cursor-pointer'
          >
            Projects
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page