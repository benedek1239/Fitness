using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FitnessAPI.Models
{
    [BsonIgnoreExtraElements]
    public class UserGetterModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("UserEmail")]
        public string Email { get; set; }

        public int PhoneNumber { get; set; }
        public string UserName { get; set; }

        public string Address { get; set; }
        public string IsDeleted { get; set; }
        public string Type { get; set; }
    }
}
