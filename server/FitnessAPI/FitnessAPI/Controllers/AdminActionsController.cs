using FitnessAPI.Authentication;
using FitnessAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminActionsController : ControllerBase
    {

        private IMongoCollection<User> _user;

        public AdminActionsController(IMongoClient client)
        {
            var database = client.GetDatabase("Fitness");
            _user = database.GetCollection<User>("user");
        }

        // GET: api/<AdminActionsController>
        [HttpGet]
        public IActionResult Get()
        {
            var result = _user.Find(el => el.IsDeleted == "false" && el.Type == "Client").ToList();
            if(result.Count <= 0)
            {
                return StatusCode(404, new Response { Status = "Error", Message = "No such data in the DB" });
            }
            var respone = new UserGetterModel
            {
                Id = result[0].Id,
                UserName = result[0].UserName,
                Email = result[0].UserEmail,
                PhoneNumber = result[0].PhoneNumber,
                Type = result[0].Type,
                IsDeleted = result[0].IsDeleted
            };
            return Ok(respone);
        }

        // POST api/<AdminActionsController>
        [HttpPost]
        public IActionResult Post([FromBody] User registerModel)
        {
            var resultUser = _user.Find(el => el.UserEmail == registerModel.UserEmail).ToList();
            if (resultUser.Count > 0)
            {
                return StatusCode(500, new Response { Status = "Error", Message = "User already exists" });
            }

            _user.InsertOne(registerModel);
            var result = new Result { Id = registerModel.Id, Email = registerModel.UserEmail, UserName = registerModel.UserName, Type = registerModel.Type };
            return Ok(result);

        }

        // PUT api/<AdminActionsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] UserGetterModel value)
        {
            var result = _user.Find(el => el.Id == id).ToList();

            if(result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Error", Message = "No such data in the DB" });

            }

            var updatedUser = new User
            {
                Id = id,
                UserName = value.UserName,
                PhoneNumber = value.PhoneNumber,
                UserEmail = value.Email,
                IsDeleted = value.IsDeleted,
                Address = value.Address,
                InsertedDate = result[0].InsertedDate,
                CNP = result[0].CNP,
                Barcode = result[0].Barcode,
                Password = result[0].Password,
                Type = result[0].Type,
                Comment = result[0].Comment
            };

            _user.ReplaceOne(el => el.Id == id, updatedUser);

            return Ok(new Response { Status = "Success", Message= "User updated with success" });
           
        }

        // DELETE api/<AdminActionsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _user.Find(el => el.Id == id).ToList();
            if (result.Count < 0)
            {
                return StatusCode(404, new Response { Status = "Error", Message = "User Not Found" });

            }
            var filter = Builders<User>.Filter.Eq("Id", id);
            var update = Builders<User>.Update.Set("IsDeleted", "true");
            _user.UpdateOne(filter, update);

            return Ok();

        }
    }
}
