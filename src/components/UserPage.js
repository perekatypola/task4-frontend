import React from "react";
import {blockUser , requestForDelete ,getIdFromJwt} from './requests'
class  UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
            checked: []
        };
    }

    componentDidMount() {
        fetch("https://task4-backend.herokuapp.com/loadTable",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt')}
        }).then((response) => response.json()).then((res) => {console.log(res)
            this.setState({table:res})})
        fetch("https://task4-backend.herokuapp.com/updateAuthDate",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json', 'Auth' : localStorage.getItem('jwt') , 'Block': null}
        }).then((response) => response.json()).then((res) => {console.log(res)
            this.setState({table:res})})
    };

    render ()
    {
        const renderTable = () => {
            if (this.state.table === null) {
                return <td></td>;
            } else {
                return <>
                    {
                        this.state.table.map(user =>
                        <React.Fragment>
                            <tr>
                                <td>
                                    <input className="check-box select-all" type="checkbox"
                                           onChange = {() => {changeCheckState(user.id)}}
                                           value="" id={user.id}/>
                                </td>
                                <td>{user.id}</td>
                                <td>{user.user}</td>
                                <td>{user.email}</td>
                                <td>{user.reg_date}</td>
                                <td>{user.auth_date}</td>
                                <td>{user.status}</td>
                            </tr>
                        </React.Fragment>
                    )}
                </>
            }
        }

        const changeCheckState = (id) => {
            console.log(id)
            if(document.getElementById(id).checked === true)
            {
                this.state.checked.push(id)
            }
        };

        const blockUnblock = (block) => {
            this.state.checked.map((id) => {
                blockUser(id , block)
            })
            this.setState({checked:[]})
            window.location.reload()
        }

        const deleteUser = () => {
            let route = false
            getIdFromJwt(localStorage.getItem('jwt'))
            if(this.state.checked.indexOf(localStorage.getItem('curId') >= 0)) {
                route = true
                console.log(this.state.checked)
            }
            this.state.checked.map((id) => {
                requestForDelete(id)
            })
            if(route) {
                route = false
                localStorage.removeItem('jwt')
                window.location = '/'
            }
        }

        const logOut  = () => {
            localStorage.setItem('jwt' , "")
            window.location = '/'
        }

        return (

            <div>
                <div class = "text-right" id = "box">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn btn-info" onClick ={() => {blockUnblock("blocked")}}>Block</button>
                            <button type="button" className="btn btn btn-info" onClick ={() => {blockUnblock("unblocked")}}>Unblock</button>
                            <button type="button" className="btn btn btn-info" onClick ={() =>{deleteUser()}}>Delete</button>
                        </div>
                        <button type="button" className="btn btn-info" onClick={() => {logOut()}}>
                            Log Out
                        </button>
                    </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">
                            <input className="check-box" type="checkbox" id = "selectAllCheckbox"
                                   onChange = {() => {let checkboxes = document.querySelectorAll('input.select-all')
                                       .forEach((checkbox) => {checkbox.checked = document.getElementById("selectAllCheckbox").checked
                                           if(checkbox.checked === true) {
                                               this.state.checked.push(checkbox.id)
                                           }})}}
                                   value=""/>
                        </th>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">DateOfRegistration</th>
                        <th scope="col">DateOfLogin</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTable()}
                    </tbody>
                </table>
            </div>

        );
    }
}


export default UserPage;
