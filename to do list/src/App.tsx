import './App.css'
import { useState } from 'react'
import { Header } from './Header'
import { AddTaskDiv } from './AddTaskDiv'
import { Estatisticas } from './Estatisticas'
import { Lista } from  './Lista'

export interface TarefasType {
  id : number
  texto : string
}

export function App() {
  const[totalCriado, setTotalCriado] = useState(0)
  const[totalConcluido, setTotalConcluido] = useState(0)
  const[tarefas, setTarefas] = useState<TarefasType[] | []>([])
  const[tarefaAtual, setTarefaAtual] = useState("")

  function addTask(){
    if (tarefaAtual.trim() === "") return;

    setTotalCriado(value => value + 1)
    setTarefas([...tarefas, {id : tarefas.length + 1, texto : tarefaAtual}])
    setTarefaAtual("");
  }

  return (
    <>
      <Header/>
      <AddTaskDiv addTask={addTask} setTarefaAtual={setTarefaAtual} tarefaAtual={tarefaAtual}/>
      <Estatisticas totalConcluido={totalConcluido} totalCriado={totalCriado}/>
      <Lista tarefas={tarefas}/>
    </>
  )
}
 