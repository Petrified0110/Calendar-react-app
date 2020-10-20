const bcrypt = require('bcryptjs');
  exports.checkPassword = async (password, passwordToCheck) => {
    return await bcrypt.compare(password, passwordToCheck);
}