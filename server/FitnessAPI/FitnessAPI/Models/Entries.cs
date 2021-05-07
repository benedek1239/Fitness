using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FitnessAPI.Models
{
    public class Entries
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ClientId { get; set; }
        public string MemberShipId { get; set; }
        public string Barcode { get; set; }
        public string Date { get; set; }
        public string RoomId { get; set; }

    }
}
