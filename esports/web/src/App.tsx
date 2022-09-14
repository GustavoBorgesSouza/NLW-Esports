//JSX javascript + XML (HTML)
//Componentes / Propriedades(props)

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

export default function App() {
  return (
    <div>
      <h1>Hello OH MY GOD</h1>
      <Button title="Send1" />
      <Button title="Send2" />
      <Button title="Send3" />
    </div>
  )
}
