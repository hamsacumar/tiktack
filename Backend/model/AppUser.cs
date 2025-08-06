using MongoDB.Bson;

namespace Backend.model
{
    public class AppUser
    {
        public ObjectId Id { get; set; }
        public required string IdentityUserId { get; set; }
        public required string Email { get; set; }
        public required string UserName { get; set; }
    }
}
