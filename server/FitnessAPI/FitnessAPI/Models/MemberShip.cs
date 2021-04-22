using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace FitnessAPI.Models
{
    public class MemberShip
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("MemberShipType")]
        public string Type { get; set; }

        [BsonElement("Price")]
        public float Price { get; set; }

        [BsonElement("LastingInDay")]
        public int LastingInDay { get; set; }

        [BsonElement("EntriesNumber")]
        public int EntriesNumber { get; set; }

        [BsonElement("IsDeleted")]
        public string IsDeleted { get; set; }

        [BsonElement("RoomId")]
        public string RoomId { get; set; }

        [BsonElement("FromUntill")]
        public string FromUntill { get; set; }

        [BsonElement("DailyEntries")]
        public string DailyEntries { get; set; }

        //public int TotalEntries { get; set; }


    }
}
