using DAL;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;


namespace Tatsvs
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("Tatsvs"));
                options.EnableSensitiveDataLogging(true);
            }).AddIdentity<User, Role>(config =>
            {
                config.Password.RequireDigit = true;
                config.Password.RequireLowercase = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;
                config.Password.RequiredLength = 6;
            }).AddEntityFrameworkStores<ApplicationDbContext>();

            services.ConfigureApplicationCookie(config =>
            {
                config.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Authorization");
                //config.AccessDeniedPath = "/Home/AccessDenied";
            });

            services.InitializeRepositories();
            services.InitializeServices();
            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                SeedData.Initialize(serviceScope.ServiceProvider);
            }
        }
    }
}