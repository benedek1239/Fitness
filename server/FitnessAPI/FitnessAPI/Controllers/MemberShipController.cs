﻿using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;


namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemberShipController : ControllerBase
    {

        private IMongoCollection<MemberShip> _membership;

        public MemberShipController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _membership = database.GetCollection<MemberShip>("membership");
        }

        [HttpGet]
        public IEnumerable<MemberShip> Get()
        {
            return _membership.Find(el => el.IsDeleted == "false").ToList();
        }

        [HttpGet("{id}")]
        public IEnumerable<MemberShip> Get(string id)
        {
            var idk = _membership.Find(el => el.Id == id).ToList();
            return idk;

        }

        [HttpGet("{roomId}/{isAdmin}")]
        public IEnumerable<MemberShip> Get(string roomId, bool isAdmin)
        {
            var idk = _membership.Find(el => el.RoomId == roomId && el.IsDeleted == "false").ToList();
            return idk;
        }

        [HttpPost]
        public IEnumerable<MemberShip> Create([FromBody] MemberShip shipwreck)
        {
            _membership.InsertOne(shipwreck);
            var idk = _membership.Find(el => el.Id == shipwreck.Id).ToList();

            return idk;
        }

        [HttpPut("{id}")]
        public IEnumerable<MemberShip> Delete(string id, MemberShip memberShip)
        {
            _membership.ReplaceOne(el => el.Id == id, memberShip);
            return null;
        }

    }
}