import express from "express"
const router = express.Router()
import Users from "../collections/users.js"

router.get("/", async (req, res) => {
  try {
    let user = await Users.findOne()
    return res.json({ code: 200, data: { user } })
  } catch (err) {
    return res.status(500).json({ message: "error in get user", error: err })
  }
})

router.post("/createUser", async (req, res) => {
  try {
    const { userId, fullName, password } = req.body

    const newUser = new Users({
      userId,
      fullName,
      password,
    })
    const savedUser = await newUser.save()
    return res.json({ code: 200, data: { savedUser } })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "error in save user", error: err })
  }
})

export default router