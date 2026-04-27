import "./TTTBoard.css"
function TTTBoard({ board, myTurn = true, onCellClick }) {
    return (
        <div className="tttBoard">
            {
                board.map((row, rowi) => (
                    <div key={rowi}>
                        {row.map((cell, coli) => (
                            <button
                                key={coli}
                                disabled={!myTurn || cell !== null}
                                onClick={() => onCellClick && onCellClick({ x: rowi, y: coli })}
                            >
                                {cell ?? "-"}
                            </button>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default TTTBoard