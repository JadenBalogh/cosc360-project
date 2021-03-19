import {Component} from 'react';
import {Link} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
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
        console.log(this.state.username);
        console.log(this.state.email);
        console.log(this.state.password);
    }

    render () {
        return (
            <div className="w-full flex flex-wrap mt-7">
                <div className="w-full flex flex-col">
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">Register</h2>
                            <form className="flex flex-col pt-3 md:pt-8" onSubmit={this.submit}>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="username" className="text-lg">Username</label>
                                    <input type="username" id="username" name="username" placeholder="Username" onChange={this.changeHandler}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                                </div>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                                    <input type="email" id="email" name="email" placeholder="your@email.com" onChange={this.changeHandler}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                                </div>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" id="password" name="password" placeholder="Password" onChange={this.changeHandler}
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                                </div>
                                <input type="submit" value="Register" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                            </form>
                            <div className="text-center pt-12 pb-12 justify-center">
                                <div className="m-1">Already have an account?</div>
                                <Link to="/login" className="underline font-semibold">Login here.</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Register;
