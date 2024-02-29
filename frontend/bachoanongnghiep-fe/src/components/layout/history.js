import { useContext } from "react";
import { HisProvider, historyContext } from "../../context/historyContext";




const History = () => {


    const { listHistory } = useContext(historyContext)

    return (


        <>

            <div className="history" style={{ height: '2rem', width: '100%', backgroundColor: '#f9fafb', padding: 'auto 1rem', fontSize: '1.1rem' }}>
                {listHistory && listHistory.map((item) =>
                    <span>{item}   /  </span>
                )}
            </div>


        </>
    );

}


export default History;