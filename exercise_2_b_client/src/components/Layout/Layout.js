import './layout.css'
const Layout = ({ content, modal }) => {
    return ( 
        <div className="layout">
            {modal}
            <div className="content">
                { content }
            </div>
            
        </div>
     );
}
 
export default Layout;