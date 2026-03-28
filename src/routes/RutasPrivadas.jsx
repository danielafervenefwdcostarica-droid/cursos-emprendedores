import { Navigate } from "react-router-dom"
function RutasPrivadas({children}) {
    const id = localStorage.getItem("id")
    return (
        <>
            {id ? (children) : (<Navigate to="/" />)}
        </>
    )
}
export default RutasPrivadas