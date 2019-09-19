import React from 'react';

const Player = (props) => {
    let userEmail = React.createRef();

    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(userEmail.current.value);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Player
                <input
                    type="email"
                    value="mail1234@gmail.com"
                    ref={userEmail}
                    placeholder="Type your email" />
            </label>
            <button>Submit</button>
        </form>
    );
}

export default Player;
