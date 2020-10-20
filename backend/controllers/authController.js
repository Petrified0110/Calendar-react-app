const promisify = require('promisify-node');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {checkPassword, changedPasswordAfter} = require('../utils/passwordUtils');
const db = require('../utils/db');

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body.credentials;
    if (!email || !password)
      return next(new AppError('No email or password defined'), 400);
  
    const userFromDatabase = await db.collection('users').where('email', '==', email).get();
    if(userFromDatabase.empty)
      console.log("Empty");
    let user;
    userFromDatabase.forEach(doc => {
      user = doc.data();
    });

    if (userFromDatabase === null || !checkPassword(password, user.password))
      return next(new AppError('Incorrect email or password!'), 400);
  
    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
    
      if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
      res.cookie('jwt', token, cookieOptions);
      user.password = undefined;
    
      res.status(200).json({
        status: 'success',
        token: token,
        data: user,
      });
    });



    exports.protect = catchAsync(async (req, res, next) => {
        let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        }
        if (!token) return next(new AppError('Not logged in!', 401));
      
        const decodedPayload = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET
        );
        const freshUser = await db.collection('users').where('email','==',decodedPayload.email).get();
        if(freshUser.empty)
          return next(new AppError('The user belonging to this token no longer exists', 401));
        let user;
        freshUser.forEach(doc => {
            user = doc.data();
        });  
      
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = user;
        next();
      });
    