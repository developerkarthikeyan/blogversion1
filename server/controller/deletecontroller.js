const profile = require("../model/Userprofile");
const post = require("../model/Savepost");
const deleteUser = async (req, res) => {
    const _id = req.params.id;
    console.log(req.body);
    console.log(_id);
    try {
        const user = await profile.findById({ _id });
        console.log(user.userpost);
        const userpost = user.userpost;
        const Userprofile = await profile.deleteOne({ _id });

        if(userpost){
            const result = await post.deleteMany({ _id: { $in: userpost } })

        }
        console.log("user deleted successfully")
        res.status(200).json({ message: "deleted succefully" });
    } catch (err) {
        console.log(err);
    }

}
module.exports = { deleteUser }