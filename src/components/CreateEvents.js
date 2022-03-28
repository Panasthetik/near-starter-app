import React, { useState } from 'react'
    function CreateEvent({toggleModal}) {
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [target, setTarget] = useState(0)
      const [showNotification, setShowNotification] = useState(false)
      const handleSubmit = (event) => {
        event.preventDefault()
        window.contract.add_event({title:title, estimated_budget:target * 1, description:description})
        setShowNotification(!showNotification)
        alert(`event info: ${title} ${target} ${description}`)
      }
    console.log(`its ${toggleModal}`);
      return (
        <div>
          {toggleModal == true && (
            <div className='addevent'>
              <form onSubmit={handleSubmit}>
                <label>
                  Enter event title:
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>

                <label>
                  Enter budget:
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                </label>

                <label>
                  Enter event description:
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <input type="submit" className='submit' />
              </form>
            </div>
          )}
          
          {showNotification && <Notification />}
        </div>
        
      )
    }
    function Notification() {
      return (
        <aside>
          <footer>
            <div>✔ Succeeded </div> 
            <div>Added new event just now</div>
          </footer>
        </aside>
      )
    }
    export default CreateEvent