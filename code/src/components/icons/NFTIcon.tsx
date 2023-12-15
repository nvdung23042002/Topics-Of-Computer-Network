import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='none' viewBox='0 0 80 80'>
      <path
        fill='currentColor'
        d='M38.028 8.118a4 4 0 013.944 0l12.383 7.018 12.27 7.215a4 4 0 011.972 3.416L68.71 40l-.113 14.233a4 4 0 01-1.972 3.416l-12.27 7.215-12.383 7.018a4 4 0 01-3.944 0l-12.383-7.018-12.27-7.215a4 4 0 01-1.972-3.416L11.29 40l.113-14.233a4 4 0 011.973-3.416l12.269-7.215 12.383-7.018z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='3'
        d='M37.781 2.982a4.5 4.5 0 014.438 0l14.43 8.18 14.3 8.407a4.5 4.5 0 012.22 3.844L73.3 40l-.132 16.587a4.5 4.5 0 01-2.219 3.844L56.65 68.839l-14.431 8.18a4.5 4.5 0 01-4.438 0l-14.431-8.18-14.3-8.408a4.5 4.5 0 01-2.218-3.844L6.7 40l.132-16.587a4.5 4.5 0 012.219-3.844l14.299-8.408 14.431-8.18z'
      ></path>
      <path
        fill='#fff'
        d='M54.063 36.344v-.188-.187l-3-7.313c-.188-.375-.47-.562-.844-.562H29.875c-.375 0-.75.187-.844.562l-3 7.313v.187c-.093.094-.093.094-.093.188 0 1.593 1.125 3 2.625 3.375v11.25c0 .562.375.937.937.937h21c.563 0 .938-.375.938-.937v-11.25c1.5-.375 2.624-1.782 2.624-3.375zm-8.72-6.469l1.594 6.469c0 .937-.75 1.593-1.687 1.593a1.68 1.68 0 01-1.688-1.687l-.468-6.375h2.25zm-11.437 3c.282-.844.469-1.688.75-3h2.25L36.72 32.5a75.965 75.965 0 00-.282 3.656 1.68 1.68 0 01-1.687 1.688c-.938 0-1.594-.75-1.688-1.594l.844-3.375zm4.688-.094c.093-.75.187-1.593.281-2.812h2.344l.562 6.468a1.68 1.68 0 01-1.687 1.688 1.68 1.68 0 01-1.688-1.688l.188-3.656zm-10.782 3.657l2.625-6.563h2.25l-.562 2.531c-.281.938-.563 1.969-.938 3.75v.188A1.68 1.68 0 0129.5 38.03c-.844 0-1.594-.656-1.688-1.593zm6.844 13.687v-6.563h3.375v6.563h-3.375zm5.25 0v-7.5c0-.563-.375-.938-.937-.938h-5.25c-.563 0-.938.376-.938.938v7.5h-2.343V39.812c.656-.187 1.218-.562 1.687-1.03.656.75 1.594 1.218 2.625 1.218s1.969-.469 2.625-1.219C38.031 39.531 38.969 40 40 40s1.969-.469 2.625-1.219c.656.75 1.594 1.219 2.625 1.219s1.969-.469 2.625-1.219c.469.469 1.031.844 1.688 1.032v10.312h-9.657zM50.5 38.031a1.68 1.68 0 01-1.688-1.687v-.188l-1.5-6.187h2.25l2.626 6.562c-.094.844-.844 1.5-1.688 1.5z'
      ></path>
      <path
        fill='#fff'
        d='M46.281 41.688h-3.093c-.563 0-.938.374-.938.937v4.219c0 .562.375.937.938.937h3.093c.563 0 .938-.375.938-.937v-4.219a.94.94 0 00-.938-.938zm-.937 4.124h-1.219V43.47h1.219v2.343z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}