import { useContext } from "react";
import { HisProvider, historyContext } from "../../context/historyContext";
import { FaHome } from "react-icons/fa";

const History = ({data , last_item}) => {
    


    const { listHistory } = useContext(historyContext)

    return (


        <>

           <div>
           <div className="history px-5" style={{ height: '2rem', width: '100%', backgroundColor: '#f9fafb', padding: 'auto 1rem', fontSize: '1.1rem' }}>
                
                <span><span className="mx-2" style={{fontWeight:"bold"}}><FaHome /></span>{data} </span>
                <span style={{fontWeight:"bold"}}>{last_item} </span>
    
        </div>
           </div>


        </>
    );

}


export default History;