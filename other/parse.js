captureData = (data) => {
    let dataArr = [];

    data.forEach( val => {
        dataArr.push(val.dataValues)
    })

    // console.table(dataArr)
    console.table(
        dataArr,
        [
            'id', 'username', 'email', 'password'
        ]
    )
    
    return dataArr;
};

captureError = (data) => {
    let errArr = [];

    let { username,email,password } = data;

    // || !password_c
    if (!username || !email || !password) {
        errArr.push({ msg: 'please fill in all fields' })
    }
    // if (password !== password_c) {
    //     errArr.push({ msg: 'passwords do not match '})
    // }
    if (password.length < 5) {
        errArr.push({ msg: 'password must contain 5+ char' })
    }

    return errArr;
};

compareData = (user,data) => {
    let userArr = [];

    user.forEach( val => {
        if (val.dataValues.username === data.username) {
            userArr.push({msg: 'username is already exists'})
        }
        if (val.dataValues.email === data.email) {
            userArr.push({msg: 'email is already registered'})
        }
    })

    return userArr;
};

// module.exports = {
//     captureData,
//     captureError,
//     compareData
// };