import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'

/**
* Get user by ID
* 
* @param {Request} req
* @param {Response} res
* @returns {void} Returns one user.
*/
const getUsers = (req: Request, res: Response) => {
    res.status(200).json(userModel.findAll())
}

/**
 * Get user by ID
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserByUsername = (req: Request, res: Response) => {
    if (req.session && req.session.username) {
        const user = userModel.findByUsername(req.session.username)

        res.status(200).json(user)
    }

    res.status(401).json({message: 'User not found!'})
}

/**
 * Add new user
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password, firstname, lastname } = req.body
  if (!username || !password) {
    res.status(422).json({ message: 'Username/password is empty!' })

    return
  }

  const user = await userModel.create({ username, password, firstname, lastname })
  if (!user) {
    res.status(401).json({ message: 'Username is taken!' })

    return
  }

  res.status(201).json(user)
}

/**
 * Login user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(401).json({message: "Username/password is missing!"})

    return
  }
  const user = await userModel.login(username, password)

  if (!user) {
    res.status(401).json({message: "Username/password is missing!"})

    return
  }

  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }

  res.status(200).json({message: "Successfully logged in!"})
}

const logout = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    req.session = null
    res.status(200).json({
        content: "Session cookie cleared!"
    })
}

export default {
    getUsers,
    getUserByUsername,
    addUser,
    loginUser,
    logout
}