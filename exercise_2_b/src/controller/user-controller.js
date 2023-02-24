const moment = require('moment')
const query = require('../../query.js')
const Exercise2Service = require('../services/exercise-2.service')
const userController = {
    // FETCH ALL USER AND CONTACT DETAILS
    // GET METHOD
    fetchAll: async (req, res, next) => {
        try {
            let result = await query('SELECT user.id, name, age, birthdate, mobile, home, address.line1, address.line2, address.city,address.province, address.country FROM user INNER JOIN contact ON user.id = contact.user_id INNER JOIN address ON user.id = address.user_id ORDER BY user.id DESC',[])   

            result = result.map(res => {
                return {
                    id: res.id,
                    name: res.name,
                    age: res.age,
                    birthdate: res.birthdate,
                    contact: {
                        mobile: res.mobile,
                        home: res.home
                    },
                    address: {
                        line1: res.line1,
                        line2: res.line2,
                        city: res.city,
                        province: res.province,
                        country: res.country
                    }
                }
            })
            return res.status(200).json({ 
                status: "ok",
                details: result
            })
        } catch (error) {
            return res.json({ message: `Error Occured: ${error}`})
        }
    },
    // FETCH USER BY ID FUNCTION
    // GET METHOD
    fetchUserByID: async (req, res, next) => {
        try {
            const { id } = req.params
            let result = await query('SELECT user.id, name, age, birthdate, contact.id as contact_id, mobile, home, address.line1, address.line2, address.city,address.province, address.country FROM user INNER JOIN contact ON user.id = contact.user_id INNER JOIN address ON user.id = address.user_id where user.id=?', [id])
            // return next() 

            result = result.map(res => {
                return {
                    id: res.id,
                    name: res.name,
                    age: res.age,
                    birthdate: res.birthdate,
                    contact: {
                        mobile: res.mobile,
                        home: res.home
                    },
                    address: {
                        line1: res.line1,
                        line2: res.line2,
                        city: res.city,
                        province: res.province,
                        country: res.country
                    }
                }
            })[0]

            
            return res.status(200).json(result)
        } catch (error) {
            return res.json({ message: `Error Occured: ${error}`})
        }
    },

    // SAVE USER AND CONTACT TABLE FUNCTION
    // POST METHOD
    saveUsers: async (req, res, next) => {
        try {
            const validate = new Exercise2Service

            // if there is an invalid inputs
            // this will return a validation msg
            if(validate.storeDetails(req.body)){
                return res.json({
                    status: 400,
                    validation_msg: validate.storeDetails(req.body)
                })
            }

            // destructured request body
            const { name, age, birthdate, contact, address } = req.body

            // insert into user table
            const userResult = await query("INSERT INTO user (name, age, birthdate) VALUES (?,?,?)", [name.toLowerCase(), age, moment(new Date(birthdate)).format("yyyy-MM-DD")])

            // WAIT userResult to finished before executing this next query to get the userId inserted above then insert to contact table
            await query("INSERT INTO contact (user_id, mobile, home) VALUES (?,?,?)", [userResult.insertId, contact.mobile, contact.home])

            await query("INSERT INTO address (user_id, line1, line2, city, province, country) VALUES (?,?,?,?,?,?)", [userResult.insertId, address.line1, address.line2, address.city, address.province, address.country])

            return res.status(201).json(
                {
                    status: "ok",
                    id: userResult.insertId
                }
            )
        } catch (error) {
            return res.json({ message: `Error Occured: ${error}`})
        }
    },
    // UPDATE USER AND CONTACT TABLE FUNCTION
    // PATCH METHOD
    updateUsers: async (req, res, next) => {
        try {
            const validate = new Exercise2Service
            // if there is an invalid inputs
            // this will return a validation msg
            if(validate.storeDetails(req.body)){
                return res.json({
                    status: 400,
                    validation_msg: validate.storeDetails(req.body)
                })
            }

            // destructured request body
            const { name, age, birthdate, contact } = req.body

            // update user table based on the user id
            const userResult = await query("UPDATE user SET name=?, age=?, birthdate=? WHERE id=?", [name.toLowerCase(), age, moment(new Date(birthdate)).format("yyyy-MM-DD"), req.params.id])

            const userContact = await query("UPDATE contact SET mobile=?, home=? WHERE user_id=?", [contact.mobile, contact.home, req.params.id])

            const userAddress = await query("UPDATE address SET line1=?, line2=?, city=?, province=?, country=? WHERE user_id=?", [address.line1, address.line2, address.city, address.province, address.country, userResult.insertId ])
            return res.status(201).json(
                {
                    result: {userResult, userContact},
                    message: "Data Updated Successfully"
                }
            )
        } catch (error) {
            return res.json({ message: `Error Occured: ${error}`})
        }
    },
    // DELETE ROW AND CONTACT TABLE FUNCTION
    // DELETE METHOD
    deleteUsers: async (req, res, next) => {
        try {

            // delete row in address table based on the user id
            const userAddress = await query("DELETE FROM address WHERE user_id=?", [req.params.id])


           // delete row in contact table based on the user id
            const userContact = await query("DELETE FROM contact WHERE user_id=?", [req.params.id])
 
            // delete row in user table based on the user id
            const userResult = await query("DELETE FROM user WHERE id=?", [req.params.id])
            
            return res.json(
                {
                    message: "ok"
                }
            )
        } catch (error) {
            return res.json({ message: `Error Occured: ${error}`})
        }
    }
}
module.exports = userController