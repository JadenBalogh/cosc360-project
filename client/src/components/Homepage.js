import {Component} from 'react';

class Homepage extends Component {
    render() {
        return (
            <div className="w-full flex flex-wrap mt-7">
                <div className="w-full flex flex-col">
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <div className="bg-white p-6 rounded-lg shadow-lg">HomePage</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage
