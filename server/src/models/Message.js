const { Model } = require("@mongoloquent/core")

class Message extends Model {
  $collection = "messages"
  $useTimestamps = true
}

module.exports = Message