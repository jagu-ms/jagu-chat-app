exports.profile = (req, res, next) => {
    const user = req.user;
    user.name = req.user.name;
    user.about = req.user.about;
    user.avatar = req.file ? req.file.filename : user.avatar;
    
    user.save()

    .then(updated => {
        sendUpdatedUser(updated);
        res.json();
    })
    .catch(next);
}

const sendUpdatedUser = (user) => {
    io.emit('update_user', user.getData());
}