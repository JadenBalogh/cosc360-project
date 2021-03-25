import {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
        };
        this.registerUrl = `${process.env.REACT_APP_HOST || ''}/accounts/signup`;
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    submit = (event) => {
        event.preventDefault();
        axios.post(this.registerUrl, {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="flex flex-wrap justify-center mt-12 -mx-3 overflow-hidden">
                <div className="my-3 px-3 w-1/3 overflow-hidden"/>
                <div className="my-3 px-3 w-1/3 overflow-hidden">
                    <img className="h-16 object-contain" src={"logo.svg"} alt="Logo"/>
                    <div className="bg-white p-6 rounded-lg shadow-lg my-auto mt-6">
                        <h2 className="text-2xl font-medium text-black text-center">Register</h2>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={this.submit}>
                            <div className="flex flex-col pt-4">
                                <input type="email" id="email" name="email" placeholder="Email"
                                       onChange={this.changeHandler}
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="flex flex-col pt-4">
                                <input type="username" id="username" name="username" placeholder="Username"
                                       onChange={this.changeHandler}
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="flex flex-col pt-4">
                                <input type="password" id="password" name="password" placeholder="Password"
                                       onChange={this.changeHandler}
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="flex flex-col pt-4">
                                <input type="password" id="password2" name="password2" placeholder="Repeat Password"
                                       onChange={this.changeHandler}
                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="flex flex-wrap overflow-hidden sm:-mx-16">
                                <div className="w-1/2 overflow-hidden mt-8 sm:px-16 text-sm"/>
                                <div className="w-1/2 overflow-hidden mt-8 sm:px-16 text-sm">
                                    <Link to="/login" className="underline font-semibold float-right">Already have an account?</Link>
                                </div>
                            </div>
                            <input type="submit" value="Register"
                                   className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-6"/>
                        </form>
                    </div>
                </div>
                <div className="my-3 px-3 w-1/3 overflow-hidden"/>
            </div>
        );
    }
}

export default Register;
