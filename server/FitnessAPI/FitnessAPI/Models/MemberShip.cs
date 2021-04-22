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
        public string Price { get; set; }

        [BsonElement("Owner")]
        public string LastingInDay { get; set; }

        //public int TotalEntries { get; set; }


    }
}
