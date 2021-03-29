import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
    }) => {
    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Username</label>
            <input 
                type="text" 
                name="username"
                value={username}
                onChange={handleUsernameChange}
                //onChange={({target}) => setUsername(target.value)} 
                className="form-control"/>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input 
                type="password" 
                name="password" 
                value={password}
                onChange={handlePasswordChange}
                //onChange={({target})=>setPassword(target.value)} 
                className="form-control"/>
            </div>
            <button type="submit" className="btn btn-success">Login</button>
            </form>
    </div>
    )
}

export default LoginForm