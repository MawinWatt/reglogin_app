const valid = (username, fname, lname, email, password, cf_password) => {
    /*if(!username || !fname || !lname || !email || !password)
    return 'Please add all fields.'*/
    
    if(!validateEmail(email))
    return 'Invalid emails.'

    if(!checkUsername(username))
    return 'Username must contain A-z, a-z, 0-7 or _'

    if(username.length > 12)
    return 'User must not more than 12 characters.'

    if(!checkPassword(password))
    return 'Password must not contain sequential letters or numbers'


    if(password.length < 6)
    return 'Password must be at least 6 characters.'

    if(password !== cf_password)
    return 'Confirm password did not match.'
    
}

function checkPassword(password)
{
    var re = /^(?=.*[0-9])(?!.*?\d{10})(?=.*[a-zA-Z])(?!.*?[a-zA-Z]{10})/;
    return re.test(password);
}

function checkUsername(username)
{
    var re = /^[A-Za-z0-9_.]+$/;
    return re.test(username);
}

function validateEmail(email) 
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

export default valid