using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessAPI.Models
{
    public class ClientMemberships
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string ClientId { get; set; }

        public string MemberShipId { get; set; }

        [BsonElement("RoomId")]
        public string RoomId { get; set; }
        public int Entered { get; set; }
        public float SoldPrice { get; set; }
        public string IsDeleted { get; set; }
        public string FirstUsed { get; set; }
    }
}
