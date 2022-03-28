import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react'
import ListExhibitions from './components/ListExhibitions.js'
import CreateExhibition from './components/CreateExhibitions.js'
import AddArtist from './components/AddArtists.js'
import React from 'react'
import { login, logout } from './utils'
import './global.css'

import getConfig from './config'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const [exhibitions, setExhibitions] = useState([])
  const [toggleModal, setToggleModal] = useState(false)


  function addExhibition() {
    setToggleModal(!toggleModal)
  }

  function addArtist() {
    setToggleModal(!toggleModal)
  }

  useEffect(
    () => {

      if (window.walletConnection.isSignedIn()) {

        window.contract.list_exhibitions().then((exhibitionprojects) => {
          const exhibitionList = [...exhibitionprojects]
          setExhibitions(exhibitionList)
        })
      }
    },

    [],
  )

  if (!window.walletConnection.isSignedIn()) {
    return (
      <main className='signin'>
        <h1>Welcome to Awesome Exhibitions</h1>
        <p style={{ textAlign: 'center' }}>
          Click the button below to sign in:
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }

  return (
   
    <>
      <header>
        <div className="logo"></div>
        <button className="link" style={{ float: 'right' }} onClick={logout}>
          Sign out <span className="id">{window.accountId}</span>
        </button>
      </header>
      <button onClick={addExhibition}>Add an exhibition</button>
      <button onClick={addArtist}>Add an artist</button>

      <main>
        <CreateExhibition toggleModal={toggleModal} />
        <AddArtist toggleModal={toggleModal}/>
        <section className='events'>
          {exhibitions.map((exhibition, id) => {
            return (
              <div key={id}>
                <ListExhibitions exhibition={exhibition} />
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}