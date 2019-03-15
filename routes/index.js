/**
 * @desc router.js
 * @author yuwenqiang
 * @date 2019/03/12 14:28:03
 */
const dbUrl = "mongodb://96.45.176.172:27017/";
const MongoClient = require('mongodb').MongoClient;

const handel = {
  /**
   * @desc 登录
   * @param {String} id
   * @param {Object} req
   * @param {Function} callback
   * @returns
   */
  login (req, callback) {
    const result = {success: false}
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err
        db.db('mydb').collection('loginData').findOne({'loginName': req.loginName}, function (err, user) {
          if (!err) {
            if (user) {
              if (req.password === user.password) {
                result.success = true
                result.data = {
                  _id: user._id
                }
                result.message = '登录成功'
                callback(result)
              } else {
                result.message = '密码错误'
                callback(result)
              }
            } else {
              result.message = '该用户未注册'
              callback(result)
            }
          } else {
            callback(result)
          }
        })
    })
  },
  /**
   * @desc 注册
   * @param {Object} req
   * @param {Function} callback
   * @returns
   */
  register (req, callback) {
    const result = {success: false}
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err
      // const loginData = db.db('mydb').collection('loginData')
      const mydb = db.db('mydb');
      const loginData = mydb.collection('loginData')
      loginData.findOne({"loginName": req.loginName}, (err, user) => {
        if (!err) {
          if (user && user.loginName === req.loginName) {
            result.message = '账号已存在'
            callback(result)
          } else {
            result.success = true
            loginData.insertOne({
              "loginName": req.loginName,
              "password": req.password
            })
            callback(result)
          }
        } else {
          callback(result)
        }
      })
    })
  },
  updateUser () {
  }
}

module.exports = {
  routerCheck (req, res) {
    console.log(req)
    res.end('hi')
  },
  routerAction (req, res) {
    if (req.body) {
      const data = JSON.parse(req.body.data)
      if (req.body.action === 'login') {
        handel.login(data, (_result) => {
          res.jsonp(_result)
        })
      } else if (req.body.action === 'register') {
        handel.register(data, (_result) => {
          res.jsonp(_result)
        })
      }
    }
  }
}

