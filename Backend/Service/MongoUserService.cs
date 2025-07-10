using MongoDB.Driver;
using MongoDB.Bson;
using Backend.model;
using Microsoft.Extensions.Options;


namespace Backend.Service
{
    public class MongoUserService
{
    private readonly IMongoCollection<AppUser> _users;

    public MongoUserService(IOptions<MongoDBSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _users = database.GetCollection<AppUser>("auth");
    }

    public async Task CreateUserAsync(AppUser user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<List<AppUser>> GetAllUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }
}

}
