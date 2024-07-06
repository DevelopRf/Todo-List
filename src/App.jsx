import Create from "./components/CreateTodos/Create"
import Heading from "./components/Heading"
import List from "./components/List"
import "./styles/global.scss"

function App() {

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Heading />
          <Create />
          <List />
        </div>
      </div>
    </>
  )
}

export default App
