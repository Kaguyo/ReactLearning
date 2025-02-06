import './Estatisticas.css'

interface ListaProps {
    totalConcluido : number
    totalCriado : number
} 

export function Estatisticas({totalCriado, totalConcluido}: ListaProps){
    return (
        <div id="statisticsDiv">
            <div id="pai">
                <div className='filho'>
                    <p className="tasksP">Tarefas criadas</p>
                    <div className="counterDiv">{totalCriado}</div>
                </div>
                <div className='filho'>
                    <p className="tasksP" id="tasksConcluidas">Concluídas</p>
                    <div className="counterDiv">{totalConcluido}</div>
                </div>
            </div>
        </div>
    )   
}