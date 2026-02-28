import Notes from './Notes';



const Home = (props) => {
  
  return (
    <div className="my-3">
      <div style={{ marginBottom: '0.5rem' }}>
        <h2 className="section-heading text-gradient-gold">Your Notes</h2>
        <hr className="section-divider" />
      </div>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home
