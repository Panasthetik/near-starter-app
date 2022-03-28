import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react'
import ListEvents from './components/ListEvents.js'
import CreateEvent from './components/CreateEvents.js'
import React from 'react'
import { login, logout } from './utils'
import './global.css'

import getConfig from './config'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  // use React Hooks to store greeting in component state
  const [events, setEvents] = useState([])
  const [toggleModal, setToggleModal] = useState(false)


  function addProject() {
    setToggleModal(!toggleModal)
  }

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract.list_events().then((eventprojects) => {
          const eventList = [...eventprojects]
          setEvents(eventList)
        })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    // [crowdfunds],
    [],
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main className='signin'>
        <h1>Welcome to Awesome Events</h1>
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
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <header>
        <div ></div>
        <button className="link" style={{ float: 'right' }} onClick={logout}>
          Sign out <span className="id">{window.accountId}</span>
        </button>
      </header>
      <button onClick={addProject}>Add an event</button>
      <main>
        <CreateEvent toggleModal={toggleModal} />
        <section className='events'>
          {events.map((project, id) => {
            return (
              <div key={id}>
                <ListEvents project={project} />
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}