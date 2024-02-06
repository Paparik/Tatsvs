namespace Tatsvs
{
    public static class Initializer
    {
        public static void InitializeRepositories(this IServiceCollection services)
        {
            //services.AddScoped<IBaseRepository<User>, UserRepository>();
        }

        public static void InitializeServices(this IServiceCollection services)
        {
            //services.AddScoped<IRoleService, RoleService>();
        }
    }
}