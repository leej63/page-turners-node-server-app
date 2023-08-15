import * as profileDao from './profile-dao.js'

const profileController = (app) => {
    const findAllProfiles = async(req,res) => {
        const profiles = await profileDao.findProfile()
        return res.json(profiles)
    }
    const findTheProfile = async(req, res) => {
        const idToFind = req.params.pid
        const profile = await profileDao.findTheProfile(idToFind);
        return res.json(profile)

    }
    const updateProfile = async (req, res) => {
        const profileUpdate = req.body
        console.log(profileUpdate._id)
        const status = await profileDao.updateProfile(profileUpdate._id, profileUpdate);
        res.json(status)
    }
    app.get('/profile', findAllProfiles);
    app.get('/profile/:pid', findTheProfile);
    app.put('/profile',updateProfile);
}
export default profileController;
