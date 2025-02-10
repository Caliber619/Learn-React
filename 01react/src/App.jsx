import Cali from "./cali"

function App() {

  const username = "MERLIN"
  return (
    // <></> is called a fragment because ek hi element return krskte h
    <>
      <h1>React with vite | Kshitij Dev aka {username}</h1>  {/* username -> evaluated expression hi likhte hai baaki ispe saare function condition kahin aur lagao idhar bhai final expression likho {iske andar} */}
      <Cali/>
    </>
  )

}

export default App
