import { Request, Response } from 'express'
import {User} from '../models/user.model'
import { User as IUser } from '../types/user'
import bcrypt from 'bcrypt'

/**
* Get user by ID
* 
* @param {Request} req
* @param {Response} res
* @returns {void} Returns one user.
*/
const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to fetch all products" })
    }
}

/**
 * Get user by ID
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.session && req.session.username) {
            const user = await User.findOne({username: req.session.username}).exec()
        
            res.status(200).json(user)
            return
        }

        res.status(401).json({message: 'User not found!'})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to get User" })
    }
}

/**
 * Add new user
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser = async (req: Request<{}, {}, Omit<IUser, 'id'>>, res: Response): Promise<void> => {
    const { username, password, firstname, lastname } = req.body

    if (!username || !password) {
        res.status(422).json({ message: 'Username/password is empty!' })

        return
    }

    try {
        const user = await User.findOne({username}).exec()

        if (user) {
            res.status(401).json({ message: 'Username is taken!' })
        
            return
        }

    const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({ 
            username, 
            password: hashedPassword, 
            firstname, 
            lastname 
        })
    
        res.status(201).json(newUser)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to add User' })
    }
}

/**
 * Login user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = async (req: Request<{}, {}, Omit<IUser, 'id'>>, res: Response): Promise<void> => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(401).json({message: "Username/password is missing!"})

        return
    }

    const user = await User.findOne({username}).exec()
    if (! user) {
        res.status(401).json({message: "Username/password is missing!"})

        return
    }
    
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401).json({message: "Username/password is missing!"})

        return
    }

    if (req.session) {
        req.session.isLoggedIn = true
        req.session.username = user.username
    }

    res.status(200).json({message: "Successfully logged in!"})
}

const logout = async (req: Request<{}, {}, Omit<IUser, 'id'>>, res: Response) => {
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