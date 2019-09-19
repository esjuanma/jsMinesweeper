import React from 'react';

const Player = (props) => {
    let userEmail = React.createRef();

    const onSubmit = (event) => {
        event.preventDefault();

        const email = userEmail.current.value;

        if (email) {
            props.onSubmit(email);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label>
                Player
                <input
                    type="text"
                    defaultValue="j.doe@gmail.com"
                    ref={userEmail} />
            </label>
            <button>Submit</button>
        </form>
    );
}

export default Player;
