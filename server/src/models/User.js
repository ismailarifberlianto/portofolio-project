const { Model } = require("@mongoloquent/core")

class User extends Model {
  $collection = "users"
  $useTimestamps = true
  $hidden = ["passwordHash"]
}

module.exports = User