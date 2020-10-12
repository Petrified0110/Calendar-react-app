import React, {Component} from 'react';
import displayTitle from '../header/title';
import displayUser from '../header/activeUser';
import './header.css'

export default class DisplayHeader extends Component{
    render() {
        return(
        <div>
            {displayTitle()}
            {displayUser()}
        </div>
        )
    }

    // return (
    //     <div>
    //         <div>
    //             {displayTitle()}
    //         </div>
    //         <div>
    //             {displayUser()}
    //         </div>
    //     </div>
    // )

}

// let Header = () => {
//     <Header>
//         {displayHeader()}
//     </Header>
// }