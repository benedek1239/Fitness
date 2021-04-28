using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FitnessAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserName { get; set; }

        public int PhoneNumber { get; set; }

        public string UserEmail { get; set; }

        public string IsDeleted { get; set; }

        public string InsertedDate { get; set; }

        public string CNP { get; set; }

        public string Address { get; set; }

        public string Barcode { get; set; }

        public string Password { get; set; }

        public string Type { get; set; }

        public string Comment { get; set; }

    }
}
