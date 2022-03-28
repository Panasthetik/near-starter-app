
import React from 'react'

function ListEvents({ project }) {

  return (
    <div className="project">
      <h2>{project.title}</h2>{' '}
      <span className="creator">{project.creator}</span>
      <h3>description:</h3>
      <p>{project.description}</p>
      <h4>target: {project.estimated_budget} NEAR</h4>
      <h4>Votes: {project.total_votes}</h4>
      <button
        onClick={() => {
          window.contract.add_vote({ id: project.id })
        }}
      >
        Vote
      </button>
    </div>
  )
}

export default ListEvents