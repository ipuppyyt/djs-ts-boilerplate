import { Helmet } from 'react-helmet'
import React from 'react'

const Metadata: React.FC = () => {
  return (
    <Helmet>
        <title>DJS TS Boilerplate</title>
        <meta name="description" content="A TypeScript boilerplate for Discord.js bots" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Helmet>
  )
}

export default Metadata