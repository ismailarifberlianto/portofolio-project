const { Model } = require("@mongoloquent/core")

class Project extends Model {
  $collection = "projects"
  $useTimestamps = true
}

module.exports = Project