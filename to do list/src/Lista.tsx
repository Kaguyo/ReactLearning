import './Lista.css'
import { TarefasType } from './App'

interface ListaProps {
    tarefas: TarefasType[];
}

export function Lista({ tarefas }: ListaProps) {
    return (
        <div id="emptyListDiv">
            { tarefas.map((tarefa) => (
                <div key={tarefa.id} className="textContainer">
                    {tarefa.texto}
                </div>
                ))
            }
        </div>
    )
}
